# AuraCap — Roadmap

> Updated 2026-07-19. Fleet order & standard: `capricorn-tooling/shared/CAP-STANDARD.md`.

## Now — v5.2.1
Cap Family Mega-Wave brand lock + Smart Assistant naming. See `CHANGELOG.md`.

## Cap Standard gaps
| Cap Standard item | Status |
|---|---|
| Docs pack | ✅ |
| Screen gallery | ✅ |
| Version discipline | ✅ |
| QA / e2e | ✅ |
| CI gate | ✅ |
| PWA polish | ✅ |
| Demo mode | ✅ |

## Next (ordered)
1. Screen gallery: port ScentCap `e2e/gallery.spec.ts` + `screen-gallery.html` (routes already enumerated in PAGE_TITLES)
2. CI gate: add `test` job running `npm run verify` before Pages deploy (copy ScentCap deploy.yml)
3. Add `verify` npm script (lint + build + e2e)
4. Tag current state v5.1.0

## Later
- App Store packaging decision (Capacitor?)
- Import flow real-device walkthrough doc

## Ground rules
- No dirty trees: commit or discard before ending a session.
- CI green before tag; tag `vX.Y.Z` per release.
- Bump SW cache with any asset change (PWA apps).
- Never commit `.env` / secrets.
