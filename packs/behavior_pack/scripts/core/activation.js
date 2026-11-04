// Same-tick idempotency guard. Releasing after the callback permits a later,
// legitimate Lucky Block placement at the same coordinate.
export function claimActivation(active, key) {
  if (active.has(key)) return false;
  active.add(key);
  return true;
}
export function releaseActivation(active, key) { active.delete(key); }
