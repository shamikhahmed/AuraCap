# AuraCap — Monetization Plan

## Model: One-time purchase ($14.99) + future Pro tier

### Why someone pays
AuraCap solves a specific, recurring pain for Apple power users: screen setup paralysis. Someone who just got a new iPhone or wants to overhaul their digital setup will pay $14.99 without thinking — it's less than one App Store game, and the value (DNA-based app organization + smart folders + wallpapers) is immediately tangible.

### Revenue logic
- Target: 200 one-time purchases/mo × $14.99 = **$2,998/mo** (Apple takes 30% → ~$2,098 net)
- No subscription fatigue — one-time purchase converts higher in Apple power-user niche
- Future Pro tier: iCloud sync, multiple profiles, widget presets, coach exports

---

## Model: One-time ($14.99) → Future Pro ($4.99/mo)

| Feature | Free | Paid ($14.99) | Future Pro |
|---------|------|----------------|------------|
| App list + Digital DNA | ✅ | ✅ | ✅ |
| Smart Organizer (10 groups) | ✅ | ✅ | ✅ |
| Wallpapers (basic) | ✅ | ✅ | ✅ |
| Profiles (1) | ✅ | ✅ | ✅ |
| Smart Organizer (unlimited) | ❌ | ✅ | ✅ |
| Wallpapers (full library) | ❌ | ✅ | ✅ |
| AI Designer | ❌ | ✅ | ✅ |
| Widget Lab | ❌ | ✅ | ✅ |
| Multiple profiles + snapshots | ❌ | ✅ | ✅ |
| iCloud sync (opt-in) | ❌ | ❌ | ✅ Roadmap |
| Coach export PDF | ❌ | ❌ | ✅ Roadmap |

---

## Implementation (current)
- No hard gate yet — all features open (`?demo=1` auto-loads sample wardrobe as of 2026-06-28)
- `window.AuraPro.isPro()` placeholder — reads `localStorage.getItem('ac_pro_active') === '1'`
- Demo mode: always `isPro() = true`
- `openProUpgrade()` global triggers pricing sheet
- CSS scaffold already in `src/premium.css` (`.paywall-sheet`, `.paywall-plan`, `.paywall-plan--selected`)
- Gate candidates: AI Designer, Widget Lab, 3+ profiles, unlimited organizer groups

## Fix applied 2026-06-28
- `?demo=1` URL param now auto-triggers `loadDemo()` in `App.tsx` `AppRoutes` — no longer requires clicking button
- Title fixed: removed "v5" from `<title>`

## Payment path (current)
- Waitlist / "coming to App Store" copy in Settings
- Next: App Store IAP (Capacitor) or Stripe one-time checkout for web PWA

---

*Last updated: 2026-06-28*
