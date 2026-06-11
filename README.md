# AuraOS v5 — Apple Ecosystem Studio

Offline-first PWA for organizing iPhone, iPad, and Mac app setups. Ported from the single-file HTML app into a production React + TypeScript architecture.

## Features

- **16 modules**: Dashboard, Digital DNA, Import, App Library, Smart Organizer, AI Designer, Wallpapers, Lockscreen Builder, Widget Lab, Shortcuts, Digital Cleanse, Daily Routine, Profiles, Version History, Settings
- **Smart Assistant**: rules-based DNA analysis, chat, and layout recommendations (no external API)
- **IndexedDB** persistence via `idb`
- **Demo mode** with sample app wardrobe
- **Command palette** (⌘/Ctrl+K)
- **PWA** with offline support

## Quick start

```bash
npm install
npm run dev        # http://localhost:5173/AuraOS/
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

GitHub Pages workflow deploys from `main` to `https://<user>.github.io/AuraOS/`.

Set `base: '/AuraOS/'` in `vite.config.ts` (already configured).

## Tech stack

- React 19 + TypeScript + Vite 8
- Tailwind CSS v4
- React Router · Framer Motion · Lucide React
- IndexedDB (`idb`) · vite-plugin-pwa · Playwright
