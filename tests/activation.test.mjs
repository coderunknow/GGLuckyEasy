import test from "node:test";
import assert from "node:assert/strict";
import { claimActivation, releaseActivation } from "../src/core/activation.js";

test("one coordinate cannot activate twice while in flight", () => {
  const active = new Set();
  assert.equal(claimActivation(active, "overworld:1,64,1"), true);
  assert.equal(claimActivation(active, "overworld:1,64,1"), false);
});
test("a later block at the same coordinate activates after release", () => {
  const active = new Set(), key = "overworld:1,64,1";
  claimActivation(active, key); releaseActivation(active, key);
  assert.equal(claimActivation(active, key), true);
});
test("different dimensions and coordinates are independent", () => {
  const active = new Set(); claimActivation(active, "overworld:1,64,1");
  assert.equal(claimActivation(active, "nether:1,64,1"), true);
  assert.equal(claimActivation(active, "overworld:2,64,1"), true);
});
