import { ItemStack, EnchantmentType, BlockPermutation, system } from "@minecraft/server";

const airLike = block => !block || block.isAir || ["minecraft:short_grass", "minecraft:tall_grass", "minecraft:fern", "minecraft:dandelion", "minecraft:poppy"].includes(block.typeId);
const above = (p, y = 1) => ({ x: Math.floor(p.x), y: Math.floor(p.y) + y, z: Math.floor(p.z) });
const nearby = (p, radius, y = 2) => ({ x: p.x + radius, y: p.y + y, z: p.z + radius });
const PROTECTED_TYPES = new Set(["minecraft:bedrock", "minecraft:chest", "minecraft:trapped_chest", "minecraft:barrel", "minecraft:ender_chest", "minecraft:spawner", "minecraft:trial_spawner", "minecraft:vault", "minecraft:end_portal", "minecraft:end_portal_frame", "minecraft:command_block", "minecraft:chain_command_block", "minecraft:repeating_command_block", "minecraft:structure_block", "minecraft:jigsaw"]);
export const isProtectedType = typeId => PROTECTED_TYPES.has(typeId) || typeId.includes("shulker_box");
export const canRestoreTerrain = (currentType, eventType) => currentType === eventType;
const protectedBlock = block => !block || isProtectedType(block.typeId) || Boolean(block.getComponent("minecraft:inventory"));
const restore = (block, permutation) => { if (block.setPermutation) block.setPermutation(permutation); else block.setType(permutation.type.id); };

export class EventOperations {
  constructor(world, settings, bossTracker, terrainJournal) {
    this.world = world;
    this.settings = settings;
    this.bossTracker = bossTracker;
    this.terrainJournal = terrainJournal;
    this.terrainSequence = 0;
  }

  scheduleTerrainRestore(ctx, changes, eventType, ticks) {
    const records = changes.map(([block, permutation], index) => ({
      id: `${ctx.dimension.id}:${block.location.x},${block.location.y},${block.location.z}:${Date.now()}:${this.terrainSequence++}:${index}`,
      dimension: ctx.dimension.id, location: block.location, eventType,
      oldType: permutation.type.id, oldStates: permutation.getAllStates()
    }));
    if (this.terrainJournal && !this.terrainJournal.canFit(records.length)) throw new Error("Too many concurrent temporary terrain events");
    try { this.terrainJournal?.add(records); }
    catch (error) {
      for (const [block, old] of changes) if (block.isValid && canRestoreTerrain(block.typeId, eventType)) restore(block, old);
      throw error;
    }
    const restoreAll = () => {
      const completed = [];
      for (let i = 0; i < changes.length; i++) {
        const [block, old] = changes[i];
        if (block.isValid && canRestoreTerrain(block.typeId, eventType)) restore(block, old);
        completed.push(records[i].id);
      }
      this.terrainJournal?.remove(completed);
    };
    system.runTimeout(restoreAll, ticks);
  }

  restoreJournaledTerrain() {
    if (!this.terrainJournal) return;
    const completed = [];
    for (const record of this.terrainJournal.records) {
      try {
        const dimension = this.world.getDimension(record.dimension), block = dimension.getBlock(record.location);
        if (!block) continue;
        if (canRestoreTerrain(block.typeId, record.eventType)) block.setPermutation(BlockPermutation.resolve(record.oldType, record.oldStates));
        completed.push(record.id);
      } catch { /* Unloaded chunks retain their journal until a later load. */ }
    }
    this.terrainJournal.remove(completed);
  }

  loot(ctx, d) { this.give(ctx.player, d.item, d.count); }
  lootMulti(ctx, d) { for (const [item, count] of d.items) this.give(ctx.player, item, count); }
  lootRandom(ctx, d) { this.give(ctx.player, d.items[Math.floor(ctx.random() * d.items.length)], 1); }
  enchantedBooks(ctx, d) {
    const inventory = ctx.player.getComponent("minecraft:inventory")?.container;
    if (!inventory) throw new Error("Player inventory unavailable");
    for (const enchantment of d.enchantments) {
      const book = new ItemStack("minecraft:enchanted_book", 1);
      book.getComponent("minecraft:enchantable").addEnchantment({ type: new EnchantmentType(enchantment), level: 1 });
      const remainder = inventory.addItem(book); if (remainder) ctx.player.dimension.spawnItem(remainder, ctx.player.location);
    }
    this.give(ctx.player, "minecraft:lapis_lazuli", d.lapis);
  }
  collectible(ctx, d) { this.give(ctx.player, d.item, 1); }
  give(player, id, count = 1) {
    const stack = new ItemStack(id, count);
    const inventory = player.getComponent("minecraft:inventory")?.container;
    if (!inventory) throw new Error("Player inventory unavailable");
    const remainder = inventory.addItem(stack);
    if (remainder) player.dimension.spawnItem(remainder, player.location);
  }

  armor(ctx, d) {
    const inv = ctx.player.getComponent("minecraft:inventory")?.container;
    if (!inv) throw new Error("Inventory unavailable");
    for (const part of ["helmet", "chestplate", "leggings", "boots"]) {
      const item = new ItemStack(`minecraft:${d.material}_${part}`, 1);
      const enchantable = item.getComponent("minecraft:enchantable");
      if (enchantable) enchantable.addEnchantment({ type: new EnchantmentType("protection"), level: part === "chestplate" ? 2 : 1 });
      const left = inv.addItem(item); if (left) ctx.player.dimension.spawnItem(left, ctx.player.location);
    }
    ctx.player.addEffect(d.effect, 120 * 20, { amplifier: 0, showParticles: true });
  }
  bootsEffect(ctx, d) { this.give(ctx.player, d.item, 1); ctx.player.addEffect(d.effect, d.seconds * 20, { amplifier: 1 }); }
  helmetEffect(ctx, d) { this.give(ctx.player, d.item, 1); ctx.player.addEffect(d.effect, d.seconds * 20, { amplifier: 0 }); }
  effectLoot(ctx, d) { ctx.player.addEffect(d.effect, d.seconds * 20, { amplifier: 0 }); this.give(ctx.player, d.item, d.count); }
  effects(ctx, d) { for (const [effect, seconds, level] of d.effects) ctx.player.addEffect(effect, seconds * 20, { amplifier: level - 1 }); }

  spawn(ctx, d) {
    for (let i = 0; i < d.count; i++) {
      const entity = ctx.dimension.spawnEntity(d.entity, nearby(ctx.location, (i % 3) - 1, 1));
      entity.nameTag = d.name;
      if (d.effect) entity.addEffect(d.effect, 120 * 20, { amplifier: 1 });
      if (d.entity === "minecraft:slime" && d.size >= 3) entity.triggerEvent("spawn_large");
    }
  }
  spawnRing(ctx, d) {
    for (let i = 0; i < d.count; i++) {
      const angle = i * Math.PI * 2 / d.count;
      const entity = ctx.dimension.spawnEntity(d.entity, { x: ctx.location.x + Math.cos(angle) * d.radius, y: ctx.location.y + 1, z: ctx.location.z + Math.sin(angle) * d.radius });
      entity.nameTag = d.name;
    }
  }
  spawnOffset(ctx, d) {
    for (let i = 0; i < d.count; i++) {
      const entity = ctx.dimension.spawnEntity(d.entity, above(ctx.location, d.y + i));
      entity.nameTag = d.name;
    }
  }
  vehicle(ctx, d) {
    const entity = ctx.dimension.spawnEntity(d.entity, above(ctx.location));
    entity.nameTag = d.name;
    if (d.saddle) entity.addItem(new ItemStack("minecraft:saddle", 1));
    if (d.item) this.give(ctx.player, d.item, 1);
  }
  vehicleLoot(ctx, d) { this.vehicle(ctx, d); this.give(ctx.player, d.item, d.count); }

  fallingBlock(ctx, d) {
    const loc = above(ctx.location, d.height);
    if (!airLike(ctx.dimension.getBlock(loc))) return;
    ctx.dimension.getBlock(loc)?.setType(d.block);
  }
  terrainRing(ctx, d) {
    if (this.terrainJournal && !this.terrainJournal.canFit((d.radius * 2 + 1) ** 2)) throw new Error("Too many concurrent temporary terrain events");
    const block = this.settings.terrainDestruction ? d.block : d.fallback;
    const changes = [];
    for (let x = -d.radius; x <= d.radius; x++) for (let z = -d.radius; z <= d.radius; z++) {
      if (Math.abs(x) + Math.abs(z) < d.radius || Math.abs(x) + Math.abs(z) > d.radius + 1) continue;
      const loc = above(ctx.location, 0); loc.x += x; loc.z += z;
      const target = ctx.dimension.getBlock(loc);
      if (target && !protectedBlock(target) && (airLike(target) || this.settings.terrainDestruction)) { changes.push([target, target.getPermutation()]); target.setType(block); }
    }
    this.scheduleTerrainRestore(ctx, changes, block, 30 * 20);
  }
  terrainPatch(ctx, d) {
    if (this.terrainJournal && !this.terrainJournal.canFit((d.radius * 2 + 1) ** 2)) throw new Error("Too many concurrent temporary terrain events");
    const changes = [];
    for (let x = -d.radius; x <= d.radius; x++) for (let z = -d.radius; z <= d.radius; z++) {
      const loc = above(ctx.location, d.height); loc.x += x; loc.z += z;
      const target = ctx.dimension.getBlock(loc);
      if (protectedBlock(target) || (!airLike(target) && !this.settings.terrainDestruction)) continue;
      changes.push([target, target.getPermutation()]); target.setType(d.block);
    }
    this.scheduleTerrainRestore(ctx, changes, d.block, d.seconds * 20);
  }
  pit(ctx, d) {
    if (!this.settings.terrainDestruction) { this.effects(ctx, { effects: [["slowness", 8, 1]] }); return; }
    for (let x = -d.radius; x <= d.radius; x++) for (let z = -d.radius; z <= d.radius; z++) for (let y = 0; y < d.depth; y++) {
      const block = ctx.dimension.getBlock({ x: Math.floor(ctx.location.x) + x, y: Math.floor(ctx.location.y) - y, z: Math.floor(ctx.location.z) + z });
      if (block && !protectedBlock(block)) block.setType("minecraft:air");
    }
  }
  hasProtectedNearby(ctx, radius = 4) {
    for (let x = -radius; x <= radius; x++) for (let y = -2; y <= 2; y++) for (let z = -radius; z <= radius; z++) {
      if (protectedBlock(ctx.dimension.getBlock({ x: Math.floor(ctx.location.x) + x, y: Math.floor(ctx.location.y) + y, z: Math.floor(ctx.location.z) + z }))) return true;
    }
    return false;
  }
  primedTnt(ctx) {
    if (!this.settings.terrainDestruction || this.hasProtectedNearby(ctx)) { this.soundShow(ctx); return; }
    ctx.dimension.spawnEntity("minecraft:tnt", above(ctx.location, 1));
  }
  lightning(ctx) { ctx.dimension.spawnEntity("minecraft:lightning_bolt", nearby(ctx.location, ctx.radius ?? 4, 0)); }
  explosion(ctx, d) {
    if (this.hasProtectedNearby(ctx, Math.ceil(d.radius) + 2)) { this.soundShow(ctx); return; }
    ctx.dimension.createExplosion(above(ctx.location, 1), d.radius, { breaksBlocks: this.settings.terrainDestruction, causesFire: false, source: ctx.player });
  }

  magnet(ctx, d) {
    const items = ctx.dimension.getEntities({ type: "minecraft:item", location: ctx.location, maxDistance: d.radius });
    for (const item of items.slice(0, 32)) item.teleport(ctx.player.location);
  }
  swap(ctx) {
    if (!this.settings.pranks) return;
    const other = this.world.getAllPlayers().find(p => p.id !== ctx.player.id && p.dimension.id === ctx.dimension.id);
    if (!other) { this.give(ctx.player, "minecraft:potato", 1); return; }
    const a = ctx.player.location, b = other.location;
    other.teleport(a, { dimension: ctx.dimension }); ctx.player.teleport(b, { dimension: other.dimension });
  }
  launch(ctx) { this.effects(ctx, { effects: [["levitation", 3, 3], ["slow_falling", 20, 1]] }); }
  chickenRain(ctx, d) {
    for (let i = 0; i < d.count; i++) {
      const chicken = ctx.dimension.spawnEntity("minecraft:chicken", { x: ctx.location.x + (i % 3) - 1, y: ctx.location.y + 8 + i, z: ctx.location.z + (i % 2) });
      chicken.addEffect("slow_falling", 30 * 20, { amplifier: 0 }); chicken.nameTag = "Forecast: Chicken";
    }
  }
  soundShow(ctx) {
    for (const [i, sound] of ["random.orb", "random.levelup", "mob.chicken.plop"].entries()) system.runTimeout(() => ctx.player.playSound(sound, { volume: 0.7 }), i * 8);
  }
  randomTeleport(ctx, d) {
    if (!this.settings.pranks) return;
    const angle = ctx.random() * Math.PI * 2, distance = 3 + ctx.random() * (d.radius - 3);
    const x = Math.floor(ctx.location.x + Math.cos(angle) * distance), z = Math.floor(ctx.location.z + Math.sin(angle) * distance);
    for (let y = Math.min(ctx.dimension.heightRange.max - 2, Math.floor(ctx.location.y) + 8); y >= Math.max(ctx.dimension.heightRange.min + 1, Math.floor(ctx.location.y) - 12); y--) {
      const ground = ctx.dimension.getBlock({ x, y, z });
      const feet = ctx.dimension.getBlock({ x, y: y + 1, z });
      if (ground && !airLike(ground) && ground.isLiquid === false && airLike(feet) && airLike(ctx.dimension.getBlock({ x, y: y + 2, z }))) {
        ctx.player.teleport({ x: x + .5, y: y + 1, z: z + .5 }, { dimension: ctx.dimension }); return;
      }
    }
    ctx.player.addEffect("slow_falling", 10 * 20, { amplifier: 0 });
  }
  party(ctx) { this.give(ctx.player, "minecraft:cake", 1); this.soundShow(ctx); for (let i = 0; i < 3; i++) ctx.dimension.spawnEntity("minecraft:fireworks_rocket", above(ctx.location, i + 1)); }
  partnerGift(ctx, d) {
    const other = this.world.getAllPlayers().find(p => p.id !== ctx.player.id);
    this.give(other ?? ctx.player, d.item, d.count);
  }

  boss(ctx, d) {
    if (d.dangerous && !this.settings.terrainDestruction) { this.spawn(ctx, { entity: "minecraft:iron_golem", name: "Safety Golem", count: 1 }); return; }
    if (this.bossTracker.active?.size >= 64) throw new Error("Active boss limit reached");
    const entity = ctx.dimension.spawnEntity(d.entity, above(ctx.location, 2));
    entity.nameTag = `☠ ${d.name} ☠`;
    if (d.entity === "minecraft:slime" && d.size >= 3) entity.triggerEvent("spawn_large");
    const health = entity.getComponent("minecraft:health");
    if (health) {
      const extra = Math.max(0, d.health - health.effectiveMax);
      if (extra > 0) entity.addEffect("health_boost", 999999, { amplifier: Math.min(49, Math.ceil(extra / 4) - 1), showParticles: false });
      health.resetToMaxValue(); health.setCurrent(Math.min(d.health, health.effectiveMax));
    }
    entity.addEffect("resistance", 999999, { amplifier: 1, showParticles: false });
    if (d.effect) entity.addEffect(d.effect, 999999, { amplifier: 1 });
    this.bossTracker.track(entity.id, { reward: d.reward, count: d.rewardCount ?? d.count ?? 1, opener: ctx.player.id });
    if (d.reinforcement && d.reinforcement.startsWith("minecraft:")) this.spawn(ctx, { entity: d.reinforcement, name: `${d.name}'s Minion`, count: Math.min(3, d.count) });
  }

  structure(ctx, d) { this.buildStructure(ctx, d.structure); }
  buildStructure(ctx, name) {
    const base = above(ctx.location, 0), cells = this.structureCells(base, name);
    if (cells.length > 160) throw new Error("Structure cell budget exceeded");
    // Structures never overwrite player construction, even when terrain
    // destruction is enabled. Replaceable vegetation is the only exception.
    for (const cell of cells) {
      const existing = ctx.dimension.getBlock(cell);
      if (protectedBlock(existing)) throw new Error("Protected structure block");
      if (!airLike(existing)) throw new Error("Structure volume occupied");
    }
    for (const cell of cells) { const block = ctx.dimension.getBlock(cell); if (block) block.setType(cell.block); }
    if (name === "treasure") {
      const chest = ctx.dimension.getBlock({ x: base.x, y: base.y + 1, z: base.z });
      const container = chest?.getComponent("minecraft:inventory")?.container;
      if (container) { container.addItem(new ItemStack("minecraft:gold_ingot", 6)); container.addItem(new ItemStack("minecraft:emerald", 3)); }
    }
  }
  structureCells(base, name) {
    const cells = [], put = (x, y, z, block) => cells.push({ x: base.x + x, y: base.y + y, z: base.z + z, block });
    if (name === "hut") {
      for (let x = -2; x <= 2; x++) for (let z = -2; z <= 2; z++) put(x, 0, z, "minecraft:planks");
      for (let y = 1; y <= 3; y++) for (let x = -2; x <= 2; x++) for (let z = -2; z <= 2; z++) if (Math.abs(x) === 2 || Math.abs(z) === 2) if (!(z === 2 && x === 0 && y < 3)) put(x, y, z, "minecraft:planks");
      for (let x = -2; x <= 2; x++) for (let z = -2; z <= 2; z++) put(x, 4, z, "minecraft:oak_slab");
    } else if (name === "picnic") {
      for (let x = -2; x <= 2; x++) for (let z = -2; z <= 2; z++) put(x, 1, z, (x + z) % 2 ? "minecraft:red_wool" : "minecraft:white_wool");
      put(0, 2, 0, "minecraft:cake"); put(2, 2, 2, "minecraft:poppy");
    } else if (name === "treasure") {
      for (const [x,z] of [[-2,-2],[2,-2],[-2,2],[2,2]]) for (let y=1;y<=4;y++) put(x,y,z,"minecraft:fence");
      for (let x=-2;x<=2;x++) for(let z=-2;z<=2;z++) put(x,5,z,"minecraft:oak_slab"); put(0,1,0,"minecraft:chest");
    } else if (name === "fountain") {
      for(let x=-2;x<=2;x++) for(let z=-2;z<=2;z++) if(Math.abs(x)===2||Math.abs(z)===2) put(x,1,z,"minecraft:stone_bricks"); else put(x,1,z,"minecraft:water");
      put(0,2,0,"minecraft:stone_bricks"); put(0,3,0,"minecraft:water");
    } else if (name === "obelisk") {
      for(let y=1;y<=7;y++) for(const [x,z] of [[0,0],[-1,0],[1,0],[0,-1],[0,1]]) if(y<6||x===0&&z===0) put(x,y,z,y%2?"minecraft:yellow_concrete":"minecraft:purple_concrete");
    } else if (name === "garden") {
      for(let x=-2;x<=2;x++) for(let z=-2;z<=2;z++) { put(x,0,z,"minecraft:farmland"); put(x,1,z,(x+z)%3?"minecraft:wheat":"minecraft:poppy"); }
    } else if (name === "watchtower") {
      for(const [x,z] of [[-1,-1],[1,-1],[-1,1],[1,1]]) for(let y=1;y<=7;y++) put(x,y,z,"minecraft:planks");
      for(let x=-1;x<=1;x++) for(let z=-1;z<=1;z++) put(x,7,z,"minecraft:planks"); put(0,1,0,"minecraft:ladder"); put(0,8,0,"minecraft:lantern");
    } else if (name === "cage") {
      for(let x=-1;x<=1;x++) for(let z=-1;z<=1;z++) for(let y=1;y<=3;y++) if(Math.abs(x)===1||Math.abs(z)===1||y===3) if(!(z===1&&x===0&&y<3)) put(x,y,z,"minecraft:iron_bars");
    } else throw new Error("Unknown structure");
    return cells;
  }
}
