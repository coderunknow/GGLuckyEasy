import test from "node:test";
import assert from "node:assert/strict";
import { BossTracker, undeliveredRewards } from "../src/core/bosses.js";

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
test("capacity never evicts an older boss or silently drops an offline reward",()=>{
 const store=storage(),tracker=new BossTracker(store.read,store.write);
 for(let i=0;i<64;i++)tracker.track(`entity-${i}`,reward);
 assert.throws(()=>tracker.track("overflow",reward),/full/);assert.equal(tracker.active.has("entity-0"),true);
 for(let i=0;i<32;i++)tracker.defer("player-A",reward);
 assert.equal(tracker.defer("player-A",reward),false);assert.equal(tracker.pending["player-A"].length,32);
});
test("partial delivery restores only undelivered rewards",()=>{
 const rewards=[reward,{...reward,reward:"minecraft:emerald"},{...reward,reward:"minecraft:gold_ingot"}];
 assert.deepEqual(undeliveredRewards(rewards,2),[rewards[2]]);assert.deepEqual(undeliveredRewards(rewards,3),[]);
});
test("corrupt persisted boss data is bounded and sanitized", () => {
  const store = storage(JSON.stringify({active:{bad:{count:-9},good:reward},pending:{"player-A":[null,reward,"bad"]}}));
  const tracker = new BossTracker(store.read, store.write);
  assert.equal(tracker.active.size, 1); assert.equal(tracker.pending["player-A"].length, 1);
  assert.deepEqual(tracker.consumeDeath("good"), reward);
});
