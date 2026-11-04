import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import { EVENTS } from "../src/events/registry.js";
import table from "../src/config/probabilities.json" with { type: "json" };
// Bedrock's type-definition package has no Node runtime. Load the operation
// class with its game-only imports stubbed; structure generation itself is pure.
const operationSource = fs.readFileSync("src/runtime/operations.js", "utf8")
  .replace('import { ItemStack, EnchantmentType, BlockPermutation, system } from "@minecraft/server";', 'const ItemStack = class {}; const EnchantmentType = class {}; const BlockPermutation = class { static resolve(id){return {type:{id}};} }; const system = { runTimeout() {} };');
const { EventOperations } = await import(`data:text/javascript;base64,${Buffer.from(operationSource).toString("base64")}`);

const ids = EVENTS.map(e => e.id);
test("exactly 90 non-placeholder unique event definitions", () => {
  assert.equal(EVENTS.length, 90); assert.equal(new Set(ids).size, 90);
  for (const event of EVENTS) {
    assert.match(event.id, /^[a-z][a-z0-9_]+$/); assert.ok(event.name.en_US.length > 3); assert.ok(event.name.vi_VN.length > 2);
    assert.ok(event.description.en_US.length > 10); assert.ok(event.description.vi_VN.length > 8);
    assert.ok(event.validation.includes(event.id));
  }
});
test("every event maps to an implemented operation and is eligible in a tier", () => {
  for (const event of EVENTS) {
    assert.equal(typeof EventOperations.prototype[event.handler], "function", `${event.id}: ${event.handler}`);
    assert.ok(Object.values(table.tiers).some(weights => weights[event.id] > 0), event.id);
  }
});
test("all ten required categories and four classifications are represented", () => {
  assert.deepEqual(new Set(EVENTS.map(e => e.category)), new Set(["loot","equipment","creatures","traps","transformations","pranks","bosses","structures","vehicles","collectibles"]));
  assert.deepEqual(new Set(EVENTS.map(e => e.polarity)), new Set(["positive","neutral","negative","special"]));
});
test("all structure templates stay within the 160-cell mobile budget", () => {
  const op = new EventOperations({}, {}, new Map());
  for (const event of EVENTS.filter(e => e.handler === "structure")) {
    const cells = op.structureCells({x:0,y:0,z:0}, event.data.structure);
    assert.ok(cells.length > 0 && cells.length <= 160, `${event.id}: ${cells.length}`);
  }
});
test("both localization files include every event name and description", () => {
  for (const lang of ["en_US", "vi_VN"]) {
    const text = fs.readFileSync(`packs/resource_pack/texts/${lang}.lang`, "utf8");
    for (const id of ids) { assert.match(text, new RegExp(`^${id}\\.name=`, "m")); assert.match(text, new RegExp(`^${id}\\.description=`, "m")); }
  }
});
test("Vietnamese strings do not contain historical mixed-case diacritic typos",()=>{
 for(const event of EVENTS)assert.doesNotMatch(event.name.vi_VN+event.description.vi_VN,/TrờI|ngườI|thờI|ThờI|CườI|NgườI/);
 const text=fs.readFileSync("packs/resource_pack/texts/vi_VN.lang","utf8");assert.doesNotMatch(text,/TrờI|ngườI|thờI|ThờI|CườI|NgườI/);
});
test("custom content never uses the vanilla namespace", () => {
  for (const event of EVENTS) assert.ok(!event.id.startsWith("minecraft:"));
});
