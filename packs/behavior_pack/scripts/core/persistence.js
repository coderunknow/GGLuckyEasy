// Bedrock dynamic properties support primitives/Vector3, not arbitrary objects.
// All add-on objects therefore use versioned UTF-8 JSON strings.
export function encodeState(value) { return JSON.stringify(value); }
export function decodeState(raw, fallback) {
  if (typeof raw !== "string") return fallback;
  try { return JSON.parse(raw); } catch { return fallback; }
}
