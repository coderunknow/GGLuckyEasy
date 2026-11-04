import { encodeState, decodeState } from "./persistence.js";

export const undeliveredRewards = (rewards, deliveredCount) => rewards.slice(Math.max(0, deliveredCount));

const cleanReward = value => value && typeof value.reward === "string" && typeof value.opener === "string"
  ? { reward: value.reward, count: Math.max(1, Math.min(64, Math.floor(Number(value.count) || 1))), opener: value.opener }
  : undefined;

/** Durable boss ownership and offline reward outbox. Storage is a primitive
 * dynamic-property adapter, making reload behavior independently testable. */
export class BossTracker {
  constructor(read, write) {
    this.read = read; this.write = write; this.reload();
  }
  reload() {
    const decoded = decodeState(this.read(), {}), saved = decoded && typeof decoded === "object" ? decoded : {};
    this.active = new Map();
    for (const [id, value] of Object.entries(saved.active ?? {}).slice(-64)) {
      const valid = cleanReward(value); if (valid) this.active.set(id, valid);
    }
    this.pending = {};
    for (const [player, rewards] of Object.entries(saved.pending ?? {})) {
      if (!Array.isArray(rewards)) continue;
      const valid = rewards.map(cleanReward).filter(Boolean).slice(-32);
      if (valid.length) this.pending[player] = valid;
    }
  }
  save() { this.write(encodeState({ version: 1, active: Object.fromEntries(this.active), pending: this.pending })); }
  track(entityId, reward) {
    const valid = cleanReward(reward); if (!valid) throw new Error("Invalid boss reward");
    if (this.active.size >= 64 && !this.active.has(entityId)) throw new Error("Active boss journal is full");
    this.active.set(entityId, valid); this.save();
  }
  consumeDeath(entityId) {
    const reward = this.active.get(entityId); if (!reward) return undefined;
    this.active.delete(entityId); this.save(); return reward;
  }
  defer(playerId, reward) {
    const valid = cleanReward({ ...reward, opener: playerId }); if (!valid) return;
    const queue = this.pending[playerId] ?? [];
    if (queue.length >= 32) return false;
    queue.push(valid); this.pending[playerId] = queue; this.save(); return true;
  }
  takePending(playerId) {
    const rewards = this.pending[playerId] ?? [];
    delete this.pending[playerId]; if (rewards.length) this.save(); return rewards;
  }
  restorePending(playerId, rewards) {
    if (!rewards.length) return;
    this.pending[playerId] = [...rewards, ...(this.pending[playerId] ?? [])].slice(-32); this.save();
  }
}
