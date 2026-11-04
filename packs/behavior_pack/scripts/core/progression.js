export const PROGRESSION_VERSION = 1;
export const SKILLS = {
  fortune: { max: 3, baseCost: 2, description: "bonusLoot" },
  vitality: { max: 3, baseCost: 2, description: "healthBoost" },
  insight: { max: 3, baseCost: 2, description: "discoveryXp" }
};

export function freshProgression() {
  return { version: PROGRESSION_VERSION, xp: 0, level: 1, skillPoints: 0, skills: { fortune: 0, vitality: 0, insight: 0 }, discoveries: [], opened: 0 };
}

export function xpForLevel(level) {
  if (!Number.isInteger(level) || level < 1) throw new Error("Invalid level");
  return 40 + (level - 1) * 25;
}

export function addXp(state, amount) {
  if (!Number.isFinite(amount) || amount < 0) throw new Error("Invalid XP");
  const next = structuredClone(state);
  next.xp += Math.floor(amount);
  while (next.xp >= xpForLevel(next.level)) {
    next.xp -= xpForLevel(next.level);
    next.level++;
    next.skillPoints++;
  }
  return next;
}

export function discover(state, event, baseXp = 12) {
  let next = structuredClone(state);
  const isNew = !next.discoveries.includes(event.id);
  if (isNew) next.discoveries.push(event.id);
  next.opened++;
  const rarity = event.polarity === "special" ? 10 : 0;
  const discoveryBonus = isNew ? 15 + next.skills.insight * 3 : 0;
  next = addXp(next, baseXp + rarity + discoveryBonus);
  return { state: next, isNew, xp: baseXp + rarity + discoveryBonus };
}

export function buySkill(state, skill) {
  const definition = SKILLS[skill];
  if (!definition) throw new Error("Unknown skill");
  const next = structuredClone(state);
  const rank = next.skills[skill];
  if (rank >= definition.max) throw new Error("Skill is maxed");
  const cost = definition.baseCost + rank;
  if (next.skillPoints < cost) throw new Error("Not enough skill points");
  next.skillPoints -= cost;
  next.skills[skill]++;
  return next;
}

export function migrateProgression(raw) {
  if (!raw || typeof raw !== "object") return freshProgression();
  if (raw.version === PROGRESSION_VERSION) return { ...freshProgression(), ...structuredClone(raw), skills: { ...freshProgression().skills, ...raw.skills } };
  // Pre-release/unversioned data is retained conservatively, never deleted.
  return { ...freshProgression(), xp: Math.max(0, Number(raw.xp) || 0), version: PROGRESSION_VERSION };
}
