# Changelog

## v0.1.0-dev1 — 2026-11-04 (unreleased development build)

### Added

- Three Creative/command-only Lucky Block tiers with distinct original pixel art, sounds, and 100% weighted probability tables.
- 90 registered bilingual outcomes across loot, equipment, creatures, traps, transformations, pranks, bosses, structures, vehicles, and collectibles.
- Server-authoritative break activation with same-tick duplicate protection and isolated event error handling.
- Survival Free and optional Minigame Free Arena setup; Co-op and Versus profiles without rounds, timers, scores, or resets.
- Persistent per-player XP, levels, discoveries, Fortune/Vitality/Insight upgrades, and versioned world settings.
- Touch-friendly Chaos Compass guide, progression, collection, and operator configuration forms.
- Original block/item artwork, pack icons, three synthesized tier sounds, English and Vietnamese localization.
- Bounded terrain events, configurable destruction/pranks, structure-volume validation, and temporary terrain restoration.
- Reproducible `.mcaddon`/`.mcpack` build, SHA-256 sums, 110 automated tests, 600,000 probability draws, validation/build evidence, and GitHub Actions audit.

### Changed

- Removed anti-repeat retry to preserve the exact independent documented probability model.
- Structures reject all occupied construction even when terrain destruction is enabled.

### Fixed

- Released activation keys after each event so later blocks at the same coordinate activate correctly.
- Corrected nested localization messages and isolated Node-only Bedrock test imports.
- Corrected discovery test observability and mock action instrumentation.

### Removed

- No natural generation, crafting, automatic distribution, competition systems, or experimental API dependencies were introduced.

### Known limitations

- No real Bedrock import/runtime, two-player, Android/iOS, BlueStacks, or mobile performance test has been performed. This build is **not release-gate complete**.
- Creature/boss/vehicle encounters use vanilla models rather than bespoke entity geometry/textures.
- Tiny/giant transformations are effect-based rather than mesh scaling.
- Boss reward tracking does not survive a full world reload after the boss has spawned.
- No optional `.mcworld` is included.
