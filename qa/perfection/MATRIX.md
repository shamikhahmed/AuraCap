# AuraCap — Perfection Loop v3 · MATRIX

Updated: 2026-10-14 · §15.2 core **100%**

**§15.2 v3 core matrix contract:** Overview demo device-qa 7-pack + legacy gallery light inventory routes (16 screens × mobile/desktop). Dark theme and route-level extended states → L ITEMS (AUR-V3-L).

Legend: ✅ evidence · N/A reason

## Overview · demo · light (device-qa engines)

| Device | WebKit | Chromium |
|---|---|---|
| iPhone SE 375 | ✅ post-fix | — |
| iPhone 390 | ✅ post-fix | — |
| iPad portrait 820 | ✅ post-fix | — |
| iPad landscape 1180 | ✅ post-fix | — |
| MacBook 1440 | ✅ post-fix | ✅ post-fix |
| Android 412 | — | ✅ post-fix |

Evidence: `qa/perfection/post-fix/AuraCap-*.png` + `device-qa.json` (tap&lt;32=0, text&lt;11=0, pageErr=0).

## Gallery legacy light (manifest v5.5.0 · mobile + desktop)

Paths: `docs/screenshots/gallery/{mobile,desktop}-*.png` · `gallery-manifest.json`

| Screen | light×mobile | light×desktop |
|---|---|---|
| Welcome | ✅ | ✅ |
| Overview | ✅ | ✅ |
| Setup report | ✅ | ✅ |
| Import Apps | ✅ | ✅ |
| Import Guide | ✅ | ✅ |
| App Library | ✅ | ✅ |
| Smart Organizer | ✅ | ✅ |
| Smart Assistant | ✅ | ✅ |
| Wallpapers | ✅ | ✅ |
| Lock Screen | ✅ | ✅ |
| Widget Lab | ✅ | ✅ |
| Shortcuts | ✅ | ✅ |
| Digital Cleanse | ✅ | ✅ |
| Daily Routine | ✅ | ✅ |
| Profiles | ✅ | ✅ |
| Settings | ✅ | ✅ |

## N/A (justified · counted)
| Item | Reason |
|---|---|
| dark×* gallery | Legacy manifest is light-only — AUR-V3-L |
| iPad explicit column | §9.1 — mobile/desktop; device-qa covers iPad |
| wide 1920 | mac device-qa + desktop gallery |
| WebKit on Android / Chromium on iPhone SE rows | device-qa matrix uses engine-appropriate devices only |

## L ITEMS (out of §15.2 core)
| Item | Tracker |
|---|---|
| Full dark + schema-v2 gallery | AUR-V3-L |
| Extended states per route (sheets, errors, offline) | AUR-V3-L |

## Coverage rollup (§15.2 core)
| Bucket | ✅ | N/A | ⏳ |
|---|---:|---:|---:|
| Device-qa Overview (7) | 7 | 0 | 0 |
| Gallery light (32) | 32 | 0 | 0 |
| Justified N/A | 0 | 4 | 0 |
| **Matrix %** | | | **100%** |
