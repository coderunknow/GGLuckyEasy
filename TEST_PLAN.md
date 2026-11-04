# Test Plan and Evidence

Version under test: `v0.1.0-dev1`. **Expected procedures are not recorded as results.** Automated evidence comes from Linux Node 22; it is not Bedrock runtime evidence.

## Automated tests actually run

Command: `npm run audit` (and targeted reruns). Logs: `evidence/audit.log`, `evidence/unit-tests.log`; structured results: `evidence/static-validation.json`, `evidence/probability.json`, `evidence/probability.csv`, `evidence/build.json`.

| Test | Actual result | Evidence |
|---|---|---|
| JSON parse, UUID uniqueness, mutual dependencies, API pins | PASSED | static-validation |
| Asset, atlas, sound, localization, import, free-play scans | PASSED | static-validation |
| Registry uniqueness and real handler mapping | PASSED, 90 events | unit tests |
| Ten categories and four classifications | PASSED | unit tests |
| Every event’s mocked operation produces a consequence | PASSED, 90/90 | runtime-events tests |
| Structure cell budgets (maximum 160) | PASSED, 8 templates | events tests |
| Deterministic PRNG and all eligible IDs reachable | PASSED | core tests |
| Progression, discovery, skills, migration, player isolation | PASSED | core tests |
| In-flight duplicate guard and later same-coordinate activation | PASSED | activation tests |
| Total tests | **126 passed, 0 failed** after fixes | unit-tests.log |
| Probability, 200,000 seeded draws per tier | PASSED; details below | probability files |
| Reproducible build and ZIP CRC/required entries | PASSED | build.json/audit.log |

### Probability results

Seed base `26032026`, Mulberry32, 200,000 independent weighted draws per tier. Expected and observed frequency for every individual event is in `evidence/probability.csv` and `.json`.

| Tier | Eligible | Draws | Max absolute z | Chi-square / df | Result |
|---|---:|---:|---:|---:|---|
| Lucky | 83 | 200,000 | 2.492 | 62.91 / 82 | PASSED |
| Super | 89 | 200,000 | 2.813 | 92.98 / 88 | PASSED |
| Chaos | 90 | 200,000 | 2.237 | 76.18 / 89 | PASSED |

The max-|z| < 5 check detects gross selection/exclusion errors, not a formal guarantee of randomness. Every table totals 100%. Immediate repeats are allowed so measured selection exactly follows the documented independent model.

## Required Bedrock runtime suite — NOT RUN

Import the exact final `.mcaddon` into retail 26.3 and enable both packs. Record client version, device, world settings, video/screenshots, content logs, and artifact SHA-256.

1. Confirm all three blocks in Creative → Items and via the three `/give` commands.
2. Confirm no recipe, natural generation, deposit, or automatic distribution exists.
3. Place/break every tier in Survival and Creative. Confirm one event, no block drop, one XP award, correct sound/particles, and no recursion.
4. Break two blocks at one coordinate sequentially; both must activate (regression F-004).
5. Trigger each of the 90 IDs through controlled test instrumentation or repeat natural openings until each is observed. Compare actual effect to `EVENT_CATALOG.md`; a mock pass does not check this box.
6. Verify safe failure for one event does not disable subsequent blocks.
7. Check every structure over empty, vegetation, occupied, chest, and protected volumes. Occupied construction must never be overwritten.
8. Test terrain/pranks toggles and all destructive substitutions; back up the test world first.
9. Check English and every Vietnamese name, description, menu, diacritic, and fallback.

**Current status:** BLOCKED — no Bedrock runtime available.

## Progression and persistence runtime suite — NOT RUN

1. Player A opens blocks, gains a level, purchases each skill, and records values.
2. Exit normally and reopen; XP/level/skills/discoveries/settings must match.
3. Disconnect/rejoin and verify no reset or duplicated opening/boss/co-op rewards.
4. Confirm Co-op assist reaches only one nearby partner once; Versus grants none.
5. Attempt duplicate break signals and confirm only one state update.

Pure logic tests PASS; retail save/reload/disconnect tests are BLOCKED.

## Mandatory two-player suite — NOT RUN

On two retail 26.3 Bedrock clients:

1. A places/breaks standard; B sees one consistent outcome.
2. B places/breaks a different tier; attribution remains with B.
3. Both open blocks in close succession; each receives exactly their own outcome/XP.
4. Both participate in a creature/boss event; observe consistent entities/reward.
5. Disconnect B during an event; host and active event must remain stable.
6. Rejoin B; inventory, XP, level, skills, discoveries must be correct with no duplicate rewards.
7. Repeat in Co-op and Versus; all three tiers must remain enabled.
8. Repeat in Survival Free and Minigame Free Arena; no reset/round/timer/winner may occur.
9. Test late join and simultaneous structure/vehicle events.

**Current status:** BLOCKED; no two-player claims are made.

## Mobile and BlueStacks suite — NOT RUN

Test Android physical/emulated client, iOS client, and Android client in BlueStacks on Windows 10. Verify import, touch-only Compass/forms, icons, textures, sounds, Vietnamese diacritics, riding controls, multiplayer invitation, suspend/resume, and world reopen.

**Current status:** BLOCKED; no real devices/emulator available.

## Performance suite — NOT RUN ON TARGET

Measure baseline and during 1/5/10 simultaneous Chaos openings: frame time/FPS, memory, tick/content-log warnings, entity count, particle load, structure latency, cleanup, and reconnect. Include low-end Android and iOS if available. Stress temporary patches, Wither, chicken rain, and simultaneous arena events.

Host benchmark: `evidence/performance.json` measured 600,000 selections in Node with elapsed time and heap delta; this is not mobile evidence. Static budgets implemented: no perpetual tick loop, no ticking areas, 160-cell structure cap, six-chicken cap, small spawn counts, one-shot 32-item magnet, 32×32/16×16 textures, three short compressed sounds. These design limits are **not measured mobile performance evidence**.

## CI and final regression

GitHub Actions runs `npm ci --ignore-scripts` and `npm run audit` on the exact PR head. CI and final-revision results must be recorded after push. All available tests must be rerun after meaningful changes. Review is unavailable unless a real configured provider reports it; no review command is invented.

## Hosted CI and review result

PR #1: GitHub Actions `audit` run `41776709937` completed **SUCCESS** on head `3241e9ea4f3831a1432ed10916fe613f4d02c3e7`. A final run is required after this documentation update. A subsequent documented manual `@coderabbitai full review` trigger on baseline head `b30d57824255615f7aaae13e9f6466a38bff061c` completed with 15 findings. The trigger acknowledgment and inline findings are preserved in `evidence/coderabbit-initial-trigger.json`, `evidence/coderabbit-inline-baseline.json`, and `evidence/review-status.json`. Kilo/Codex/Copilot remained quota-limited. A fresh full review is required on the remediation head.
