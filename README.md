# AuraCap v5 — Apple Ecosystem Studio

Offline-first PWA for organizing iPhone, iPad, and Mac app setups. Ported from the single-file HTML app into a production React + TypeScript architecture.

**Live demo:** [https://shamikhahmed.github.io/AuraCap/](https://shamikhahmed.github.io/AuraCap/)

## Features

- **16 modules**: Dashboard, Digital DNA, Import, App Library, Smart Organizer, AI Designer, Wallpapers (42+), Lockscreen Builder, Widget Lab, Shortcuts (12), Digital Cleanse, Daily Routine, Profiles, Version History, Settings
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
npm run test:e2e   # Playwright tests
```

## Data extraction

To refresh app/wallpaper data from the source HTML:

```bash
npm run extract-data -- /path/to/AuraOS.html
```

## Deploy

GitHub Pages workflow deploys from `main` to `https://shamikhahmed.github.io/AuraCap/`.

Set `base: '/AuraCap/'` in `vite.config.ts` (already configured).

## Tech stack

- React 19 + TypeScript + Vite 8
- Tailwind CSS v4
- React Router · Framer Motion · Lucide React
- IndexedDB (`idb`) · vite-plugin-pwa · Playwright
