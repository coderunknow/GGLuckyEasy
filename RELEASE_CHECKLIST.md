# Release Checklist — GGLuckyEasy v0.1.0-dev1

Statuses preserve the difference between automated evidence and unavailable retail coverage. Under the owner’s updated prerelease policy, genuinely inaccessible device/multiplayer checks may remain `UNVERIFIED`/`BLOCKED` when all applicable available checks pass, no known P0/P1 defect remains, and limitations are disclosed.

| # | Gate | Status | Evidence / rationale |
|---|---|---|---|
| 1 | Complete source and consistent GGLuckyEasy branding | PASS | Source/pack/docs/artifact branding; internal identifiers preserved |
| 2 | Mandatory documentation current | PASS | Required root documents and hash-matched event catalog |
| 3 | Both packs validate | PASS | JSON, schemas checked, geometry, display names, sounds, assets, localization |
| 4 | Combined `.mcaddon` built and semantically inspected | PASS | Two nested `.mcpack` files, manifests/dependencies/assets/CRC in `evidence/build.json` |
| 5 | Three tier implementations audited | PASS (source) / UNVERIFIED (retail) | Registration, activation, probabilities, and handlers checked; no client available |
| 6 | 90 meaningful events implemented and audited | PASS (source/mock) / UNVERIFIED (retail) | 90/90 hash-matched mock consequences plus event audit |
| 7 | Probability tables and sampling valid | PASS | 10,000 basis points/tier; 200,000 seeded draws/tier; REVIEW exits nonzero |
| 8 | Progression/persistence defects resolved | PASS (source/simulation) / UNVERIFIED (retail) | Schema sanitization, race fix, boss/terrain journals and regression tests |
| 9 | Both free-play modes audited | PASS (source) / UNVERIFIED (retail) | Survival unchanged; arena prevalidation; no resets |
| 10 | Co-op/Versus audited | PASS (source) / BLOCKED (two-client) | Reward attribution and independent persistence reviewed |
| 11 | No forbidden competition systems | PASS | Source and validator policy scans |
| 12 | Real multiplayer tests | BLOCKED | No two Bedrock clients; disclosed prerelease exception |
| 13 | No known unresolved P0/P1 defects | PASS | F-008 through F-011 remediated and regression-tested |
| 14 | Stable compatibility checks | PASS (declarations/docs) / UNVERIFIED (device) | 1.26.30; server 2.8.0; UI 2.1.0; no experiments |
| 15 | CI on final PR head | IN PROGRESS | Must pass after remediation push |
| 16 | Final source audit | IN PROGRESS | Full local audit must be rerun on final tree |
| 17 | Current-head CodeRabbit review and findings | IN PROGRESS | Baseline full review FINISHED with 15 findings; fixes require new full review |
| 18 | Actual release artifacts verified | PASS (static) / UNVERIFIED (import) | Final names/hashes/semantic archive checks; real import unavailable |
| 19 | Post-merge CI and final-commit artifact rebuild | NOT STARTED | Required after PR merge |
| 20 | Published assets match local SHA-256 | NOT STARTED | Required after prerelease upload |

## Current decision

Remediation may proceed to merge/tag/prerelease only after the current-head review, final local audit, and CI pass. Device and multiplayer gaps will remain explicit in release notes; they are not treated as successful tests. Post-merge CI, final-commit rebuild, tag target, and published hashes are mandatory.
