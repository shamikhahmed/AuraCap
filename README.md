# AuraCap v5 — Apple Ecosystem Studio

**Version:** 5.3.0

Offline-first PWA for organizing iPhone, iPad, and Mac app setups. Ported from the single-file HTML app into a production React + TypeScript architecture.

**Live demo:** [https://shamikhahmed.github.io/AuraCap/](https://shamikhahmed.github.io/AuraCap/)

**Marketing:** [Landing](https://shamikhahmed.github.io/AuraCap/landing.html) · [Pitch](https://shamikhahmed.github.io/AuraCap/pitch.html) · [Presentation](https://shamikhahmed.github.io/AuraCap/presentation.html) · [Privacy](https://shamikhahmed.github.io/AuraCap/privacy.html)

## Features

- **16 modules**: Dashboard, Digital DNA, Import, App Library, Smart Organizer, Smart Assistant, Wallpapers (42+), Lockscreen Builder, Widget Lab, Shortcuts (12), Digital Cleanse, Daily Routine, Profiles, Version History, Settings
- **Smart Assistant**: rules-based DNA analysis, chat, and layout recommendations (no external API)
- **IndexedDB** persistence via `idb`
- **Demo mode** with sample app wardrobe
- **Command palette** (⌘/Ctrl+K)
- **PWA** with offline support
- **Light/dark theme** + accent colors
- **Export/import** TXT app lists and full JSON backups

## How to import your apps

AuraCap needs your real installed app list to power DNA analysis, smart folders, and device layouts.

| Method | Best for |
|--------|----------|
| **iOS Shortcuts** | iPhone & iPad — `Get All Apps → Get Name → Combine → Copy` |
| **Mac Terminal** | `ls /Applications \| sed 's/.app//'` + `ls ~/Applications \| sed 's/.app//'` |
| **Paste .txt** | Drop or paste any plain-text app list in Import |
| **App Library** | Browse 1000+ apps and tap to add manually |
| **Demo / Sample** | Try AuraCap without importing |
| **JSON backup** | Settings → Import JSON Backup |

**Full guide:** Open the app → **Import Apps** → **How to Import** tab, or visit `/import-guide`. The Welcome screen also links to the guide.

## Quick start

```bash
npm install
npm run dev        # http://localhost:5173/AuraCap/
npm run build
npm run preview    # production preview
npm run generate-icons
npm run test:e2e   # Playwright tests
```

## Data extraction

To refresh app/wallpaper data from the source HTML:

```bash
npm run extract-data -- /path/to/AuraOS.html
```

## Screen gallery

Every screen, mobile + desktop, auto-captured with Playwright:

```bash
npm run gallery        # regenerate docs/screenshots/gallery/
npm run gallery:view   # then open http://127.0.0.1:8772/screen-gallery.html
```

Regenerate on each release so [screen-gallery.html](./screen-gallery.html) stays current.

## Verify

```bash
npm run verify   # lint + build + Playwright e2e — CI runs this before every deploy
```

## Deploy

GitHub Pages workflow deploys from `main` to `https://shamikhahmed.github.io/AuraCap/`.

Set `base: '/AuraCap/'` in `vite.config.ts` (already configured).

## Tech stack

- React 19 + TypeScript + Vite 8
- Tailwind CSS v4
- React Router · Framer Motion · Lucide React
- IndexedDB (`idb`) · vite-plugin-pwa · Playwright