# AuraCap — Handover

> Read this + `ROADMAP.md` + `~/Capricorn-Brain/01 Projects/AuraCap.md` before working here.
> Last updated: 2026-11-26 · Fleet: Wave 2 gallery regen (post-motion)

## What this is
Organize your iPhone, iPad and Mac setup — offline PWA.

## Facts
**Version:** 5.5.1 · SW `auracap-v551`
**Live:** https://shamikhahmed.github.io/AuraCap/ · `VERSION.json` on Pages (AUR-V3-2)
**Repo:** https://github.com/shamikhahmed/AuraCap
**Branch (v3):** `perfection/auracap-v3`
**Stack:** React 19 + TypeScript + Vite. CSS motion only (framer/three/GSAP removed — P-AUR-2). vite-plugin-pwa.
**Data:** IndexedDB via `idb`. No backend, no accounts.

## Run & verify
```bash
npm ci
npm run verify          # lint + deviceName unit + build + Playwright e2e
npm run ensure:version  # dist/VERSION.json must exist after build
npm run tier1
```

## Perfection v3 (Wave C)
- Items: `qa/perfection/ITEMS.md` — AUR-V3-1/2/3 ✅ FIXED → Auditor; AUR-V3-4 gallery L
- Evidence: `qa/perfection/{baseline,post-fix}/device-qa.json`
- Hand-off: `qa/perfection/STATE.md`

## Architecture
- `src/pages/` — Overview (Dashboard), Setup report (DNA), Import, App Library, Organizer, Smart Assistant, Wallpaper, Lock Screen, Widget Lab, Shortcuts, Cleanse, Routine, Profiles, Settings
- `src/App.tsx` — routes, TitleSync, demo via `?demo=1`
- `public/` — marketing pages, privacy.html
- `.github/workflows/deploy.yml` — Pages deploy gated on verify (`needs: test`)

## Cap Standard
Docs · gallery · version discipline · e2e · CI gate · PWA · demo mode — Tier 1 release 5.5.1.

## Screen gallery (2026-11-26)

- Real Playwright regen: `npm run gallery` → **32** PNGs (16 screens × mobile/desktop) under `docs/screenshots/gallery/`.
- Manifest `generated` `2026-11-25T20:02:28.559Z` (UTC) / v5.5.2; viewer `screen-gallery.html`.

## Motion contract (2026-11-26)

- Motion contract: re-synced `capricorn-core.css` + `capricorn-motion.js` from `capricorn-tooling/shared/design-system` (tokens `--cap-dur-*`, splash, view transitions). App shells keep `data-cap-app="1"` instant reveals (no marketing scrub). See `docs/MOTION.md`.

Source: `../capricorn-tooling/shared/design-system/` via `node scripts/sync-design-system.mjs`.
