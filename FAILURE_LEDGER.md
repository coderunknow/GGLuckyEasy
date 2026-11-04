# Failure Ledger

Append-only. Resolved failures remain recorded.

## F-001 — 2026-11-04 — Python asset environment

- **Reproduction:** `python3 -m pip install pillow imageio-ffmpeg`.
- **Expected:** install local asset-generation tools.
- **Actual:** PEP 668 `externally-managed-environment` error.
- **Root cause:** system Python intentionally prohibits global pip changes.
- **Evidence:** initial shell error retained in session; fix command uses `.venv`.
- **Fix:** created ignored local virtual environment and installed there.
- **Regression:** `.venv/bin/python tools/generate_assets.py` completed and generated reviewed assets.
- **Status:** RESOLVED.

## F-002 — 2026-11-04 — Discovery unit assertion

- **Component:** `tests/core.test.mjs`.
- **Reproduction:** initial `npm test`.
- **Expected:** second discovery of the same event grants less XP.
- **Actual:** assertion compared current level remainder, which can increase after level-up, and failed.
- **Root cause:** test used the wrong observable, not an XP calculation defect.
- **Evidence:** first TAP output, subtest 5.
- **Fix:** compare the returned per-award XP values.
- **Regression:** discovery test and full suite pass.
- **Status:** RESOLVED.

## F-003 — 2026-11-04 — Bedrock type-only package under Node

- **Component:** `tests/events.test.mjs`.
- **Reproduction:** initial `npm test` imported `operations.js`.
- **Expected:** inspect operation methods in Node.
- **Actual:** `ERR_MODULE_NOT_FOUND ... @minecraft/server/index.js`.
- **Root cause:** official package supplies declarations, not a Node implementation.
- **Evidence:** first TAP/Node stack output.
- **Fix:** load operation source with game-only imports stubbed; mock runtime smoke tests use explicit fakes.
- **Regression:** 110 tests pass after the fourth harness correction.
- **Status:** RESOLVED.

## F-004 — 2026-11-04 — Same-coordinate activation lock

- **Component:** activation guard in `src/main.js`.
- **Reproduction:** code-audit scenario: break a Lucky Block, place another at the same coordinate before 2,048 other activations, break it.
- **Expected:** every successfully broken placed block activates once.
- **Actual:** retained coordinate key would suppress the later block.
- **Root cause:** duplicate-protection cache had no per-activation release.
- **Evidence:** source audit on 2026-11-04; regression `tests/activation.test.mjs`.
- **Fix:** `claimActivation` plus `releaseActivation` in `finally` after the scheduled activation.
- **Regression:** same-tick duplicate rejection and same-coordinate later activation both pass.
- **Status:** RESOLVED in source; real Bedrock behavior UNVERIFIED.

## F-005 — 2026-11-04 — Mock observability gaps

- **Component:** `tests/runtime-events.test.mjs`.
- **Reproduction:** run the new 90-event mock smoke suite.
- **Expected:** every event records an observable consequence.
- **Actual:** explosion, magnet, swap, and sound-show failed only the consequence counter.
- **Root cause:** harness did not record explosions, item teleports, player teleports, or sounds; handlers did execute those methods.
- **Evidence:** TAP subtests 61, 67, 70, and 74 in the second run.
- **Fix:** instrumented those methods and included actions in the consequence count.
- **Regression:** all 90 operation smoke tests pass.
- **Status:** RESOLVED.

## F-006 — 2026-11-04 — Real-device and multiplayer access

- **Component:** release verification.
- **Reproduction:** inspect available sandbox/runtime inventory.
- **Expected:** retail Android/iOS/BlueStacks Bedrock 26.3 with two players.
- **Actual:** only Linux/Node/Python packaging tools are available; no Bedrock client, emulator, or second device.
- **Root cause:** environment access, not a source test failure.
- **Evidence:** this session’s tool/runtime inventory; no fabricated device logs.
- **Fix:** no viable code fix; exact manual procedures are in `TEST_PLAN.md`.
- **Regression:** must run on real clients before release.
- **Status:** BLOCKED.

## F-007 — 2026-11-04 — Dynamic-property object persistence

- **Component:** settings and progression persistence.
- **Reproduction:** `npx tsc -p tsconfig.json` against stable 2.8.0 declarations.
- **Expected:** world dynamic properties store settings/progression objects.
- **Actual:** type audit rejected object values; the API accepts only primitives/Vector3.
- **Root cause:** initial implementation passed objects directly instead of serializing them.
- **Evidence:** TS2698/TS2345 from the first declaration-level audit.
- **Fix:** added `encodeState`/`decodeState` JSON-string codec for settings and progression, plus safe fallback.
- **Regression:** Unicode round-trip, malformed data, and full-state size tests; typecheck passes.
- **Status:** RESOLVED in source; actual world save/reopen remains UNVERIFIED.

## F-008 — 2026-11-04 — Boss reward and temporary-terrain durability

- **Severity:** P1. **Reproduction:** reload after spawning a boss or temporary patch; disconnect the opener before boss death.
- **Expected:** ownership, one reward, and temporary cleanup survive lifecycle transitions.
- **Actual:** in-memory boss map lost rewards; scheduled terrain restoration was lost on reload.
- **Fix:** versioned `BossTracker` outbox and `TerrainJournal`, plus reload restoration and regression tests.
- **Status:** RESOLVED in source/simulation; retail lifecycle UNVERIFIED.

## F-009 — 2026-11-04 — Terrain/container and arena overwrite risks

- **Severity:** P1. **Reproduction:** place containers/construction in patch, pit, explosion, or arena volume; edit a temporary patch before cleanup.
- **Expected:** no uncontrolled data loss or cleanup overwriting newer edits.
- **Actual:** several paths replaced containers/arena contents and cleanup restored unconditionally.
- **Fix:** protected-type/container checks, conditional permutation restoration, explosion/TNT proximity fallback, and full arena prevalidation.
- **Status:** RESOLVED in source with world-safety tests.

## F-010 — 2026-11-04 — Pack and archive schema findings

- **Severity:** P1/P2. **Source:** independent self-audit and CodeRabbit baseline full review.
- **Actual:** missing block geometry, item display-name shape, root-level sound definitions, invalid bee event, blank enchanted books, and flat `.mcaddon` layout risked broken presentation/import.
- **Fix:** corrected pack JSON, moved sounds, verified vanilla slime/bee events, enchanted books, and nested `.mcpack` archives with semantic validation.
- **Status:** RESOLVED statically; actual import UNVERIFIED.

## F-011 — 2026-11-04 — Evidence tooling could report false success

- **Severity:** P1 process integrity. **Actual:** catalog generation hard-coded PASS and probability REVIEW exited zero.
- **Fix:** catalog requires hash-matched event results and preserves separate device evidence; probability REVIEW now exits nonzero.
- **Status:** RESOLVED.
