# Changelog — AuraCap

## 5.2.0 (2026-07-11)
- Cap Standard rollout: 32-shot screen gallery (16 screens x mobile/desktop, `npm run gallery`) + browsable `screen-gallery.html`.
- CI now gates Pages deploys on `npm run verify` (lint + build + Playwright e2e).
- `verify` / `gallery` / `gallery:view` npm scripts per Cap Standard contract; `test:e2e` now builds first.
- Version sync: package.json + VERSION.json aligned at 5.2.0.

## 5.1.0 (2026-07-11)
- Demo mode via `?demo=1`; per-route document titles (TitleSync, TS5076 precedence fix); desktop nav + demo-mode scripts.

## 5.0.5 (2026-06-15)
- Restore pre–Capricorn identity home-screen icons; Workbox cache bump.

## 5.0.4 (2026-06-15)
- Merge **Profiles** and **Version History** into one page with Profiles | Snapshots sub-tabs; `/history` redirects to snapshots tab.
- Import page empty state with **Load sample list** CTA; Settings version synced to 5.0.4.
- PWA Workbox `cacheId` wired from `VERSION.json` (`auracap-v504`).

## 5.0.3 (2026-06-12)
- Phase P4: Playwright e2e for Mac Dock guide download button on Smart Organizer page.
