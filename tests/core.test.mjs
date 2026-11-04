import test from "node:test";
import assert from "node:assert/strict";
import { createRandom, selectEvent, validateWeights } from "../src/core/random.js";
import { freshProgression, addXp, discover, buySkill, migrateProgression, xpForLevel } from "../src/core/progression.js";
import { EVENTS } from "../src/events/registry.js";
import table from "../src/config/probabilities.json" with { type: "json" };

test("PRNG is reproducible", () => {
  const a = createRandom(123456), b = createRandom(123456);
  assert.deepEqual(Array.from({length: 100}, a), Array.from({length: 100}, b));
});
test("all tier probability tables are complete and total 100%", () => { assert.ok(validateWeights(EVENTS, table)); });
test("selection is deterministic and can reach every eligible event", () => {
  for (const [tier, weights] of Object.entries(table.tiers)) {
    const random = createRandom(0x1234 + tier.length), seen = new Set();
    for (let i = 0; i < 50000; i++) seen.add(selectEvent(EVENTS, weights, random).id);
    assert.deepEqual([...seen].sort(), Object.keys(weights).filter(id => weights[id] > 0).sort(), tier);
  }
});
test("level curve grants points without grinding thousands of openings", () => {
  let p = freshProgression(); p = addXp(p, xpForLevel(1));
  assert.equal(p.level, 2); assert.equal(p.xp, 0); assert.equal(p.skillPoints, 1);
});
test("discovery XP is awarded once while opening XP continues", () => {
  const event = EVENTS[0]; let p = freshProgression();
  const first = discover(p, event, 10), second = discover(first.state, event, 10);
  assert.equal(first.isNew, true); assert.equal(second.isNew, false);
  assert.equal(second.state.opened, 2); assert.equal(second.state.discoveries.length, 1);
  assert.ok(second.xp < first.xp);
});
test("skill costs and caps are enforced", () => {
  let p = addXp(freshProgression(), 10000);
  p = buySkill(p, "fortune"); assert.equal(p.skills.fortune, 1);
  assert.throws(() => buySkill(freshProgression(), "fortune"), /Not enough/);
  assert.throws(() => buySkill(p, "unknown"), /Unknown/);
});
test("migration preserves old XP and malformed data gets a safe fresh state", () => {
  assert.equal(migrateProgression({xp: 12}).xp, 12);
  assert.equal(migrateProgression(null).level, 1);
});
test("player state cloning prevents co-op/versus cross-attribution", () => {
  const a = freshProgression(), b = freshProgression();
  const next = discover(a, EVENTS[0], 10).state;
  assert.notEqual(next, b); assert.equal(b.discoveries.length, 0);
});
