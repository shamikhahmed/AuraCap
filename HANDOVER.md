# AuraCap — Handover

> Read this + `ROADMAP.md` + `~/Capricorn-Brain/01 Projects/AuraCap.md` before working here.
> Last updated: 2026-07-11 · Fleet-wide standard: `capricorn-tooling/shared/CAP-STANDARD.md`

## What this is
Apple ecosystem studio PWA — app setups, digital DNA, layouts, wallpapers, widgets.

## Facts
**Version:** 5.1.0
**Live:** https://shamikhahmed.github.io/AuraCap/
**Repo:** https://github.com/shamikhahmed/AuraCap
**Stack:** React 19 + TypeScript + Vite. GSAP/Three.js motion layer (app fast mode skips it). vite-plugin-pwa.
**Data:** Browser local storage / IndexedDB via app context. No backend, no accounts.

## Run & verify
```bash
npm install
npm run dev
npm run build
npm run test:e2e   # if present — verify before relying on it
```

## Architecture
- `src/pages/` — Dashboard, DNA, Import, App Library, Organizer, Designer, Wallpaper, Lock Screen, Widget Lab, Shortcuts, Cleanse, Routine, Profiles, Settings
- `src/App.tsx` — routes, TitleSync (per-route document.title), demo mode entry via `?demo=1`
- `public/` — marketing pages (landing/pitch/presentation), capricorn-core.css design system, cap-demo-mode.js, cap-desktop-nav.js
- `.github/workflows/deploy.yml` — Pages deploy

## Cap Standard status (2026-07-11)
| Cap Standard item | Status |
|---|---|
| Docs pack | ✅ |
| Screen gallery | ❌ |
| Version discipline | ✅ |
| QA / e2e | 🟡 |
| CI gate | 🟡 |
| PWA polish | ✅ |
| Demo mode | ✅ |

Gaps are tracked as tasks in `ROADMAP.md`.

## Gotchas — read before coding
- TitleSync `??`/`||` precedence bug fixed 2026-07-11 — don't regress when touching fallback title logic.
- GSAP 'app fast mode' intentionally skips WebGL/GSAP on app shell — don't re-enable without checking performance decisions in git history.
- Marketing decks in public/ are synced copies — hub site has its own; keep copy consistent.

## Where decisions live
- Dated decisions: Capricorn-Brain project note (path above)
- Release history: `CHANGELOG.md`
- Fleet-level events: `Cap-Apps/docs/CHANGELOG.md` (master)
