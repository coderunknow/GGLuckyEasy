# Compatibility Matrix

Statuses: **VERIFIED**, **PARTIALLY VERIFIED**, **UNVERIFIED**, **FAILED**, **NOT APPLICABLE**.

## Target and official sources

- **Target game:** Minecraft Bedrock retail **1.26.30**, called “26.3” in the product request.
- **Official verification:** [Minecraft Bedrock 1.26.30 Update Notes for Creators](https://learn.microsoft.com/en-us/minecraft/creator/documents/update1.26.30?view=minecraft-bedrock-stable) states that this release ships `@minecraft/server` **2.8.0** and `@minecraft/server-ui` **2.1.0**.
- [Script Module Versioning](https://learn.microsoft.com/en-us/minecraft/creator/documents/scripting/versioning?view=minecraft-bedrock-stable) explains that module and game versions are independent.
- Installed npm declarations are pinned exactly to 2.8.0/2.1.0 in `package-lock.json`; source API usage was checked against those declarations.
- **Status:** documentation/API version **VERIFIED**; actual game execution **UNVERIFIED**.

## Pack contract

| Item | Value | Status |
|---|---|---|
| Behavior/Resource manifest format | 2 | VERIFIED by static validation |
| Numeric pack/module version | `[0,1,0]` | VERIFIED |
| Product prerelease label | `v0.1.0-dev1` (not in numeric array) | VERIFIED |
| `min_engine_version` | `[1,26,30]` | VERIFIED |
| `@minecraft/server` | `2.8.0`, stable | VERIFIED as pinned/declared; runtime UNVERIFIED |
| `@minecraft/server-ui` | `2.1.0`, stable | VERIFIED as pinned/declared; runtime UNVERIFIED |
| Beta APIs experiment | Not used | NOT APPLICABLE |
| Upcoming Creator Features | Not used | NOT APPLICABLE |
| Other experiments | None required | NOT APPLICABLE |
| Namespace | `luckychaos` | VERIFIED statically |
| Mutual pack dependencies | Matching fixed UUIDs and `[0,1,0]` | VERIFIED statically |
| JSON/assets/localization/imports | Automated validator | PASSED statically |

## Platforms

| Environment | Finding | Status |
|---|---|---|
| Android Bedrock 26.3 | Touch forms and standard add-on packages implemented; no device available | UNVERIFIED |
| iOS Bedrock 26.3 | Same package architecture; no device available | UNVERIFIED |
| Windows 10 + BlueStacks Android | Correctly documented as Android, not Windows Bedrock; no BlueStacks runtime available | UNVERIFIED |
| Two-player Bedrock LAN/Friends | Server-authoritative logic and per-player persistence implemented; no two clients available | UNVERIFIED |
| Linux Node 22 | Static/unit/mock/probability/build checks | VERIFIED; not a game runtime |
| Minecraft Java Edition | Not supported | NOT APPLICABLE |
| Marketplace | No publication requested or performed | NOT APPLICABLE |

## Technical limitations

1. Entity and boss visuals use vanilla models with names, effects, compositions, particles, and sounds. Custom creature/boss/vehicle geometry and bespoke entity textures are **not implemented**; visual quality in-game is UNVERIFIED.
2. “Tiny” and “giant” transformations are effect-based fantasy presentations, not persistent player mesh scaling. This avoids unsupported player overrides.
3. Boss bonus-reward tracking is in memory. A boss spawned before a complete world reload may not receive its tracked reward afterward. Normal player XP/settings persistence is separately versioned and saved.
4. Dynamic properties assume stable Bedrock player IDs within the same world. Real leave/rejoin persistence must be verified on retail clients.
5. Structure placement never overwrites occupied construction; in crowded spaces the event safely fizzles and reports a generic safe-failure message.
6. Terrain destruction defaults to enabled. Its consequences on real mobile performance and world safety are UNVERIFIED; backups are required advice.
7. No `.mcworld` demo is included. Arena setup is available through the operator Compass and the `.mcaddon` works independently.

## Current compatibility conclusion

The source targets the officially documented stable 26.3 API contract and passes static/package checks. **Retail import, runtime event behavior, rendering, Android/iOS, BlueStacks, multiplayer synchronization, and mobile performance are not verified. No compatibility success beyond the listed static evidence is claimed.**
