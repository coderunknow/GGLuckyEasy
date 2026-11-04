import { world, system, PlayerPermissionLevel } from "@minecraft/server";
import { ActionFormData, ModalFormData } from "@minecraft/server-ui";
import { EVENTS } from "./events/registry.js";
import probabilityTable from "./config/probabilities.js";
import { selectEvent, createRandom } from "./core/random.js";
import { claimActivation, releaseActivation } from "./core/activation.js";
import { encodeState, decodeState } from "./core/persistence.js";
import { freshProgression, discover, migrateProgression, buySkill, xpForLevel, SKILLS } from "./core/progression.js";
import { EventOperations, isProtectedType } from "./runtime/operations.js";
import { BossTracker } from "./core/bosses.js";
import { TerrainJournal } from "./core/terrain-journal.js";

const EVENT_IDS = new Set(EVENTS.map(event => event.id));
const BLOCK_TIERS = { "luckychaos:lucky_block": "lucky", "luckychaos:super_lucky_block": "super", "luckychaos:chaos_lucky_block": "chaos" };
const SETTINGS_KEY = "luckychaos:settings_v1";
const PROGRESS_PREFIX = "luckychaos:progress_v1:";
const defaults = { version: 1, mode: "survival", profile: "coop", terrainDestruction: true, pranks: true };
let settings = defaults;
const processed = new Set();
const BOSS_KEY = "luckychaos:bosses_v1";
const bossTracker = new BossTracker(() => { try { return world.getDynamicProperty(BOSS_KEY); } catch { return undefined; } }, raw => world.setDynamicProperty(BOSS_KEY, raw));
const TERRAIN_KEY = "luckychaos:terrain_journal_v1";
const terrainJournal = new TerrainJournal(() => { try { return world.getDynamicProperty(TERRAIN_KEY); } catch { return undefined; } }, raw => world.setDynamicProperty(TERRAIN_KEY, raw));
let operations;
const random = createRandom((Date.now() ^ 0x4c55434b) >>> 0);

function text(player, key, withArgs) {
  const withValue = withArgs?.every(value => typeof value === "string") ? withArgs : withArgs ? { rawtext: withArgs.map(value => typeof value === "string" ? { text: value } : value) } : undefined;
  player.sendMessage({ rawtext: [{ translate: key, ...(withValue ? { with: withValue } : {}) }] });
}
function loadSettings() {
  try {
    const stored = world.getDynamicProperty(SETTINGS_KEY), saved = decodeState(stored, {});
    settings = { version: 1, mode: saved.mode === "arena" ? "arena" : "survival", profile: saved.profile === "versus" ? "versus" : "coop", terrainDestruction: saved.terrainDestruction !== false, pranks: saved.pranks !== false };
  } catch { settings = { ...defaults }; }
  bossTracker.reload();
  operations = new EventOperations(world, settings, bossTracker, terrainJournal);
}
function saveSettings() { world.setDynamicProperty(SETTINGS_KEY, encodeState(settings)); operations = new EventOperations(world, settings, bossTracker, terrainJournal); }
function progressKey(player) { return `${PROGRESS_PREFIX}${player.id}`; }
function getProgress(player) {
  try {
    const stored = world.getDynamicProperty(progressKey(player));
    return migrateProgression(decodeState(stored, undefined), EVENT_IDS);
  } catch { return freshProgression(); }
}
function saveProgress(player, progress) { world.setDynamicProperty(progressKey(player), encodeState(progress)); }
function isAdmin(player) { return player.playerPermissionLevel >= PlayerPermissionLevel.Operator; }

function openBlock(event) {
  const tier = BLOCK_TIERS[event.brokenBlockPermutation.type.id];
  if (!tier) return;
  const p = event.block.location, dimension = event.block.dimension, player = event.player;
  const key = `${dimension.id}:${p.x},${p.y},${p.z}`;
  if (!claimActivation(processed, key)) return;
  // Duplicate after-event signals in the same tick are ignored; the key is
  // released after activation so a later block at the same coordinate works.
  system.run(() => {
    try { activate(player, dimension, { x: p.x + .5, y: p.y + .5, z: p.z + .5 }, tier); }
    finally { releaseActivation(processed, key); }
  });
}

function activate(player, dimension, location, tier) {
  try {
    if (!player.isValid) return;
    const event = selectEvent(EVENTS, probabilityTable.tiers[tier], random);
    const ctx = { player, dimension, location, random, tier };
    operations[event.handler](ctx, event.data);
    const current = getProgress(player);
    const result = discover(current, event, 10 + (tier === "super" ? 4 : tier === "chaos" ? 8 : 0));
    // Co-op grants a smaller, separately persisted discovery XP reward to one nearby partner.
    if (settings.profile === "coop") {
      const partner = world.getAllPlayers().find(p => p.id !== player.id && p.dimension.id === dimension.id && Math.hypot(p.location.x - location.x, p.location.y - location.y, p.location.z - location.z) <= 12);
      if (partner) { const partnerState = getProgress(partner); saveProgress(partner, discover(partnerState, event, 4).state); text(partner, "luckychaos.message.coop_xp"); }
    }
    if (current.skills.fortune > 0 && random() < current.skills.fortune * .08) operations.give(player, "minecraft:emerald", 1);
    if (current.skills.vitality > 0) player.addEffect("absorption", 300 * 20, { amplifier: current.skills.vitality - 1 });
    saveProgress(player, result.state);
    const sound = `luckychaos.open.${tier}`;
    player.playSound(sound, { volume: tier === "chaos" ? .45 : .8 });
    dimension.spawnParticle(tier === "chaos" ? "minecraft:basic_flame_particle" : "minecraft:totem_particle", location);
    text(player, "luckychaos.message.opened", [{ translate: `${event.id}.name` }]);
    if (result.isNew) text(player, "luckychaos.message.discovery", [String(result.xp)]);
  } catch (error) {
    console.warn(`[LuckyChaos] Isolated event failure: ${error?.stack ?? error}`);
    text(player, "luckychaos.message.event_error");
  }
}

async function showMenu(player) {
  const progress = getProgress(player);
  const form = new ActionFormData().title({ translate: "luckychaos.menu.title" })
    .body({ translate: "luckychaos.menu.status", with: [String(progress.level), String(progress.xp), String(xpForLevel(progress.level)), String(progress.skillPoints), String(progress.discoveries.length)] })
    .button({ translate: "luckychaos.menu.guide" }).button({ translate: "luckychaos.menu.skills" }).button({ translate: "luckychaos.menu.settings" }).button({ translate: "luckychaos.menu.collection" });
  const response = await form.show(player);
  if (response.canceled) return;
  if (response.selection === 0) return showGuide(player);
  if (response.selection === 1) return showSkills(player);
  if (response.selection === 2) return showSettings(player);
  if (response.selection === 3) return showCollection(player);
}
async function showGuide(player) {
  const response = await new ActionFormData().title({ translate: "luckychaos.menu.guide" }).body({ translate: "luckychaos.guide.body" }).button({ translate: "luckychaos.menu.back" }).show(player);
  if (!response.canceled) return showMenu(player);
}
async function showCollection(player) {
  const progress = getProgress(player);
  const names = progress.discoveries.length ? progress.discoveries.flatMap(id => [{ translate: `${id}.name` }, { text: "\n" }]) : [{ text: "—" }];
  const response = await new ActionFormData().title({ translate: "luckychaos.menu.collection" }).body({ rawtext: [{ translate: "luckychaos.collection.list" }, ...names] }).button({ translate: "luckychaos.menu.back" }).show(player);
  if (!response.canceled) return showMenu(player);
}
async function showSkills(player) {
  const progress = getProgress(player), ids = Object.keys(SKILLS);
  const form = new ActionFormData().title({ translate: "luckychaos.menu.skills" }).body({ translate: "luckychaos.skills.points", with: [String(progress.skillPoints)] });
  for (const id of ids) form.button({ translate: `luckychaos.skill.${id}`, with: [String(progress.skills[id]), String(SKILLS[id].max)] });
  const response = await form.show(player); if (response.canceled) return;
  try { saveProgress(player, buySkill(getProgress(player), ids[response.selection])); text(player, "luckychaos.skills.bought"); }
  catch { text(player, "luckychaos.skills.unavailable"); }
}
async function showSettings(player) {
  if (!isAdmin(player)) { text(player, "luckychaos.settings.admin_only"); return; }
  const form = new ModalFormData().title({ translate: "luckychaos.menu.settings" })
    .dropdown({ translate: "luckychaos.settings.mode" }, [{ translate: "luckychaos.mode.survival" }, { translate: "luckychaos.mode.arena" }], { defaultValueIndex: settings.mode === "arena" ? 1 : 0 })
    .dropdown({ translate: "luckychaos.settings.profile" }, [{ translate: "luckychaos.profile.coop" }, { translate: "luckychaos.profile.versus" }], { defaultValueIndex: settings.profile === "versus" ? 1 : 0 })
    .toggle({ translate: "luckychaos.settings.terrain" }, { defaultValue: settings.terrainDestruction })
    .toggle({ translate: "luckychaos.settings.pranks" }, { defaultValue: settings.pranks })
    .toggle({ translate: "luckychaos.settings.build_arena" }, { defaultValue: false });
  const response = await form.show(player); if (response.canceled) return;
  const [mode, profile, terrainDestruction, pranks, buildArena] = response.formValues;
  settings = { ...settings, mode: mode === 1 ? "arena" : "survival", profile: profile === 1 ? "versus" : "coop", terrainDestruction: terrainDestruction === true, pranks: pranks === true };
  saveSettings(); text(player, "luckychaos.settings.saved");
  if (buildArena) system.run(() => buildArenaAt(player));
}
function buildArenaAt(player) {
  try {
    const base = { x: Math.floor(player.location.x) - 12, y: Math.floor(player.location.y) - 1, z: Math.floor(player.location.z) - 12 };
    // Validate the complete 25×25×5 volume before the first write. The arena
    // never clears construction above its floor or destroys containers/portals.
    for (let x = 0; x < 25; x++) for (let z = 0; z < 25; z++) for (let y = 0; y <= 4; y++) {
      const block = player.dimension.getBlock({ x: base.x + x, y: base.y + y, z: base.z + z });
      if (!block || isProtectedType(block.typeId) || block.getComponent("minecraft:inventory") || (y > 0 && !block.isAir)) throw new Error("Arena volume is occupied or protected");
    }
    for (let x = 0; x < 25; x++) for (let z = 0; z < 25; z++) {
      player.dimension.getBlock({ x: base.x + x, y: base.y, z: base.z + z }).setType((x === 0 || z === 0 || x === 24 || z === 24) ? "minecraft:bedrock" : "minecraft:smooth_stone");
    }
    text(player, "luckychaos.arena.built");
  } catch { text(player, "luckychaos.arena.failed"); }
}

world.afterEvents.playerBreakBlock.subscribe(openBlock);
world.afterEvents.itemUse.subscribe(event => { if (event.itemStack.typeId === "luckychaos:chaos_compass") system.run(() => showMenu(event.source).catch(error => console.warn(`[LuckyChaos] UI: ${error}`))); });
world.afterEvents.entityDie.subscribe(event => {
  const boss = bossTracker.consumeDeath(event.deadEntity.id); if (!boss) return;
  const opener = world.getAllPlayers().find(p => p.id === boss.opener);
  if (opener) { operations.give(opener, boss.reward, boss.count); text(opener, "luckychaos.boss.reward"); }
  else bossTracker.defer(boss.opener, boss);
});
function deliverPendingRewards(player) {
  const rewards = bossTracker.takePending(player.id), delivered = [];
  try {
    for (const reward of rewards) { operations.give(player, reward.reward, reward.count); delivered.push(reward); }
    if (delivered.length) text(player, "luckychaos.boss.reward");
  } catch (error) {
    bossTracker.restorePending(player.id, [...rewards.slice(delivered.length), ...delivered]);
    console.warn(`[GGLuckyEasy] Pending reward delivery deferred: ${error}`);
  }
}
world.afterEvents.worldLoad.subscribe(() => { loadSettings(); terrainJournal.reload(); operations.restoreJournaledTerrain(); for (const player of world.getAllPlayers()) { if (!world.getDynamicProperty(progressKey(player))) saveProgress(player, freshProgression()); deliverPendingRewards(player); } });
world.afterEvents.playerSpawn.subscribe(event => {
  if (!event.initialSpawn) return;
  if (!world.getDynamicProperty(progressKey(event.player))) { saveProgress(event.player, freshProgression()); text(event.player, "luckychaos.message.welcome"); }
  deliverPendingRewards(event.player);
});
loadSettings();
