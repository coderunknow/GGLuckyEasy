# GGLuckyEasy v0.1.0-dev1 — Final Release Audit

## Scope and identity

Product identity was normalized to **GGLuckyEasy** across manifests, UI, documentation, metadata, and artifact filenames. Internal `luckychaos` identifiers, UUIDs, namespaces, and saved-world keys remain stable. Version remains `v0.1.0-dev1`; manifest numeric versions remain `[0,1,0]`.

## Engineering audit

The audit covered activation/concurrency, all 90 event definitions and handlers, probability selection, progression, dynamic-property validation, multiplayer attribution, boss/outbox persistence, terrain restoration, arena writes, UI/raw messages, touch navigation, vanilla entity events, rideables, localization, pack assets, dependency integrity, build reproducibility, and archive semantics.

### P1 findings and resolutions

- Volatile boss ownership and offline rewards → durable bounded tracker/outbox; no capacity eviction; partial delivery restores only undelivered entries.
- Volatile temporary terrain cleanup → durable bounded journal; invalid/unloaded blocks stay recorded; journal-write failure rolls back immediately; later player edits are preserved.
- Container/arena overwrite risks → protected-type and inventory checks, proximity fallbacks, and complete arena-volume prevalidation.
- Stale skill-form writes and malformed state → fresh-state purchase and schema sanitization.
- Probability runtime could differ from tested JSON → build regenerates JS and validation enforces parity.
- Hard-coded event PASS and non-failing probability REVIEW → source/test-hash evidence and nonzero failure behavior.
- Flat add-on layout risk → nested Behavior/Resource `.mcpack` members with semantic manifest/dependency inspection.

### P2/P3 findings and resolutions

Corrected block geometry, item display-name shape, sound-definition location, Vietnamese typography/language registration, RawMessage shapes, menu navigation, enchanted books, Feather Falling boots, slime sizing, bee behavior, pig/strider saddling, swap radius, Apache-2.0 metadata, CI/current-log separation, and catalog validation references.

Custom creature/boss/vehicle geometry was evaluated but not added: vanilla models remain the reliable presentation for this development prerelease. Player mesh scaling is not claimed; tiny/giant outcomes are explicitly effect-based.

## Verification summary

| Check | Environment | Result | Evidence |
|---|---|---|---|
| Static selected pack checks | Linux/Node | PASS | `evidence/static-validation.json` |
| Stable API declaration typecheck | server 2.8.0/UI 2.1.0 | PASS | `evidence/final-local-audit.log` |
| Automated suite | Node 22 | 134/134 PASS | `evidence/final-local-audit.log` |
| Event operation mocks | 90 outcomes | PASS; not device evidence | `evidence/event-results.json` |
| Probability | 200,000 seeded draws/tier | PASS | `evidence/probability.json` and `.csv` |
| Dependency audit | npm | 0 vulnerabilities | `evidence/npm-audit.json` |
| Host selection benchmark | Node/Linux | Measured; not mobile evidence | `evidence/performance.json` |
| Build/archive semantics | Python ZIP inspection | PASS | `evidence/build.json` |
| Two-build reproducibility | Consecutive SHA-256 comparison | PASS | `evidence/reproducibility.json` |
| Full Bedrock schema validation | Not available | UNVERIFIED | Selected static checks are not represented as exhaustive schema validation |
| Retail import/gameplay | No Bedrock client | UNVERIFIED | `TEST_PLAN.md` |
| Android/iOS/BlueStacks | No accessible devices | BLOCKED | `TEST_PLAN.md` |
| Two-client multiplayer | No two clients | BLOCKED | `TEST_PLAN.md` |
| Mobile FPS/memory | No mobile runtime | UNVERIFIED | Host benchmark is not substituted |

## Independent review

- CodeRabbit baseline full review on `b30d57824255615f7aaae13e9f6466a38bff061c`: FINISHED; 15 findings addressed.
- CodeRabbit remediation full review on `6ee57c96c3a4643bb67104de55a7730c9e13984a`: FINISHED; 11 findings addressed.
- CodeRabbit final-candidate full review on `18d6e1a8506dca64fffcbb20ebc5e1c8a19a550e`: FINISHED; 9 findings addressed.
- CodeRabbit consolidated review on `d2a642918bdb63bed256311b0097ed60ff0915b5`: FINISHED; 6 findings addressed.
- CodeRabbit release-head review on `1425baf84d8c1cb689c0845ec9a1996a92dd2482`: FINISHED; 8 findings addressed.
- Final publication-candidate review: required after this push and recorded in `evidence/review-status.json`.
- Kilo/Codex/Copilot: quota-limited; no completed findings claimed.

Raw review data is preserved in `evidence/coderabbit-*.json`.

## Release rationale

The owner’s prerelease exception permits inaccessible device/two-player coverage to remain explicitly UNVERIFIED/BLOCKED when all applicable automated and CI checks pass and no known P0/P1 defect remains. This exception does not hide the unavailable coverage or convert mocks into gameplay evidence. Current-head review and final PR CI are pre-merge gates. Post-merge CI and an exact-merged-commit rebuild are post-merge gates. Published-hash verification is a post-publication gate.
