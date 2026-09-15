# AuraCap — Handover

> Read this + `ROADMAP.md` + `~/Capricorn-Brain/01 Projects/AuraCap.md` before working here.
> Last updated: 2026-09-15 · Fleet: Cap Fleet Finish Program Tier 1

## What this is
Organize your iPhone, iPad and Mac setup — offline PWA.

## Facts
**Version:** 5.4.2 · SW `auracap-v542`
**Live:** https://shamikhahmed.github.io/AuraCap/
**Repo:** https://github.com/shamikhahmed/AuraCap
**Stack:** React 19 + TypeScript + Vite + framer-motion. three.js and GSAP removed (AUR-P1-03). vite-plugin-pwa.
**Data:** IndexedDB via `idb`. No backend, no accounts.

## Run & verify
```bash
npm install
npm run dev
npm run verify   # lint + deviceName unit + build + Playwright e2e
```

## Architecture
- `src/pages/` — Overview (Dashboard), Setup report (DNA), Import, App Library, Organizer, Smart Assistant, Wallpaper, Lock Screen, Widget Lab, Shortcuts, Cleanse, Routine, Profiles, Settings
- `src/App.tsx` — routes, TitleSync, demo via `?demo=1`
- `public/` — marketing pages, privacy.html
- `.github/workflows/deploy.yml` — Pages deploy gated on verify (`needs: test`)

## Cap Standard
Docs · gallery · version discipline · e2e · CI gate · PWA · demo mode — Tier 1 release 5.4.2.
