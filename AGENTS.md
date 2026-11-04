# Instructions for future coding agents

## Objective and version

Maintain **GGLuckyEasy**, a free-play Minecraft Bedrock **1.26.30** add-on for Android/iOS and two players. This source revision is `v0.1.0-dev1`; manifest numeric versions remain `[0,1,0]`. Do not silently increment versions or publish stable releases.

## Layout

- `src/events/registry.js`: 90 bilingual event definitions and declarative operation data.
- `src/config/probabilities.json`: authoritative weights, basis points totaling 10,000 per tier. `probabilities.js` is the runtime copy.
- `src/core/`: deterministic selection, idempotency guard, and pure progression/migration logic.
- `src/runtime/operations.js`: bounded Bedrock operation handlers.
- `src/main.js`: subscriptions, server-authoritative activation, persistence, and touch UI.
- `packs/behavior_pack`, `packs/resource_pack`: importable content; scripts are copied from `src` during build.
- `tools/`: validation, build/package, probability, catalog, and original asset generation.
- `tests/`: Node unit, registry, activation, and mocked Bedrock operation tests.
- `evidence/`: actual logs and machine-readable results. Do not edit results to imply a pass.
- `dist/`: reproducible packages and `SHA256SUMS.txt`.

## Commands

```bash
npm ci
npm run validate
npm test
npm run test:probability       # 200,000 seeded draws per tier
npm run build
npm run audit                  # all of the above
node tools/generate-catalog.mjs
```

Original assets are committed. Regeneration is optional and requires Python with Pillow and imageio-ffmpeg: `python tools/generate_assets.py`. Always visually review regenerated art.

## Architecture rules

1. Use only the `luckychaos` namespace; do not override vanilla player/mob/item/block JSON.
2. Keep dependencies pinned to stable `@minecraft/server` 2.8.0 and `@minecraft/server-ui` 2.1.0 for this target. Verify APIs against installed declarations and official creator docs. No experiments are currently required.
3. Event outcomes are selected and executed on the server. Every event needs a real operation, bilingual names/descriptions, weights, bounded resource use, cleanup where applicable, and independent tests.
4. Never inflate the event count with aliases, recolors, text-only effects, or unimplemented IDs. Keep positive/neutral/negative/special and all ten categories meaningful.
5. One broken block produces one outcome. Preserve the same-tick activation guard and release it afterward so a later block at the same coordinate works.
6. Progress is per-player and versioned. Do not duplicate opener XP, co-op assist XP, or boss rewards. Avoid destructive migrations.
7. No natural Lucky Block generation, recipes, automatic distribution, rounds, countdowns, match clocks, score competition, leaderboards, forced winners, or automatic resets.
8. Structures must validate the entire target volume and never overwrite player construction. Keep block/entity/particle operations bounded. Terrain destruction and targeted pranks must remain configurable.
9. Do not add perpetual tick loops, unbounded scans, ticking areas, or expensive geometry/texture atlases.
10. Preserve English and Vietnamese UTF-8 localization and touch-friendly forms.

## Documentation and quality gates

For every meaningful change update the relevant `CHANGELOG.md`, `EVENT_CATALOG.md`, tests, and compatibility notes. Append decisions to `DESIGN_LOG.md`; append failures and resolutions to `FAILURE_LEDGER.md` without deleting history. Keep `RELEASE_CHECKLIST.md` factual.

Required pre-release checks: complete source/docs, pack validation, inspected `.mcaddon`, 60+ meaningful real events, valid probabilities, progression/persistence, both modes/profiles, no forbidden competition systems, critical two-player tests, mobile checks, no critical/high defects, CI, final-revision audit/review, and exact artifact verification.

A missing runtime/device test is **not** a pass. Node mocks are not Bedrock runtime evidence. Compilation is not gameplay verification.

## Release permission

The user authorizes branch commits, push, PR, CI/review, merge, exact `v0.1.0-dev1` tag, and prerelease **only when every mandatory gate passes**. If a known P0/P1 defect or applicable automated/CI gate fails, do not merge, tag, or publish. Under the updated prerelease policy, genuinely inaccessible real-device/multiplayer coverage may remain UNVERIFIED/BLOCKED with explicit disclosure when every applicable available check passes. Never publish to Marketplace or a third party. Release assets must be the exact files whose SHA-256 hashes were verified.
