# GGLuckyEasy Event Catalog

Version `v0.1.0-dev1`. Weights are basis points in `src/config/probabilities.json`; 10,000 = 100%. A dash means ineligible. **Automated status is read from hash-matched test evidence, never assumed. Mock tests are not Bedrock device tests.**

| ID | English / Tiếng Việt | Category | Class | Lucky | Super | Chaos | Handler | Automated evidence | Real-device status |
|---|---|---|---|---:|---:|---:|---|---|---|
| `loot_emerald_cache` | Emerald Cache<br>Kho Ngọc Lục Bảo | loot | positive | 2.250% | 1.730% | 1.120% | `loot` | PASS: `tests/runtime-events.test.mjs` | UNVERIFIED |
| `loot_diamond_pouch` | Diamond Pouch<br>Túi Kim Cương | loot | positive | 2.250% | 1.730% | 1.120% | `loot` | PASS: `tests/runtime-events.test.mjs` | UNVERIFIED |
| `loot_netherite_scrap` | Ancient Find<br>Cổ Vật Cổ Đại | loot | positive | — | 1.730% | 1.120% | `loot` | PASS: `tests/runtime-events.test.mjs` | UNVERIFIED |
| `loot_golden_feast` | Golden Feast<br>Yến Tiệc Vàng | loot | positive | 2.250% | 1.730% | 1.120% | `lootMulti` | PASS: `tests/runtime-events.test.mjs` | UNVERIFIED |
| `loot_enchanted_apple` | Mythic Apple<br>Táo Thần Thoại | loot | positive | — | 1.730% | 1.120% | `loot` | PASS: `tests/runtime-events.test.mjs` | UNVERIFIED |
| `loot_totem` | Second Chance<br>Cơ Hội Thứ Hai | loot | positive | — | 1.730% | 1.110% | `loot` | PASS: `tests/runtime-events.test.mjs` | UNVERIFIED |
| `loot_elytra` | Sky Gift<br>Món Quà Bầu Trời | loot | positive | — | 1.730% | 1.110% | `loot` | PASS: `tests/runtime-events.test.mjs` | UNVERIFIED |
| `loot_beacon` | Beacon in a Box<br>Hải Đăng Trong Hộp | loot | positive | — | 1.730% | 1.110% | `lootMulti` | PASS: `tests/runtime-events.test.mjs` | UNVERIFIED |
| `loot_books` | Enchanter's Parcel<br>Bưu Kiện Phù Phép | loot | positive | 2.250% | 1.730% | 1.110% | `enchantedBooks` | PASS: `tests/runtime-events.test.mjs` | UNVERIFIED |
| `loot_music` | Prize Playlist<br>Danh Sách Nhạc Thưởng | loot | positive | 2.250% | 1.730% | 1.110% | `lootRandom` | PASS: `tests/runtime-events.test.mjs` | UNVERIFIED |
| `loot_ocean` | Ocean Treasure<br>Kho Báu Đại Dương | loot | positive | 2.250% | 1.730% | 1.110% | `lootMulti` | PASS: `tests/runtime-events.test.mjs` | UNVERIFIED |
| `loot_explorer` | Explorer Kit<br>Bộ Thám Hiểm | loot | positive | 2.250% | 1.730% | 1.110% | `lootMulti` | PASS: `tests/runtime-events.test.mjs` | UNVERIFIED |
| `gear_guardian` | Guardian Armor<br>Giáp Hộ Vệ | equipment | positive | 2.060% | 1.590% | 1.020% | `armor` | PASS: `tests/runtime-events.test.mjs` | UNVERIFIED |
| `gear_swift` | Wind Runners<br>Giày Lướt Gió | equipment | positive | 2.060% | 1.590% | 1.020% | `bootsEffect` | PASS: `tests/runtime-events.test.mjs` | UNVERIFIED |
| `gear_aqua` | Diver Set<br>Bộ Thợ Lặn | equipment | positive | 2.060% | 1.590% | 1.020% | `helmetEffect` | PASS: `tests/runtime-events.test.mjs` | UNVERIFIED |
| `gear_night` | Night Visor<br>Kính Nhìn Đêm | equipment | positive | 2.060% | 1.590% | 1.020% | `effectLoot` | PASS: `tests/runtime-events.test.mjs` | UNVERIFIED |
| `gear_fire` | Firewalker Kit<br>Bộ Đi Trong Lửa | equipment | positive | 2.060% | 1.590% | 1.020% | `bootsEffect` | PASS: `tests/runtime-events.test.mjs` | UNVERIFIED |
| `gear_jump` | Moon Boots<br>Giày Mặt Trăng | equipment | positive | 2.060% | 1.590% | 1.020% | `effects` | PASS: `tests/runtime-events.test.mjs` | UNVERIFIED |
| `gear_utility` | Builder's Blessing<br>Phước Lành Thợ Xây | equipment | positive | 2.060% | 1.590% | 1.020% | `effectLoot` | PASS: `tests/runtime-events.test.mjs` | UNVERIFIED |
| `gear_saturation` | Picnic Charm<br>Bùa Dã Ngoại | equipment | positive | 2.060% | 1.590% | 1.020% | `effectLoot` | PASS: `tests/runtime-events.test.mjs` | UNVERIFIED |
| `mob_allay` | Helpful Allay<br>Allay Hữu Ích | creatures | positive | 1.870% | 1.440% | 0.930% | `spawn` | PASS: `tests/runtime-events.test.mjs` | UNVERIFIED |
| `mob_cat` | Cat Delivery<br>Giao Mèo Tận Nơi | creatures | positive | 1.870% | 1.440% | 0.930% | `spawn` | PASS: `tests/runtime-events.test.mjs` | UNVERIFIED |
| `mob_wolf` | Loyal Pack<br>Bầy Sói Trung Thành | creatures | positive | 1.870% | 1.440% | 0.930% | `spawn` | PASS: `tests/runtime-events.test.mjs` | UNVERIFIED |
| `mob_axolotl` | Axolotl Parade<br>Diễu Hành Axolotl | creatures | positive | 1.870% | 1.440% | 0.930% | `spawn` | PASS: `tests/runtime-events.test.mjs` | UNVERIFIED |
| `mob_sniffer` | Ancient Sniffer<br>Sniffer Cổ Đại | creatures | positive | 1.870% | 1.440% | 0.930% | `spawn` | PASS: `tests/runtime-events.test.mjs` | UNVERIFIED |
| `mob_zombie_party` | Zombie Party<br>Tiệc Zombie | creatures | negative | 0.810% | 1.040% | 1.680% | `spawn` | PASS: `tests/runtime-events.test.mjs` | UNVERIFIED |
| `mob_skeleton_ring` | Skeleton Ring<br>Vòng Vây Bộ Xương | creatures | negative | 0.810% | 1.040% | 1.680% | `spawnRing` | PASS: `tests/runtime-events.test.mjs` | UNVERIFIED |
| `mob_slime_stack` | Slime Stack<br>Tháp Slime | creatures | negative | 0.810% | 1.040% | 1.680% | `spawn` | PASS: `tests/runtime-events.test.mjs` | UNVERIFIED |
| `mob_phantom` | Sudden Squadron<br>Phi Đội Bất Ngờ | creatures | negative | 0.810% | 1.040% | 1.680% | `spawnOffset` | PASS: `tests/runtime-events.test.mjs` | UNVERIFIED |
| `mob_creeper_confetti` | Confetti Creepers<br>Creeper Pháo Hoa | creatures | negative | 0.810% | 1.040% | 1.680% | `spawnRing` | PASS: `tests/runtime-events.test.mjs` | UNVERIFIED |
| `mob_bee_swarm` | Bee-lieve It<br>Ong À Ong Ấy | creatures | neutral | 0.810% | 1.040% | 1.680% | `spawn` | PASS: `tests/runtime-events.test.mjs` | UNVERIFIED |
| `mob_iron_golem` | Pocket Guardian<br>Vệ Sĩ Bỏ Túi | creatures | positive | 1.870% | 1.440% | 0.930% | `spawn` | PASS: `tests/runtime-events.test.mjs` | UNVERIFIED |
| `trap_anvil` | Anvil Alert<br>Cảnh Báo Đe | traps | negative | 0.810% | 1.040% | 1.680% | `fallingBlock` | PASS: `tests/runtime-events.test.mjs` | UNVERIFIED |
| `trap_lava_ring` | Hot Circle<br>Vòng Lửa Nóng | traps | negative | 0.810% | 1.040% | 1.680% | `terrainRing` | PASS: `tests/runtime-events.test.mjs` | UNVERIFIED |
| `trap_tnt` | Classic Mistake<br>Sai Lầm Kinh Điển | traps | negative | 0.810% | 1.040% | 1.680% | `primedTnt` | PASS: `tests/runtime-events.test.mjs` | UNVERIFIED |
| `trap_web` | Spider Souvenir<br>Quà Lưu Niệm Nhện | traps | negative | 0.810% | 1.040% | 1.680% | `terrainPatch` | PASS: `tests/runtime-events.test.mjs` | UNVERIFIED |
| `trap_ice` | Floor Is Ice<br>Sàn Là Băng | traps | negative | 0.810% | 1.040% | 1.680% | `terrainPatch` | PASS: `tests/runtime-events.test.mjs` | UNVERIFIED |
| `trap_magma` | Hot Floor<br>Sàn Nóng | traps | negative | 0.810% | 1.040% | 1.680% | `terrainPatch` | PASS: `tests/runtime-events.test.mjs` | UNVERIFIED |
| `trap_pit` | Tiny Trouble Pit<br>Hố Rắc Rối Nhỏ | traps | negative | 0.810% | 1.040% | 1.680% | `pit` | PASS: `tests/runtime-events.test.mjs` | UNVERIFIED |
| `trap_lightning` | Shocking Luck<br>May Mắn Sốc Điện | traps | negative | 0.810% | 1.040% | 1.680% | `lightning` | PASS: `tests/runtime-events.test.mjs` | UNVERIFIED |
| `trap_poison` | Bad Perfume<br>Nước Hoa Hỏng | traps | negative | 0.810% | 1.040% | 1.680% | `effects` | PASS: `tests/runtime-events.test.mjs` | UNVERIFIED |
| `trap_blind` | Lights Out<br>Tắt Đèn | traps | negative | 0.810% | 1.040% | 1.680% | `effects` | PASS: `tests/runtime-events.test.mjs` | UNVERIFIED |
| `trap_void_fear` | Void Fakeout<br>Dọa Vực Thẳm | traps | negative | 0.810% | 1.040% | 1.680% | `effects` | PASS: `tests/runtime-events.test.mjs` | UNVERIFIED |
| `trap_explosion` | Controlled Kaboom<br>Nổ Có Kiểm Soát | traps | negative | 0.810% | 1.040% | 1.680% | `explosion` | PASS: `tests/runtime-events.test.mjs` | UNVERIFIED |
| `transform_tiny` | Tiny Troubles<br>Rắc Rối Tí Hon | transformations | neutral | 1.130% | 1.040% | 1.200% | `effects` | PASS: `tests/runtime-events.test.mjs` | UNVERIFIED |
| `transform_giant` | Giant Moment<br>Khoảnh Khắc Khổng Lồ | transformations | positive | 1.690% | 1.300% | 0.840% | `effects` | PASS: `tests/runtime-events.test.mjs` | UNVERIFIED |
| `transform_bouncy` | Rubber Player<br>Người Cao Su | transformations | positive | 1.690% | 1.300% | 0.840% | `effects` | PASS: `tests/runtime-events.test.mjs` | UNVERIFIED |
| `transform_ghost` | Ghostly Giggle<br>Ma Cười Khúc Khích | transformations | neutral | 1.130% | 1.040% | 1.200% | `effects` | PASS: `tests/runtime-events.test.mjs` | UNVERIFIED |
| `transform_fish` | Inner Fish<br>Con Cá Bên Trong | transformations | neutral | 1.130% | 1.040% | 1.200% | `effects` | PASS: `tests/runtime-events.test.mjs` | UNVERIFIED |
| `transform_magnet` | Item Magnet<br>Nam Châm Vật Phẩm | transformations | positive | 1.690% | 1.300% | 0.840% | `magnet` | PASS: `tests/runtime-events.test.mjs` | UNVERIFIED |
| `transform_zero_g` | Moon Gravity<br>Trọng Lực Mặt Trăng | transformations | neutral | 1.130% | 1.040% | 1.200% | `effects` | PASS: `tests/runtime-events.test.mjs` | UNVERIFIED |
| `transform_speed` | Zoomies<br>Cơn Cuồng Tốc Độ | transformations | positive | 1.690% | 1.300% | 0.840% | `effects` | PASS: `tests/runtime-events.test.mjs` | UNVERIFIED |
| `prank_swap` | Friendship Swap<br>Hoán Đổi Tình Bạn | pranks | neutral | 1.380% | 1.270% | 1.470% | `swap` | PASS: `tests/runtime-events.test.mjs` | UNVERIFIED |
| `prank_launch` | Surprise Airlines<br>Hãng Bay Bất Ngờ | pranks | neutral | 1.380% | 1.270% | 1.470% | `launch` | PASS: `tests/runtime-events.test.mjs` | UNVERIFIED |
| `prank_fake_diamond` | Diamond? Nope<br>Kim Cương? Không | pranks | neutral | 1.380% | 1.270% | 1.470% | `loot` | PASS: `tests/runtime-events.test.mjs` | UNVERIFIED |
| `prank_chicken_rain` | Chicken Forecast<br>Dự Báo Gà Rơi | pranks | neutral | 1.380% | 1.270% | 1.470% | `chickenRain` | PASS: `tests/runtime-events.test.mjs` | UNVERIFIED |
| `prank_sound` | Invisible Applause<br>Tiếng Vỗ Tay Vô Hình | pranks | neutral | 1.380% | 1.270% | 1.470% | `soundShow` | PASS: `tests/runtime-events.test.mjs` | UNVERIFIED |
| `prank_pumpkin` | Fashion Emergency<br>Thảm Họa Thời Trang | pranks | neutral | 1.380% | 1.270% | 1.470% | `loot` | PASS: `tests/runtime-events.test.mjs` | UNVERIFIED |
| `prank_teleport` | Wrong Door<br>Nhầm Cửa | pranks | neutral | 1.380% | 1.270% | 1.470% | `randomTeleport` | PASS: `tests/runtime-events.test.mjs` | UNVERIFIED |
| `prank_party` | Unexpected Party<br>Tiệc Bất Ngờ | pranks | positive | 2.060% | 1.590% | 1.020% | `party` | PASS: `tests/runtime-events.test.mjs` | UNVERIFIED |
| `prank_partner_gift` | Pass the Potato<br>Chuyền Khoai Tây | pranks | neutral | 1.380% | 1.270% | 1.470% | `partnerGift` | PASS: `tests/runtime-events.test.mjs` | UNVERIFIED |
| `prank_name` | Ego Boost<br>Tăng Cái Tôi | pranks | negative | 0.890% | 1.140% | 1.850% | `spawnRing` | PASS: `tests/runtime-events.test.mjs` | UNVERIFIED |
| `boss_slime` | Baron Bounce<br>Nam Tước Nảy | bosses | special | 0.200% | 0.420% | 0.780% | `boss` | PASS: `tests/runtime-events.test.mjs` | UNVERIFIED |
| `boss_zombie` | Zombo Comedian<br>Zombo Hài Hước | bosses | special | 0.200% | 0.420% | 0.780% | `boss` | PASS: `tests/runtime-events.test.mjs` | UNVERIFIED |
| `boss_skeleton` | Bone Jester<br>Gã Hề Xương Xẩu | bosses | special | 0.200% | 0.420% | 0.780% | `boss` | PASS: `tests/runtime-events.test.mjs` | UNVERIFIED |
| `boss_spider` | Web Diva<br>Diva Tơ Nhện | bosses | special | 0.200% | 0.420% | 0.780% | `boss` | PASS: `tests/runtime-events.test.mjs` | UNVERIFIED |
| `boss_witch` | Fizzy Witch<br>Phù Thủy Sủi Bọt | bosses | special | 0.200% | 0.420% | 0.780% | `boss` | PASS: `tests/runtime-events.test.mjs` | UNVERIFIED |
| `boss_piglin` | Gilded Grumbler<br>Kẻ Càu Nhàu Vàng | bosses | special | 0.200% | 0.420% | 0.780% | `boss` | PASS: `tests/runtime-events.test.mjs` | UNVERIFIED |
| `boss_evoker` | Vexing Magician<br>Ảo Thuật Gia Vex | bosses | special | — | 0.420% | 0.780% | `boss` | PASS: `tests/runtime-events.test.mjs` | UNVERIFIED |
| `boss_wither` | Chaos Wither<br>Wither Hỗn Loạn | bosses | special | — | — | 0.780% | `boss` | PASS: `tests/runtime-events.test.mjs` | UNVERIFIED |
| `structure_hut` | Instant Cozy Hut<br>Nhà Ấm Cúng Tức Thì | structures | positive | 1.220% | 0.940% | 0.600% | `structure` | PASS: `tests/runtime-events.test.mjs` | UNVERIFIED |
| `structure_picnic` | Chaos Picnic<br>Dã Ngoại Hỗn Loạn | structures | positive | 1.220% | 0.940% | 0.600% | `structure` | PASS: `tests/runtime-events.test.mjs` | UNVERIFIED |
| `structure_treasure` | Treasure Gazebo<br>Đình Kho Báu | structures | positive | 1.220% | 0.940% | 0.600% | `structure` | PASS: `tests/runtime-events.test.mjs` | UNVERIFIED |
| `structure_fountain` | Odd Fountain<br>Đài Phun Kỳ Lạ | structures | neutral | 0.810% | 0.750% | 0.870% | `structure` | PASS: `tests/runtime-events.test.mjs` | UNVERIFIED |
| `structure_obelisk` | Meme Obelisk<br>Tháp Meme | structures | neutral | 0.810% | 0.750% | 0.870% | `structure` | PASS: `tests/runtime-events.test.mjs` | UNVERIFIED |
| `structure_garden` | Pocket Garden<br>Vườn Bỏ Túi | structures | positive | 1.220% | 0.940% | 0.600% | `structure` | PASS: `tests/runtime-events.test.mjs` | UNVERIFIED |
| `structure_watchtower` | Questionable Tower<br>Tháp Đáng Ngờ | structures | neutral | 0.810% | 0.750% | 0.870% | `structure` | PASS: `tests/runtime-events.test.mjs` | UNVERIFIED |
| `structure_cage` | Empty Villain Cage<br>Lồng Phản Diện Trống | structures | neutral | 0.810% | 0.750% | 0.870% | `structure` | PASS: `tests/runtime-events.test.mjs` | UNVERIFIED |
| `ride_horse` | Turbo Horse<br>Ngựa Tốc Độ | vehicles | positive | 1.030% | 0.790% | 0.510% | `vehicle` | PASS: `tests/runtime-events.test.mjs` | UNVERIFIED |
| `ride_camel` | Desert Taxi<br>Taxi Sa Mạc | vehicles | positive | 1.030% | 0.790% | 0.510% | `vehicle` | PASS: `tests/runtime-events.test.mjs` | UNVERIFIED |
| `ride_pig` | Premium Pig<br>Heo Cao Cấp | vehicles | positive | 1.030% | 0.790% | 0.510% | `vehicle` | PASS: `tests/runtime-events.test.mjs` | UNVERIFIED |
| `ride_boat` | Portable Yacht<br>Du Thuyền Di Động | vehicles | positive | 1.030% | 0.790% | 0.510% | `vehicle` | PASS: `tests/runtime-events.test.mjs` | UNVERIFIED |
| `ride_minecart` | Chaos Express<br>Tàu Hỗn Loạn | vehicles | positive | 1.030% | 0.790% | 0.510% | `vehicleLoot` | PASS: `tests/runtime-events.test.mjs` | UNVERIFIED |
| `ride_strider` | Lava Limo<br>Limousine Dung Nham | vehicles | positive | 1.030% | 0.790% | 0.510% | `vehicle` | PASS: `tests/runtime-events.test.mjs` | UNVERIFIED |
| `collect_chaos_shard` | Chaos Shard<br>Mảnh Hỗn Loạn | collectibles | special | 0.200% | 0.420% | 0.780% | `collectible` | PASS: `tests/runtime-events.test.mjs` | UNVERIFIED |
| `collect_lucky_coin` | Lucky Coin<br>Đồng Xu May Mắn | collectibles | special | 0.200% | 0.410% | 0.780% | `collectible` | PASS: `tests/runtime-events.test.mjs` | UNVERIFIED |
| `collect_meme_token` | Meme Token<br>Vật Meme | collectibles | special | 0.200% | 0.410% | 0.780% | `collectible` | PASS: `tests/runtime-events.test.mjs` | UNVERIFIED |
| `collect_star_fragment` | Star Fragment<br>Mảnh Sao | collectibles | special | 0.200% | 0.410% | 0.780% | `collectible` | PASS: `tests/runtime-events.test.mjs` | UNVERIFIED |
| `collect_prank_badge` | Prank Badge<br>Huy Hiệu Trêu Chọc | collectibles | special | 0.200% | 0.410% | 0.780% | `collectible` | PASS: `tests/runtime-events.test.mjs` | UNVERIFIED |
| `collect_crown` | Chaos Crown<br>Vương Miện Hỗn Loạn | collectibles | special | 0.200% | 0.410% | 0.780% | `collectible` | PASS: `tests/runtime-events.test.mjs` | UNVERIFIED |

## Per-event descriptions and operational metadata

### `loot_emerald_cache` — Emerald Cache / Kho Ngọc Lục Bảo

- **EN:** A bundle of emeralds.
- **VI:** Một bó ngọc lục bảo.
- **Entities:** none; **structures:** none; **assets:** vanilla rendering + pack feedback
- **Cleanup:** none; **expected cost:** low; **validation:** `tests/events.test.mjs:loot_emerald_cache; manual: open eligible tier and follow EVENT_CATALOG.md`.

### `loot_diamond_pouch` — Diamond Pouch / Túi Kim Cương

- **EN:** A small diamond reward.
- **VI:** Phần thưởng kim cương nhỏ.
- **Entities:** none; **structures:** none; **assets:** vanilla rendering + pack feedback
- **Cleanup:** none; **expected cost:** low; **validation:** `tests/events.test.mjs:loot_diamond_pouch; manual: open eligible tier and follow EVENT_CATALOG.md`.

### `loot_netherite_scrap` — Ancient Find / Cổ Vật Cổ Đại

- **EN:** One piece of netherite scrap.
- **VI:** Một mảnh netherite cổ đại.
- **Entities:** none; **structures:** none; **assets:** vanilla rendering + pack feedback
- **Cleanup:** none; **expected cost:** low; **validation:** `tests/events.test.mjs:loot_netherite_scrap; manual: open eligible tier and follow EVENT_CATALOG.md`.

### `loot_golden_feast` — Golden Feast / Yến Tiệc Vàng

- **EN:** Golden apples and carrots.
- **VI:** Táo vàng và cà rốt vàng.
- **Entities:** none; **structures:** none; **assets:** vanilla rendering + pack feedback
- **Cleanup:** none; **expected cost:** low; **validation:** `tests/events.test.mjs:loot_golden_feast; manual: open eligible tier and follow EVENT_CATALOG.md`.

### `loot_enchanted_apple` — Mythic Apple / Táo Thần Thoại

- **EN:** An enchanted golden apple.
- **VI:** Một quả táo vàng phù phép.
- **Entities:** none; **structures:** none; **assets:** vanilla rendering + pack feedback
- **Cleanup:** none; **expected cost:** low; **validation:** `tests/events.test.mjs:loot_enchanted_apple; manual: open eligible tier and follow EVENT_CATALOG.md`.

### `loot_totem` — Second Chance / Cơ Hội Thứ Hai

- **EN:** A Totem of Undying.
- **VI:** Một Vật Tổ Bất Tử.
- **Entities:** none; **structures:** none; **assets:** vanilla rendering + pack feedback
- **Cleanup:** none; **expected cost:** low; **validation:** `tests/events.test.mjs:loot_totem; manual: open eligible tier and follow EVENT_CATALOG.md`.

### `loot_elytra` — Sky Gift / Món Quà Bầu Trời

- **EN:** An elytra for flight.
- **VI:** Một cánh cứng để bay.
- **Entities:** none; **structures:** none; **assets:** vanilla rendering + pack feedback
- **Cleanup:** none; **expected cost:** low; **validation:** `tests/events.test.mjs:loot_elytra; manual: open eligible tier and follow EVENT_CATALOG.md`.

### `loot_beacon` — Beacon in a Box / Hải Đăng Trong Hộp

- **EN:** A beacon and a small iron base kit.
- **VI:** Hải đăng và bộ đế sắt nhỏ.
- **Entities:** none; **structures:** none; **assets:** vanilla rendering + pack feedback
- **Cleanup:** none; **expected cost:** low; **validation:** `tests/events.test.mjs:loot_beacon; manual: open eligible tier and follow EVENT_CATALOG.md`.

### `loot_books` — Enchanter's Parcel / Bưu Kiện Phù Phép

- **EN:** Enchanting books and lapis.
- **VI:** Sách phù phép và lưu ly.
- **Entities:** none; **structures:** none; **assets:** vanilla rendering + pack feedback
- **Cleanup:** none; **expected cost:** low; **validation:** `tests/events.test.mjs:loot_books; manual: open eligible tier and follow EVENT_CATALOG.md`.

### `loot_music` — Prize Playlist / Danh Sách Nhạc Thưởng

- **EN:** A random music disc.
- **VI:** Một đĩa nhạc ngẫu nhiên.
- **Entities:** none; **structures:** none; **assets:** vanilla rendering + pack feedback
- **Cleanup:** none; **expected cost:** low; **validation:** `tests/events.test.mjs:loot_music; manual: open eligible tier and follow EVENT_CATALOG.md`.

### `loot_ocean` — Ocean Treasure / Kho Báu Đại Dương

- **EN:** A heart of the sea and prismarine.
- **VI:** Trái tim biển cả và prismarine.
- **Entities:** none; **structures:** none; **assets:** vanilla rendering + pack feedback
- **Cleanup:** none; **expected cost:** low; **validation:** `tests/events.test.mjs:loot_ocean; manual: open eligible tier and follow EVENT_CATALOG.md`.

### `loot_explorer` — Explorer Kit / Bộ Thám Hiểm

- **EN:** Maps, a compass, and a recovery compass.
- **VI:** Bản đồ, la bàn và la bàn hồi sinh.
- **Entities:** none; **structures:** none; **assets:** vanilla rendering + pack feedback
- **Cleanup:** none; **expected cost:** low; **validation:** `tests/events.test.mjs:loot_explorer; manual: open eligible tier and follow EVENT_CATALOG.md`.

### `gear_guardian` — Guardian Armor / Giáp Hộ Vệ

- **EN:** Protection armor with resistance.
- **VI:** Giáp bảo hộ kèm kháng sát thương.
- **Entities:** none; **structures:** none; **assets:** vanilla rendering + pack feedback
- **Cleanup:** none; **expected cost:** low; **validation:** `tests/events.test.mjs:gear_guardian; manual: open eligible tier and follow EVENT_CATALOG.md`.

### `gear_swift` — Wind Runners / Giày Lướt Gió

- **EN:** Feather-falling boots and speed.
- **VI:** Giày giảm sát thương rơi kèm tốc độ.
- **Entities:** none; **structures:** none; **assets:** vanilla rendering + pack feedback
- **Cleanup:** none; **expected cost:** low; **validation:** `tests/events.test.mjs:gear_swift; manual: open eligible tier and follow EVENT_CATALOG.md`.

### `gear_aqua` — Diver Set / Bộ Thợ Lặn

- **EN:** A turtle shell and water breathing.
- **VI:** Mai rùa và khả năng thở dưới nước.
- **Entities:** none; **structures:** none; **assets:** vanilla rendering + pack feedback
- **Cleanup:** none; **expected cost:** low; **validation:** `tests/events.test.mjs:gear_aqua; manual: open eligible tier and follow EVENT_CATALOG.md`.

### `gear_night` — Night Visor / Kính Nhìn Đêm

- **EN:** Night vision and a lantern.
- **VI:** Nhìn đêm và một chiếc đèn lồng.
- **Entities:** none; **structures:** none; **assets:** vanilla rendering + pack feedback
- **Cleanup:** none; **expected cost:** low; **validation:** `tests/events.test.mjs:gear_night; manual: open eligible tier and follow EVENT_CATALOG.md`.

### `gear_fire` — Firewalker Kit / Bộ Đi Trong Lửa

- **EN:** Fire resistance and golden boots.
- **VI:** Kháng lửa và giày vàng.
- **Entities:** none; **structures:** none; **assets:** vanilla rendering + pack feedback
- **Cleanup:** none; **expected cost:** low; **validation:** `tests/events.test.mjs:gear_fire; manual: open eligible tier and follow EVENT_CATALOG.md`.

### `gear_jump` — Moon Boots / Giày Mặt Trăng

- **EN:** Jump boost and slow falling.
- **VI:** Nhảy cao và rơi chậm.
- **Entities:** none; **structures:** none; **assets:** vanilla rendering + pack feedback
- **Cleanup:** none; **expected cost:** low; **validation:** `tests/events.test.mjs:gear_jump; manual: open eligible tier and follow EVENT_CATALOG.md`.

### `gear_utility` — Builder's Blessing / Phước Lành Thợ Xây

- **EN:** Haste and a stack of scaffolding.
- **VI:** Hiệu ứng đào nhanh và giàn giáo.
- **Entities:** none; **structures:** none; **assets:** vanilla rendering + pack feedback
- **Cleanup:** none; **expected cost:** low; **validation:** `tests/events.test.mjs:gear_utility; manual: open eligible tier and follow EVENT_CATALOG.md`.

### `gear_saturation` — Picnic Charm / Bùa Dã Ngoại

- **EN:** Saturation and a cake.
- **VI:** No bụng và một chiếc bánh.
- **Entities:** none; **structures:** none; **assets:** vanilla rendering + pack feedback
- **Cleanup:** none; **expected cost:** low; **validation:** `tests/events.test.mjs:gear_saturation; manual: open eligible tier and follow EVENT_CATALOG.md`.

### `mob_allay` — Helpful Allay / Allay Hữu Ích

- **EN:** A friendly allay appears.
- **VI:** Một allay thân thiện xuất hiện.
- **Entities:** minecraft:allay; **structures:** none; **assets:** vanilla rendering + pack feedback
- **Cleanup:** none; **expected cost:** low; **validation:** `tests/events.test.mjs:mob_allay; manual: open eligible tier and follow EVENT_CATALOG.md`.

### `mob_cat` — Cat Delivery / Giao Mèo Tận Nơi

- **EN:** A tameable cat visits.
- **VI:** Một chú mèo ghé thăm.
- **Entities:** minecraft:cat; **structures:** none; **assets:** vanilla rendering + pack feedback
- **Cleanup:** none; **expected cost:** low; **validation:** `tests/events.test.mjs:mob_cat; manual: open eligible tier and follow EVENT_CATALOG.md`.

### `mob_wolf` — Loyal Pack / Bầy Sói Trung Thành

- **EN:** Two tameable wolves appear.
- **VI:** Hai con sói xuất hiện.
- **Entities:** minecraft:wolf; **structures:** none; **assets:** vanilla rendering + pack feedback
- **Cleanup:** none; **expected cost:** low; **validation:** `tests/events.test.mjs:mob_wolf; manual: open eligible tier and follow EVENT_CATALOG.md`.

### `mob_axolotl` — Axolotl Parade / Diễu Hành Axolotl

- **EN:** Three axolotls in a brief splash.
- **VI:** Ba axolotl xuất hiện vui nhộn.
- **Entities:** minecraft:axolotl; **structures:** none; **assets:** vanilla rendering + pack feedback
- **Cleanup:** none; **expected cost:** low; **validation:** `tests/events.test.mjs:mob_axolotl; manual: open eligible tier and follow EVENT_CATALOG.md`.

### `mob_sniffer` — Ancient Sniffer / Sniffer Cổ Đại

- **EN:** A sniffer joins the adventure.
- **VI:** Một sniffer tham gia cuộc phiêu lưu.
- **Entities:** minecraft:sniffer; **structures:** none; **assets:** vanilla rendering + pack feedback
- **Cleanup:** none; **expected cost:** low; **validation:** `tests/events.test.mjs:mob_sniffer; manual: open eligible tier and follow EVENT_CATALOG.md`.

### `mob_zombie_party` — Zombie Party / Tiệc Zombie

- **EN:** A small named zombie ambush.
- **VI:** Một cuộc phục kích zombie nhỏ.
- **Entities:** minecraft:zombie; **structures:** none; **assets:** vanilla rendering + pack feedback
- **Cleanup:** none; **expected cost:** low; **validation:** `tests/events.test.mjs:mob_zombie_party; manual: open eligible tier and follow EVENT_CATALOG.md`.

### `mob_skeleton_ring` — Skeleton Ring / Vòng Vây Bộ Xương

- **EN:** Skeletons surround the opener.
- **VI:** Bộ xương bao vây người mở.
- **Entities:** minecraft:skeleton; **structures:** none; **assets:** vanilla rendering + pack feedback
- **Cleanup:** none; **expected cost:** low; **validation:** `tests/events.test.mjs:mob_skeleton_ring; manual: open eligible tier and follow EVENT_CATALOG.md`.

### `mob_slime_stack` — Slime Stack / Tháp Slime

- **EN:** A bouncing large slime.
- **VI:** Một slime lớn nảy nảy.
- **Entities:** minecraft:slime; **structures:** none; **assets:** vanilla rendering + pack feedback
- **Cleanup:** none; **expected cost:** low; **validation:** `tests/events.test.mjs:mob_slime_stack; manual: open eligible tier and follow EVENT_CATALOG.md`.

### `mob_phantom` — Sudden Squadron / Phi Đội Bất Ngờ

- **EN:** Two phantoms dive from above.
- **VI:** Hai phantom lao xuống từ trên cao.
- **Entities:** minecraft:phantom; **structures:** none; **assets:** vanilla rendering + pack feedback
- **Cleanup:** none; **expected cost:** low; **validation:** `tests/events.test.mjs:mob_phantom; manual: open eligible tier and follow EVENT_CATALOG.md`.

### `mob_creeper_confetti` — Confetti Creepers / Creeper Pháo Hoa

- **EN:** Named creepers arrive with warning particles.
- **VI:** Creeper xuất hiện kèm cảnh báo.
- **Entities:** minecraft:creeper; **structures:** none; **assets:** vanilla rendering + pack feedback
- **Cleanup:** none; **expected cost:** low; **validation:** `tests/events.test.mjs:mob_creeper_confetti; manual: open eligible tier and follow EVENT_CATALOG.md`.

### `mob_bee_swarm` — Bee-lieve It / Ong À Ong Ấy

- **EN:** A swarm of busy bees.
- **VI:** Một đàn ong vo ve.
- **Entities:** minecraft:bee; **structures:** none; **assets:** vanilla rendering + pack feedback
- **Cleanup:** none; **expected cost:** low; **validation:** `tests/events.test.mjs:mob_bee_swarm; manual: open eligible tier and follow EVENT_CATALOG.md`.

### `mob_iron_golem` — Pocket Guardian / Vệ Sĩ Bỏ Túi

- **EN:** A named iron golem guards the area.
- **VI:** Một người sắt bảo vệ khu vực.
- **Entities:** minecraft:iron_golem; **structures:** none; **assets:** vanilla rendering + pack feedback
- **Cleanup:** none; **expected cost:** low; **validation:** `tests/events.test.mjs:mob_iron_golem; manual: open eligible tier and follow EVENT_CATALOG.md`.

### `trap_anvil` — Anvil Alert / Cảnh Báo Đe

- **EN:** A telegraphed anvil drops above.
- **VI:** Một cái đe rơi xuống có cảnh báo.
- **Entities:** none; **structures:** none; **assets:** vanilla rendering + pack feedback
- **Cleanup:** none; **expected cost:** low; **validation:** `tests/events.test.mjs:trap_anvil; manual: open eligible tier and follow EVENT_CATALOG.md`.

### `trap_lava_ring` — Hot Circle / Vòng Lửa Nóng

- **EN:** A small replaceable lava ring; safe terrain mode uses magma.
- **VI:** Vòng dung nham nhỏ; chế độ an toàn dùng magma.
- **Entities:** none; **structures:** none; **assets:** vanilla rendering + pack feedback
- **Cleanup:** none; **expected cost:** low; **validation:** `tests/events.test.mjs:trap_lava_ring; manual: open eligible tier and follow EVENT_CATALOG.md`.

### `trap_tnt` — Classic Mistake / Sai Lầm Kinh Điển

- **EN:** One lit TNT with a fuse warning.
- **VI:** Một TNT đã châm ngòi kèm cảnh báo.
- **Entities:** none; **structures:** none; **assets:** vanilla rendering + pack feedback
- **Cleanup:** none; **expected cost:** low; **validation:** `tests/events.test.mjs:trap_tnt; manual: open eligible tier and follow EVENT_CATALOG.md`.

### `trap_web` — Spider Souvenir / Quà Lưu Niệm Nhện

- **EN:** A temporary web patch around the opener.
- **VI:** Một mảng tơ nhện quanh người mở.
- **Entities:** none; **structures:** none; **assets:** vanilla rendering + pack feedback
- **Cleanup:** none; **expected cost:** low; **validation:** `tests/events.test.mjs:trap_web; manual: open eligible tier and follow EVENT_CATALOG.md`.

### `trap_ice` — Floor Is Ice / Sàn Là Băng

- **EN:** A slippery packed-ice patch.
- **VI:** Một mảng băng trơn.
- **Entities:** none; **structures:** none; **assets:** vanilla rendering + pack feedback
- **Cleanup:** none; **expected cost:** low; **validation:** `tests/events.test.mjs:trap_ice; manual: open eligible tier and follow EVENT_CATALOG.md`.

### `trap_magma` — Hot Floor / Sàn Nóng

- **EN:** A temporary magma floor.
- **VI:** Một sàn magma tạm thời.
- **Entities:** none; **structures:** none; **assets:** vanilla rendering + pack feedback
- **Cleanup:** none; **expected cost:** low; **validation:** `tests/events.test.mjs:trap_magma; manual: open eligible tier and follow EVENT_CATALOG.md`.

### `trap_pit` — Tiny Trouble Pit / Hố Rắc Rối Nhỏ

- **EN:** A bounded two-block-deep pit.
- **VI:** Một hố sâu hai khối có giới hạn.
- **Entities:** none; **structures:** none; **assets:** vanilla rendering + pack feedback
- **Cleanup:** none; **expected cost:** low; **validation:** `tests/events.test.mjs:trap_pit; manual: open eligible tier and follow EVENT_CATALOG.md`.

### `trap_lightning` — Shocking Luck / May Mắn Sốc Điện

- **EN:** Lightning strikes nearby, not directly on the opener.
- **VI:** Sét đánh gần chứ không trúng trực tiếp.
- **Entities:** none; **structures:** none; **assets:** vanilla rendering + pack feedback
- **Cleanup:** none; **expected cost:** low; **validation:** `tests/events.test.mjs:trap_lightning; manual: open eligible tier and follow EVENT_CATALOG.md`.

### `trap_poison` — Bad Perfume / Nước Hoa Hỏng

- **EN:** A brief poison effect.
- **VI:** Hiệu ứng độc ngắn.
- **Entities:** none; **structures:** none; **assets:** vanilla rendering + pack feedback
- **Cleanup:** none; **expected cost:** low; **validation:** `tests/events.test.mjs:trap_poison; manual: open eligible tier and follow EVENT_CATALOG.md`.

### `trap_blind` — Lights Out / Tắt Đèn

- **EN:** Brief blindness and darkness particles.
- **VI:** Mù tạm thời kèm hạt tối.
- **Entities:** none; **structures:** none; **assets:** vanilla rendering + pack feedback
- **Cleanup:** none; **expected cost:** low; **validation:** `tests/events.test.mjs:trap_blind; manual: open eligible tier and follow EVENT_CATALOG.md`.

### `trap_void_fear` — Void Fakeout / Dọa Vực Thẳm

- **EN:** Darkness, levitation, then safe slow falling.
- **VI:** Bóng tối, bay lên rồi rơi chậm an toàn.
- **Entities:** none; **structures:** none; **assets:** vanilla rendering + pack feedback
- **Cleanup:** none; **expected cost:** low; **validation:** `tests/events.test.mjs:trap_void_fear; manual: open eligible tier and follow EVENT_CATALOG.md`.

### `trap_explosion` — Controlled Kaboom / Nổ Có Kiểm Soát

- **EN:** A small explosion with terrain setting respected.
- **VI:** Vụ nổ nhỏ tuân thủ cài đặt phá địa hình.
- **Entities:** none; **structures:** none; **assets:** vanilla rendering + pack feedback
- **Cleanup:** none; **expected cost:** low; **validation:** `tests/events.test.mjs:trap_explosion; manual: open eligible tier and follow EVENT_CATALOG.md`.

### `transform_tiny` — Tiny Troubles / Rắc Rối Tí Hon

- **EN:** Small-scale visual illusion with speed and low visibility range.
- **VI:** Cảm giác tí hon kèm tốc độ và hiệu ứng vui.
- **Entities:** none; **structures:** none; **assets:** vanilla rendering + pack feedback
- **Cleanup:** none; **expected cost:** low; **validation:** `tests/events.test.mjs:transform_tiny; manual: open eligible tier and follow EVENT_CATALOG.md`.

### `transform_giant` — Giant Moment / Khoảnh Khắc Khổng Lồ

- **EN:** Strength, resistance, and slowness create a giant fantasy.
- **VI:** Sức mạnh, kháng và chậm tạo cảm giác khổng lồ.
- **Entities:** none; **structures:** none; **assets:** vanilla rendering + pack feedback
- **Cleanup:** none; **expected cost:** low; **validation:** `tests/events.test.mjs:transform_giant; manual: open eligible tier and follow EVENT_CATALOG.md`.

### `transform_bouncy` — Rubber Player / Người Cao Su

- **EN:** High jumps with safe landing.
- **VI:** Nhảy cao và tiếp đất an toàn.
- **Entities:** none; **structures:** none; **assets:** vanilla rendering + pack feedback
- **Cleanup:** none; **expected cost:** low; **validation:** `tests/events.test.mjs:transform_bouncy; manual: open eligible tier and follow EVENT_CATALOG.md`.

### `transform_ghost` — Ghostly Giggle / Ma Cười Khúc Khích

- **EN:** Invisibility with night vision.
- **VI:** Tàng hình kèm nhìn đêm.
- **Entities:** none; **structures:** none; **assets:** vanilla rendering + pack feedback
- **Cleanup:** none; **expected cost:** low; **validation:** `tests/events.test.mjs:transform_ghost; manual: open eligible tier and follow EVENT_CATALOG.md`.

### `transform_fish` — Inner Fish / Con Cá Bên Trong

- **EN:** Water breathing, dolphin grace, and slowness on land.
- **VI:** Thở dưới nước, bơi nhanh và chậm trên cạn.
- **Entities:** none; **structures:** none; **assets:** vanilla rendering + pack feedback
- **Cleanup:** none; **expected cost:** low; **validation:** `tests/events.test.mjs:transform_fish; manual: open eligible tier and follow EVENT_CATALOG.md`.

### `transform_magnet` — Item Magnet / Nam Châm Vật Phẩm

- **EN:** Nearby dropped items are pulled once.
- **VI:** Hút vật phẩm rơi gần đó một lần.
- **Entities:** none; **structures:** none; **assets:** vanilla rendering + pack feedback
- **Cleanup:** none; **expected cost:** low; **validation:** `tests/events.test.mjs:transform_magnet; manual: open eligible tier and follow EVENT_CATALOG.md`.

### `transform_zero_g` — Moon Gravity / Trọng Lực Mặt Trăng

- **EN:** Levitation followed by slow falling.
- **VI:** Bay lên rồi rơi chậm.
- **Entities:** none; **structures:** none; **assets:** vanilla rendering + pack feedback
- **Cleanup:** none; **expected cost:** low; **validation:** `tests/events.test.mjs:transform_zero_g; manual: open eligible tier and follow EVENT_CATALOG.md`.

### `transform_speed` — Zoomies / Cơn Cuồng Tốc Độ

- **EN:** Extreme temporary speed.
- **VI:** Tốc độ cực cao tạm thời.
- **Entities:** none; **structures:** none; **assets:** vanilla rendering + pack feedback
- **Cleanup:** none; **expected cost:** low; **validation:** `tests/events.test.mjs:transform_speed; manual: open eligible tier and follow EVENT_CATALOG.md`.

### `prank_swap` — Friendship Swap / Hoán Đổi Tình Bạn

- **EN:** Two nearby players safely swap positions.
- **VI:** Hai người chơi gần nhau đổi vị trí an toàn.
- **Entities:** none; **structures:** none; **assets:** vanilla rendering + pack feedback
- **Cleanup:** none; **expected cost:** low; **validation:** `tests/events.test.mjs:prank_swap; manual: open eligible tier and follow EVENT_CATALOG.md`.

### `prank_launch` — Surprise Airlines / Hãng Bay Bất Ngờ

- **EN:** The opener rises and lands safely.
- **VI:** Người mở bay lên và hạ cánh an toàn.
- **Entities:** none; **structures:** none; **assets:** vanilla rendering + pack feedback
- **Cleanup:** none; **expected cost:** low; **validation:** `tests/events.test.mjs:prank_launch; manual: open eligible tier and follow EVENT_CATALOG.md`.

### `prank_fake_diamond` — Diamond? Nope / Kim Cương? Không

- **EN:** A diamond turns out to be a potato and a message.
- **VI:** Kim cương hóa ra là khoai tây.
- **Entities:** none; **structures:** none; **assets:** vanilla rendering + pack feedback
- **Cleanup:** none; **expected cost:** low; **validation:** `tests/events.test.mjs:prank_fake_diamond; manual: open eligible tier and follow EVENT_CATALOG.md`.

### `prank_chicken_rain` — Chicken Forecast / Dự Báo Gà Rơi

- **EN:** Chickens descend with slow falling.
- **VI:** Gà rơi xuống với hiệu ứng rơi chậm.
- **Entities:** none; **structures:** none; **assets:** vanilla rendering + pack feedback
- **Cleanup:** none; **expected cost:** low; **validation:** `tests/events.test.mjs:prank_chicken_rain; manual: open eligible tier and follow EVENT_CATALOG.md`.

### `prank_sound` — Invisible Applause / Tiếng Vỗ Tay Vô Hình

- **EN:** A comic sound sequence without damage.
- **VI:** Chuỗi âm thanh vui không gây sát thương.
- **Entities:** none; **structures:** none; **assets:** vanilla rendering + pack feedback
- **Cleanup:** none; **expected cost:** low; **validation:** `tests/events.test.mjs:prank_sound; manual: open eligible tier and follow EVENT_CATALOG.md`.

### `prank_pumpkin` — Fashion Emergency / Thảm Họa Thời Trang

- **EN:** A carved pumpkin appears as a gift.
- **VI:** Một quả bí ngô khắc xuất hiện làm quà.
- **Entities:** none; **structures:** none; **assets:** vanilla rendering + pack feedback
- **Cleanup:** none; **expected cost:** low; **validation:** `tests/events.test.mjs:prank_pumpkin; manual: open eligible tier and follow EVENT_CATALOG.md`.

### `prank_teleport` — Wrong Door / Nhầm Cửa

- **EN:** A short random teleport to a safe nearby surface.
- **VI:** Dịch chuyển ngắn tới mặt đất an toàn gần đó.
- **Entities:** none; **structures:** none; **assets:** vanilla rendering + pack feedback
- **Cleanup:** none; **expected cost:** low; **validation:** `tests/events.test.mjs:prank_teleport; manual: open eligible tier and follow EVENT_CATALOG.md`.

### `prank_party` — Unexpected Party / Tiệc Bất Ngờ

- **EN:** Firework visuals and a cake.
- **VI:** Pháo hoa và một chiếc bánh.
- **Entities:** none; **structures:** none; **assets:** vanilla rendering + pack feedback
- **Cleanup:** none; **expected cost:** low; **validation:** `tests/events.test.mjs:prank_party; manual: open eligible tier and follow EVENT_CATALOG.md`.

### `prank_partner_gift` — Pass the Potato / Chuyền Khoai Tây

- **EN:** The other nearby player receives a potato.
- **VI:** Người chơi gần đó nhận một củ khoai tây.
- **Entities:** none; **structures:** none; **assets:** vanilla rendering + pack feedback
- **Cleanup:** none; **expected cost:** low; **validation:** `tests/events.test.mjs:prank_partner_gift; manual: open eligible tier and follow EVENT_CATALOG.md`.

### `prank_name` — Ego Boost / Tăng Cái Tôi

- **EN:** A harmless named silverfish fan club appears.
- **VI:** Một hội hâm mộ silverfish vô hại xuất hiện.
- **Entities:** minecraft:silverfish; **structures:** none; **assets:** vanilla rendering + pack feedback
- **Cleanup:** none; **expected cost:** low; **validation:** `tests/events.test.mjs:prank_name; manual: open eligible tier and follow EVENT_CATALOG.md`.

### `boss_slime` — Baron Bounce / Nam Tước Nảy

- **EN:** A large named slime boss and reward.
- **VI:** Trùm slime lớn có tên và phần thưởng.
- **Entities:** minecraft:slime; **structures:** none; **assets:** vanilla rendering + pack feedback
- **Cleanup:** none; **expected cost:** low; **validation:** `tests/events.test.mjs:boss_slime; manual: open eligible tier and follow EVENT_CATALOG.md`.

### `boss_zombie` — Zombo Comedian / Zombo Hài Hước

- **EN:** An armored zombie with reinforcements.
- **VI:** Zombie có giáp cùng quân tiếp viện.
- **Entities:** minecraft:zombie; **structures:** none; **assets:** vanilla rendering + pack feedback
- **Cleanup:** none; **expected cost:** low; **validation:** `tests/events.test.mjs:boss_zombie; manual: open eligible tier and follow EVENT_CATALOG.md`.

### `boss_skeleton` — Bone Jester / Gã Hề Xương Xẩu

- **EN:** A fast skeleton with a bone-themed reward.
- **VI:** Skeleton nhanh với phần thưởng chủ đề xương.
- **Entities:** minecraft:skeleton; **structures:** none; **assets:** vanilla rendering + pack feedback
- **Cleanup:** none; **expected cost:** low; **validation:** `tests/events.test.mjs:boss_skeleton; manual: open eligible tier and follow EVENT_CATALOG.md`.

### `boss_spider` — Web Diva / Diva Tơ Nhện

- **EN:** A cave spider with poison and web hazards.
- **VI:** Nhện hang có độc và bẫy tơ.
- **Entities:** minecraft:cave_spider; **structures:** none; **assets:** vanilla rendering + pack feedback
- **Cleanup:** none; **expected cost:** low; **validation:** `tests/events.test.mjs:boss_spider; manual: open eligible tier and follow EVENT_CATALOG.md`.

### `boss_witch` — Fizzy Witch / Phù Thủy Sủi Bọt

- **EN:** A named witch with splash support.
- **VI:** Phù thủy có tên cùng hiệu ứng hỗ trợ.
- **Entities:** minecraft:witch; **structures:** none; **assets:** vanilla rendering + pack feedback
- **Cleanup:** none; **expected cost:** low; **validation:** `tests/events.test.mjs:boss_witch; manual: open eligible tier and follow EVENT_CATALOG.md`.

### `boss_piglin` — Gilded Grumbler / Kẻ Càu Nhàu Vàng

- **EN:** A piglin brute guarding gold.
- **VI:** Piglin brute canh giữ vàng.
- **Entities:** minecraft:piglin_brute; **structures:** none; **assets:** vanilla rendering + pack feedback
- **Cleanup:** none; **expected cost:** low; **validation:** `tests/events.test.mjs:boss_piglin; manual: open eligible tier and follow EVENT_CATALOG.md`.

### `boss_evoker` — Vexing Magician / Ảo Thuật Gia Vex

- **EN:** An evoker mini-event with totem reward.
- **VI:** Mini-event evoker với phần thưởng vật tổ.
- **Entities:** minecraft:evoker; **structures:** none; **assets:** vanilla rendering + pack feedback
- **Cleanup:** none; **expected cost:** low; **validation:** `tests/events.test.mjs:boss_evoker; manual: open eligible tier and follow EVENT_CATALOG.md`.

### `boss_wither` — Chaos Wither / Wither Hỗn Loạn

- **EN:** A high-risk wither event with a nether-star reward plan.
- **VI:** Sự kiện wither nguy hiểm cao với phần thưởng sao nether.
- **Entities:** minecraft:wither; **structures:** none; **assets:** vanilla rendering + pack feedback
- **Cleanup:** entity death; **expected cost:** high; **validation:** `tests/events.test.mjs:boss_wither; manual: open eligible tier and follow EVENT_CATALOG.md`.

### `structure_hut` — Instant Cozy Hut / Nhà Ấm Cúng Tức Thì

- **EN:** A small validated shelter.
- **VI:** Một ngôi nhà nhỏ sau khi kiểm tra không gian.
- **Entities:** none; **structures:** hut; **assets:** vanilla rendering + pack feedback
- **Cleanup:** none; **expected cost:** low; **validation:** `tests/events.test.mjs:structure_hut; manual: open eligible tier and follow EVENT_CATALOG.md`.

### `structure_picnic` — Chaos Picnic / Dã Ngoại Hỗn Loạn

- **EN:** A picnic blanket, cake, and flowers.
- **VI:** Thảm dã ngoại, bánh và hoa.
- **Entities:** none; **structures:** picnic; **assets:** vanilla rendering + pack feedback
- **Cleanup:** none; **expected cost:** low; **validation:** `tests/events.test.mjs:structure_picnic; manual: open eligible tier and follow EVENT_CATALOG.md`.

### `structure_treasure` — Treasure Gazebo / Đình Kho Báu

- **EN:** A small gazebo with a loot chest.
- **VI:** Đình nhỏ có rương kho báu.
- **Entities:** none; **structures:** treasure; **assets:** vanilla rendering + pack feedback
- **Cleanup:** none; **expected cost:** low; **validation:** `tests/events.test.mjs:structure_treasure; manual: open eligible tier and follow EVENT_CATALOG.md`.

### `structure_fountain` — Odd Fountain / Đài Phun Kỳ Lạ

- **EN:** A small decorative water fountain.
- **VI:** Đài phun nước trang trí nhỏ.
- **Entities:** none; **structures:** fountain; **assets:** vanilla rendering + pack feedback
- **Cleanup:** none; **expected cost:** low; **validation:** `tests/events.test.mjs:structure_fountain; manual: open eligible tier and follow EVENT_CATALOG.md`.

### `structure_obelisk` — Meme Obelisk / Tháp Meme

- **EN:** A colorful question-mark monument.
- **VI:** Đài kỷ niệm dấu hỏi nhiều màu.
- **Entities:** none; **structures:** obelisk; **assets:** vanilla rendering + pack feedback
- **Cleanup:** none; **expected cost:** low; **validation:** `tests/events.test.mjs:structure_obelisk; manual: open eligible tier and follow EVENT_CATALOG.md`.

### `structure_garden` — Pocket Garden / Vườn Bỏ Túi

- **EN:** A tiny garden with crops and flowers.
- **VI:** Khu vườn nhỏ có cây trồng và hoa.
- **Entities:** none; **structures:** garden; **assets:** vanilla rendering + pack feedback
- **Cleanup:** none; **expected cost:** low; **validation:** `tests/events.test.mjs:structure_garden; manual: open eligible tier and follow EVENT_CATALOG.md`.

### `structure_watchtower` — Questionable Tower / Tháp Đáng Ngờ

- **EN:** A compact ladder-access watchtower.
- **VI:** Tháp canh nhỏ có thang leo.
- **Entities:** none; **structures:** watchtower; **assets:** vanilla rendering + pack feedback
- **Cleanup:** none; **expected cost:** low; **validation:** `tests/events.test.mjs:structure_watchtower; manual: open eligible tier and follow EVENT_CATALOG.md`.

### `structure_cage` — Empty Villain Cage / Lồng Phản Diện Trống

- **EN:** An empty iron-bar joke cage.
- **VI:** Lồng sắt trống mang tính đùa.
- **Entities:** none; **structures:** cage; **assets:** vanilla rendering + pack feedback
- **Cleanup:** none; **expected cost:** low; **validation:** `tests/events.test.mjs:structure_cage; manual: open eligible tier and follow EVENT_CATALOG.md`.

### `ride_horse` — Turbo Horse / Ngựa Tốc Độ

- **EN:** A saddled rideable horse.
- **VI:** Ngựa có yên để cưỡi.
- **Entities:** minecraft:horse; **structures:** none; **assets:** vanilla rendering + pack feedback
- **Cleanup:** none; **expected cost:** low; **validation:** `tests/events.test.mjs:ride_horse; manual: open eligible tier and follow EVENT_CATALOG.md`.

### `ride_camel` — Desert Taxi / Taxi Sa Mạc

- **EN:** A saddled two-seat camel.
- **VI:** Lạc đà hai chỗ có yên.
- **Entities:** minecraft:camel; **structures:** none; **assets:** vanilla rendering + pack feedback
- **Cleanup:** none; **expected cost:** low; **validation:** `tests/events.test.mjs:ride_camel; manual: open eligible tier and follow EVENT_CATALOG.md`.

### `ride_pig` — Premium Pig / Heo Cao Cấp

- **EN:** A saddled pig and carrot-on-a-stick.
- **VI:** Heo có yên và cà rốt cần câu.
- **Entities:** minecraft:pig; **structures:** none; **assets:** vanilla rendering + pack feedback
- **Cleanup:** none; **expected cost:** low; **validation:** `tests/events.test.mjs:ride_pig; manual: open eligible tier and follow EVENT_CATALOG.md`.

### `ride_boat` — Portable Yacht / Du Thuyền Di Động

- **EN:** A boat for water travel.
- **VI:** Thuyền để di chuyển trên nước.
- **Entities:** minecraft:boat; **structures:** none; **assets:** vanilla rendering + pack feedback
- **Cleanup:** none; **expected cost:** low; **validation:** `tests/events.test.mjs:ride_boat; manual: open eligible tier and follow EVENT_CATALOG.md`.

### `ride_minecart` — Chaos Express / Tàu Hỗn Loạn

- **EN:** A minecart and a short rail kit.
- **VI:** Xe mỏ và bộ đường ray ngắn.
- **Entities:** minecraft:minecart; **structures:** none; **assets:** vanilla rendering + pack feedback
- **Cleanup:** none; **expected cost:** low; **validation:** `tests/events.test.mjs:ride_minecart; manual: open eligible tier and follow EVENT_CATALOG.md`.

### `ride_strider` — Lava Limo / Limousine Dung Nham

- **EN:** A saddled strider and warped-fungus-on-a-stick.
- **VI:** Strider có yên và nấm cần câu.
- **Entities:** minecraft:strider; **structures:** none; **assets:** vanilla rendering + pack feedback
- **Cleanup:** none; **expected cost:** low; **validation:** `tests/events.test.mjs:ride_strider; manual: open eligible tier and follow EVENT_CATALOG.md`.

### `collect_chaos_shard` — Chaos Shard / Mảnh Hỗn Loạn

- **EN:** A collectible Chaos Shard.
- **VI:** Mảnh Hỗn Loạn để sưu tầm.
- **Entities:** none; **structures:** none; **assets:** vanilla rendering + pack feedback
- **Cleanup:** none; **expected cost:** low; **validation:** `tests/events.test.mjs:collect_chaos_shard; manual: open eligible tier and follow EVENT_CATALOG.md`.

### `collect_lucky_coin` — Lucky Coin / Đồng Xu May Mắn

- **EN:** A collectible Lucky Coin.
- **VI:** Đồng Xu May Mắn để sưu tầm.
- **Entities:** none; **structures:** none; **assets:** vanilla rendering + pack feedback
- **Cleanup:** none; **expected cost:** low; **validation:** `tests/events.test.mjs:collect_lucky_coin; manual: open eligible tier and follow EVENT_CATALOG.md`.

### `collect_meme_token` — Meme Token / Vật Meme

- **EN:** A collectible Meme Token.
- **VI:** Vật Meme để sưu tầm.
- **Entities:** none; **structures:** none; **assets:** vanilla rendering + pack feedback
- **Cleanup:** none; **expected cost:** low; **validation:** `tests/events.test.mjs:collect_meme_token; manual: open eligible tier and follow EVENT_CATALOG.md`.

### `collect_star_fragment` — Star Fragment / Mảnh Sao

- **EN:** A collectible Star Fragment.
- **VI:** Mảnh Sao để sưu tầm.
- **Entities:** none; **structures:** none; **assets:** vanilla rendering + pack feedback
- **Cleanup:** none; **expected cost:** low; **validation:** `tests/events.test.mjs:collect_star_fragment; manual: open eligible tier and follow EVENT_CATALOG.md`.

### `collect_prank_badge` — Prank Badge / Huy Hiệu Trêu Chọc

- **EN:** A collectible Prank Badge.
- **VI:** Huy Hiệu Trêu Chọc để sưu tầm.
- **Entities:** none; **structures:** none; **assets:** vanilla rendering + pack feedback
- **Cleanup:** none; **expected cost:** low; **validation:** `tests/events.test.mjs:collect_prank_badge; manual: open eligible tier and follow EVENT_CATALOG.md`.

### `collect_crown` — Chaos Crown / Vương Miện Hỗn Loạn

- **EN:** A collectible Chaos Crown.
- **VI:** Vương Miện Hỗn Loạn để sưu tầm.
- **Entities:** none; **structures:** none; **assets:** vanilla rendering + pack feedback
- **Cleanup:** none; **expected cost:** low; **validation:** `tests/events.test.mjs:collect_crown; manual: open eligible tier and follow EVENT_CATALOG.md`.
