# Design Log

Append-only chronological record. Dates use UTC.

## 2026-11-04 — 001: Repository and target verification

Inspected branch `arena/ce9d6d13-ggluckyeasy`, HEAD `4e68b7e3e65c81970874e39a8097e5c88394ad63`; only the initial README/LICENSE existed and there were no tags or releases. Official Minecraft 1.26.30 creator notes identify stable `@minecraft/server` 2.8.0 and `@minecraft/server-ui` 2.1.0. **Impact:** use `[1,26,30]`, stable pinned modules, no experiments, and do not infer compatibility from newer docs.

## 2026-11-04 — 002: Server-authoritative data-driven architecture

Chose declarative event records plus named `EventOperations` handlers rather than a conditional chain. World dynamic properties hold settings and per-player state. **Impact:** events fail in isolation, probability data can be tested without Bedrock, and each player has a stable world-scoped persistence key.

## 2026-11-04 — 003: Three distinct probability tables

Weights use integer basis points (10,000 = 100%). Category/polarity factors make standard reward-leaning, super more special, and chaos more hazardous; rare content is excluded selectively. Lucky has 83 eligible events, Super 89, Chaos 90. **Impact:** the rarest tier is not uniformly best and every individual probability is auditable in JSON/catalog.

## 2026-11-04 — 004: Ninety meaningful outcomes

Implemented 12 loot, 8 equipment, 12 creature, 12 trap, 8 transformation, 10 prank, 8 boss, 8 structure, 6 vehicle, and 6 collectible outcomes. Vanilla entities are named/combined into encounters rather than introducing incompatible custom geometry. **Impact:** broad testable variety with low asset/runtime complexity, but custom creature/boss model polish remains limited.

## 2026-11-04 — 005: Free-play modes and interaction profiles

Survival makes no world-generation changes. Arena mode is an optional explicit 25×25 platform action, with no reset or match state. Co-op grants one nearby partner a smaller separately persisted assist reward; Versus disables assist rewards without changing blocks. **Impact:** both combinations remain continuous and noncompetitive.

## 2026-11-04 — 006: Lightweight progression

Opening XP plus first-discovery and special-event bonuses feed a 40 + 25×(level−1) curve. Levels grant points for Fortune, Vitality, and Insight (three ranks each). **Impact:** understandable persistent upgrades without currencies, shops, daily tasks, or mandatory competition.

## 2026-11-04 — 007: Original visual/audio direction

Authored deterministic 32×32 pixel-art blocks and 16×16 item icons with gold, cyan, and magenta/cyan identities, beveled borders, rivets, and bold question silhouettes. Added three short original synthesized Vorbis chimes. Visually reviewed `assets/art-overview.png`. **Impact:** readable mobile icons and distinct tiers without large atlases or third-party assets.

## 2026-11-04 — 008: Bounded destruction and safe structures

Terrain destruction defaults on as requested, with safe substitutions when disabled. Temporary patches restore; spawns and block loops are capped. Structures always validate all cells and reject occupied volumes even in destructive mode. **Impact:** dramatic events remain available without blindly deleting player buildings.

## 2026-11-04 — 009: Probability integrity over anti-repeat bias

An initial conditional retry for immediate repeats was removed. Although it reduced repetition, it changed conditional probabilities and complicated verification. Independent weighted draws now exactly implement the documented tables. **Impact:** repeat outcomes remain possible, while seeded frequency evidence directly represents gameplay selection.

## 2026-11-04 — 010: Activation idempotency correction

Source review found that retaining coordinate keys indefinitely would prevent a later block at the same position. Changed the guard to reject only in-flight same-tick duplicates and release in `finally`; added regression tests. **Impact:** no duplicate rewards while repeated play at one coordinate remains valid.

## 2026-11-04 — 011: Release evidence policy

Linux/Node validation and mocks cannot prove Bedrock import, real-device rendering, performance, or two-client synchronization. **Impact:** these gates remain BLOCKED/UNVERIFIED; do not merge, tag, or publish the authorized prerelease until real tests pass.

## 2026-11-04 — 012: Primitive JSON persistence

Declaration-level type checking found that dynamic properties cannot store arbitrary objects. Settings and progression now use UTF-8 JSON strings through a safe codec. **Impact:** persistence conforms to the stable 2.8.0 contract, malformed/missing values fall back without destructive migration, and Unicode/state-size behavior has regression tests.
