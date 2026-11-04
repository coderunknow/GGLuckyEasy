import { world, system, PlayerPermissionLevel } from "@minecraft/server";
import { ActionFormData, ModalFormData } from "@minecraft/server-ui";
import { EVENTS } from "./events/registry.js";
import probabilityTable from "./config/probabilities.js";
import { selectEvent, createRandom } from "./core/random.js";
import { claimActivation, releaseActivation } from "./core/activation.js";
import { encodeState, decodeState } from "./core/persistence.js";
import { freshProgression, discover, migrateProgression, buySkill, xpForLevel, SKILLS } from "./core/progression.js";
import { EventOperations } from "./runtime/operations.js";

const BLOCK_TIERS = { "luckychaos:lucky_block": "lucky", "luckychaos:super_lucky_block": "super", "luckychaos:chaos_lucky_block": "chaos" };
const SETTINGS_KEY = "luckychaos:settings_v1";
const PROGRESS_PREFIX = "luckychaos:progress_v1:";
const defaults = { version: 1, mode: "survival", profile: "coop", terrainDestruction: true, pranks: true };
let settings = defaults;
const processed = new Set();
const bosses = new Map();
let operations;
const random = createRandom((Date.now() ^ 0x4c55434b) >>> 0);

function text(player, key, withArgs) { player.sendMessage({ rawtext: [{ translate: key, ...(withArgs ? { with: withArgs } : {}) }] }); }
function loadSettings() {
  try {
    const stored = world.getDynamicProperty(SETTINGS_KEY);
    settings = { ...defaults, ...decodeState(stored, {}) };
  } catch { settings = { ...defaults }; }
  operations = new EventOperations(world, settings, bosses);
}
function saveSettings() { world.setDynamicProperty(SETTINGS_KEY, encodeState(settings)); operations = new EventOperations(world, settings, bosses); }
function progressKey(player) { return `${PROGRESS_PREFIX}${player.id}`; }
function getProgress(player) {
  try {
    const stored = world.getDynamicProperty(progressKey(player));
    return migrateProgression(decodeState(stored, undefined));
  } catch { return freshProgression(); }
}
function saveProgress(player, progress) { world.setDynamicProperty(progressKey(player), encodeState(progress)); }
function isAdmin(player) { return player.playerPermissionLevel >= PlayerPermissionLevel.Operator; }

function openBlock(event) {
  const tier = BLOCK_TIERS[event.brokenBlockPermutation.type.id];
  if (!tier) return;
  const p = event.block.location;
  const key = `${event.player.dimension.id}:${p.x},${p.y},${p.z}`;
  if (!claimActivation(processed, key)) return;
  // Duplicate after-event signals in the same tick are ignored; the key is
  // released after activation so a later block at the same coordinate works.
  system.run(() => {
    try { activate(event.player, event.block.dimension, { x: p.x + .5, y: p.y + .5, z: p.z + .5 }, tier); }
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
  await new ActionFormData().title({ translate: "luckychaos.menu.guide" }).body({ translate: "luckychaos.guide.body" }).button({ translate: "luckychaos.menu.back" }).show(player);
}
async function showCollection(player) {
  const progress = getProgress(player);
  const names = progress.discoveries.length ? progress.discoveries.flatMap(id => [{ translate: `${id}.name` }, "\n"]) : ["—"];
  await new ActionFormData().title({ translate: "luckychaos.menu.collection" }).body({ rawtext: [{ translate: "luckychaos.collection.body", with: names }] }).button({ translate: "luckychaos.menu.back" }).show(player);
}
async function showSkills(player) {
  const progress = getProgress(player), ids = Object.keys(SKILLS);
  const form = new ActionFormData().title({ translate: "luckychaos.menu.skills" }).body({ translate: "luckychaos.skills.points", with: [String(progress.skillPoints)] });
  for (const id of ids) form.button({ translate: `luckychaos.skill.${id}`, with: [String(progress.skills[id]), String(SKILLS[id].max)] });
  const response = await form.show(player); if (response.canceled) return;
  try { saveProgress(player, buySkill(progress, ids[response.selection])); text(player, "luckychaos.skills.bought"); }
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
    for (let x = 0; x < 25; x++) for (let z = 0; z < 25; z++) {
      const block = player.dimension.getBlock({ x: base.x + x, y: base.y, z: base.z + z });
      if (block && !["minecraft:bedrock", "minecraft:chest"].includes(block.typeId)) block.setType((x === 0 || z === 0 || x === 24 || z === 24) ? "minecraft:bedrock" : "minecraft:smooth_stone");
      for (let y = 1; y <= 4; y++) { const above = player.dimension.getBlock({ x: base.x + x, y: base.y + y, z: base.z + z }); if (above && !above.isAir && above.typeId !== "minecraft:bedrock") above.setType("minecraft:air"); }
    }
    text(player, "luckychaos.arena.built");
  } catch { text(player, "luckychaos.arena.failed"); }
}

world.afterEvents.playerBreakBlock.subscribe(openBlock);
world.afterEvents.itemUse.subscribe(event => { if (event.itemStack.typeId === "luckychaos:chaos_compass") system.run(() => showMenu(event.source).catch(error => console.warn(`[LuckyChaos] UI: ${error}`))); });
world.afterEvents.entityDie.subscribe(event => {
  const boss = bosses.get(event.deadEntity.id); if (!boss) return;
  bosses.delete(event.deadEntity.id);
  const opener = world.getAllPlayers().find(p => p.id === boss.opener) ?? event.damageSource.damagingEntity;
  if (opener?.getComponent) { operations.give(opener, boss.reward, boss.count); text(opener, "luckychaos.boss.reward"); }
});
world.afterEvents.worldLoad.subscribe(() => { loadSettings(); for (const player of world.getAllPlayers()) if (!world.getDynamicProperty(progressKey(player))) saveProgress(player, freshProgression()); });
world.afterEvents.playerSpawn.subscribe(event => { if (event.initialSpawn && !world.getDynamicProperty(progressKey(event.player))) { saveProgress(event.player, freshProgression()); text(event.player, "luckychaos.message.welcome"); } });
loadSettings();
