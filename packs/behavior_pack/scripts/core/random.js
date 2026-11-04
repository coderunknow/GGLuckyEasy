// Mulberry32: deterministic, serializable PRNG for reproducible tests.
export function createRandom(seed = 0x4c55434b) {
  let state = seed >>> 0;
  return () => {
    state = (state + 0x6d2b79f5) >>> 0;
    let value = state;
    value = Math.imul(value ^ (value >>> 15), value | 1);
    value ^= value + Math.imul(value ^ (value >>> 7), value | 61);
    return ((value ^ (value >>> 14)) >>> 0) / 4294967296;
  };
}

export function selectEvent(events, weights, random = Math.random) {
  const eligible = events.filter(event => (weights[event.id] ?? 0) > 0);
  const total = eligible.reduce((sum, event) => sum + weights[event.id], 0);
  if (total !== 10000) throw new Error(`Tier weights must total 10000; got ${total}`);
  let roll = random() * total;
  for (const event of eligible) {
    roll -= weights[event.id];
    if (roll < 0) return event;
  }
  return eligible.at(-1);
}

export function validateWeights(events, table) {
  const ids = new Set(events.map(event => event.id));
  for (const [tier, weights] of Object.entries(table.tiers)) {
    const total = Object.values(weights).reduce((a, b) => a + b, 0);
    if (total !== table.total) throw new Error(`${tier}: total ${total}`);
    for (const id of Object.keys(weights)) if (!ids.has(id)) throw new Error(`${tier}: unknown ${id}`);
    for (const event of events) {
      const weight = weights[event.id];
      if (!Number.isInteger(weight) || weight < 0) throw new Error(`${tier}/${event.id}: invalid weight`);
    }
  }
  return true;
}
