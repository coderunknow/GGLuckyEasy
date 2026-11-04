import test from "node:test";
import assert from "node:assert/strict";
import { encodeState, decodeState } from "../src/core/persistence.js";
import { freshProgression } from "../src/core/progression.js";

test("progression and Unicode settings round-trip as primitive JSON strings", () => {
  const state = { ...freshProgression(), discoveries: ["loot_emerald_cache"], label: "Khối Hỗn Loạn" };
  const encoded = encodeState(state);
  assert.equal(typeof encoded, "string"); assert.deepEqual(decodeState(encoded, null), state);
});
test("missing, malformed, or non-string dynamic properties use non-destructive fallback", () => {
  assert.deepEqual(decodeState(undefined, {version:1}), {version:1});
  assert.deepEqual(decodeState("{bad", {version:1}), {version:1});
  assert.deepEqual(decodeState(12, {version:1}), {version:1});
});
test("complete discovery state remains below Bedrock's 32,767-character property limit", () => {
  const state = freshProgression(); state.discoveries = Array.from({length:90},(_,i)=>`event_${String(i).padStart(4,"0")}_long_discovery_name`);
  assert.ok(encodeState(state).length < 32767);
});
