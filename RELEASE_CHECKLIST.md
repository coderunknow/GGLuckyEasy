# Release Checklist — v0.1.0-dev1

A missing test is not a pass. Automated source/package checks do not substitute for retail gameplay evidence.

| # | Mandatory gate | Status | Evidence / blocker |
|---|---|---|---|
| 1 | Source project complete | PASSED (scope implementation) | Registry/runtime/packs/tools/tests exist; known visual limitations documented |
| 2 | Mandatory documentation current | PASSED | All required root documents and event catalog |
| 3 | Both packs validate | PASSED (static) | `evidence/static-validation.json` |
| 4 | Combined `.mcaddon` built and inspected | PASSED | CRC/required entries in `evidence/build.json` |
| 5 | All three tiers work | BLOCKED | Static mapping passed; real Bedrock placement/break activation unverified |
| 6 | 60+ meaningful events fully implemented and tested | BLOCKED | 90 implemented + mock-smoke tested; 90/90 real runtime tests unavailable |
| 7 | Probability tables valid | PASSED | 100% tables and 200,000 seeded draws/tier in evidence |
| 8 | Progression and persistence work | BLOCKED | Pure logic passed; actual leave/reopen/reconnect unverified |
| 9 | Both play modes function | BLOCKED | Implementations exist; real runtime unverified |
| 10 | Both interaction profiles function | BLOCKED | Logic implemented; two-player behavior unverified |
| 11 | No timers/leaderboards/scores/forced rounds/competition | PASSED (source audit) | Validator policy scan and source inspection |
| 12 | Critical multiplayer tests pass | BLOCKED | No two Bedrock clients available |
| 13 | No unresolved critical/high defects | BLOCKED | Runtime defects cannot be excluded without device tests; F-006 open |
| 14 | Required compatibility checks pass | BLOCKED | Official stable versions verified; retail/Android/iOS/BlueStacks unverified |
| 15 | CI passes | IN PROGRESS | Workflow added; must run on final PR head |
| 16 | Final source revision audited | PASSED (local final tree) | Full `npm run audit`, source scans, API typecheck, and archive inspection passed |
| 17 | Required review findings resolved | NOT APPLICABLE (external) / PASSED (self-review) | No configured external reviewer; substantive self-review findings F-004/F-007 fixed and retested |
| 18 | Actual release artifacts verified | PARTIALLY VERIFIED | ZIP structure/CRC/hash verified; import and device artifacts unverified |

## Release decision

**DO NOT MERGE, TAG, OR PUBLISH.** Real-device runtime, persistence, and mandatory two-player gates are blocked. The exact remaining environmental blocker and procedures are in `TEST_PLAN.md` and `FAILURE_LEDGER.md` F-006. CI/review status must be updated from actual final-head results, never assumed.
