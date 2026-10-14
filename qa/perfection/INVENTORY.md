# AuraCap — Perfection Loop v3 · INVENTORY

Seed: §13.10 + `src/App.tsx` routes. Demo: `?demo=1`.

## Routes / screens
| ID | Route | Screen | Notes |
|---|---|---|---|
| welcome | `/` (first-run) | WelcomeScreen | device + enter / demo / import guide |
| overview | `/dashboard` | Overview (Dashboard) | Aura Score, regions, quick stats, constellation |
| apps | `/apps` | App Library | list / search |
| dna | `/dna` | Setup report | Focus/Clarity/Org + locations |
| import | `/import` | Import apps | paste/file |
| import-guide | `/import-guide` | Import guide | how-to |
| organizer | `/organizer` | Smart Organizer | folders |
| profiles | `/profiles` | Profiles | create/switch |
| settings | `/settings` | Settings | theme, cleanse, about, privacy/support |
| lockscreen | `/lockscreen` | Lock Screen studio | |
| designer | `/designer` | Smart Assistant / designer | |
| wallpaper | `/wallpaper` | Wallpapers | |
| widgets | `/widgets` | Widget Lab | |
| routine | `/routine` | Daily Routine | |
| cleanse | `/cleanse` | Digital Cleanse | |
| shortcuts | `/shortcuts` | Shortcuts | |
| history | `/history` | Version history | if routed |
| 404 | `*` | Not found | |

## Chrome
- Topbar: device cycle pill, More menu
- Sidebar (≥700px) / MobileTabBar (&lt;700px)
- Command palette, Demo banner, Toast, Modals

## Forms
- Device select (welcome + topbar cycle): iPhone / iPad / Mac
- Region (settings / import context)
- App-list import (paste / file)
- Profile create (name, emoji, color)
- Designer / wallpaper / widget / routine / shortcuts controls
- Settings toggles (notifications for cleanse — permission only after user grant; no cold-load request)

## States
first-run · demo · empty (no apps) · filled · score-info modal · offline (PWA shell) · reduced-motion

## Network destinations
None at runtime beyond same-origin PWA shell (see `privacy.html`). No analytics.
