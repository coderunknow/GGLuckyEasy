import test from "node:test";
import assert from "node:assert/strict";
import { BossTracker } from "../src/core/bosses.js";

function storage(initial) { let raw = initial; return { read: () => raw, write: value => { raw = value; }, get raw() { return raw; } }; }
const reward = { reward: "minecraft:diamond", count: 2, opener: "player-A" };

test("active boss and owner survive a complete tracker reload", () => {
  const store = storage(), first = new BossTracker(store.read, store.write);
  first.track("entity-1", reward);
  const reloaded = new BossTracker(store.read, store.write);
  assert.deepEqual(reloaded.consumeDeath("entity-1"), reward);
  assert.equal(reloaded.active.size, 0);
});
test("offline reward is queued once and survives reload until taken", () => {
  const store = storage(), first = new BossTracker(store.read, store.write);
  first.defer("player-A", reward);
  const reloaded = new BossTracker(store.read, store.write);
  assert.deepEqual(reloaded.takePending("player-A"), [{...reward}]);
  assert.deepEqual(reloaded.takePending("player-A"), []);
  const final = new BossTracker(store.read, store.write);
  assert.equal(final.pending["player-A"], undefined);
});
test("failed delivery can restore the complete pending outbox", () => {
  const store = storage(), tracker = new BossTracker(store.read, store.write);
  tracker.defer("player-A", reward); const pending = tracker.takePending("player-A");
  tracker.restorePending("player-A", pending);
  assert.deepEqual(new BossTracker(store.read, store.write).takePending("player-A"), [reward]);
});
test("unknown entity deaths cannot consume or duplicate another reward", () => {
  const store = storage(), tracker = new BossTracker(store.read, store.write);
  assert.equal(tracker.consumeDeath("unknown"), undefined);
});
test("corrupt persisted boss data is bounded and sanitized", () => {
  const store = storage(JSON.stringify({active:{bad:{count:-9},good:reward},pending:{"player-A":[null,reward,"bad"]}}));
  const tracker = new BossTracker(store.read, store.write);
  assert.equal(tracker.active.size, 1); assert.equal(tracker.pending["player-A"].length, 1);
  assert.deepEqual(tracker.consumeDeath("good"), reward);
});
