# AuraCap — Monetization (archived)

> **Status: historical — superseded by fleet decision G-2 (everything free).**  
> AuraCap **5.5.0** ships with **no Pro tier, no paywalls, and no upgrade UI**. This file is kept
> only as a record of early 2026 planning. Do not implement gates or pricing from the sections below.

---

## Archived plan (2026-06-28)

### Model: One-time purchase ($14.99) + future Pro tier

#### Why someone pays (historical)
AuraCap was scoped for Apple power users: DNA-based app organization, smart folders, wallpapers.

#### Revenue logic (historical)
- Target: 200 one-time purchases/mo × $14.99
- Future Pro tier: iCloud sync, multiple profiles, widget presets, coach exports

---

## Archived feature matrix

| Feature | Free | Paid ($14.99) | Future Pro |
|---------|------|----------------|------------|
| App list + Digital DNA | ✅ | ✅ | ✅ |
| Smart Organizer (10 groups) | ✅ | ✅ | ✅ |
| Wallpapers (basic) | ✅ | ✅ | ✅ |
| Profiles (1) | ✅ | ✅ | ✅ |
| Smart Organizer (unlimited) | ❌ | ✅ | ✅ |
| Wallpapers (full library) | ❌ | ✅ | ✅ |
| Smart Assistant | ❌ | ✅ | ✅ |
| Widget Lab | ❌ | ✅ | ✅ |
| Multiple profiles + snapshots | ❌ | ✅ | ✅ |
| iCloud sync (opt-in) | ❌ | ❌ | ✅ Roadmap |
| Coach export PDF | ❌ | ❌ | ✅ Roadmap |

---

## Current product truth (G-2)

- All features open in the shipped PWA; no `isPro()` gate in production paths.
- Settings may mention App Store waitlist copy only — not a paywall.
- Remove or avoid reintroducing `.paywall-*` UI without an explicit owner decision.

*Last archived: 2026-10-14 · live v5.5.0*
