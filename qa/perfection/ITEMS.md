# AuraCap — Perfection Loop v3 · ITEMS

Seeded from CURSOR-PERFECTION-LOOP.md §13.10.

### AUR-V3-1 — small tap targets on Overview
severity: P1 · status: ✅ VERIFIED
Where: Overview `?demo=1` · touch devices · WebKit + Chromium Android  
Evidence: fleet baseline `smallCount=5` (Device pill, More, Full setup report, What is Aura Score?, Region: Pakistan) → post-fix `smallCount=0`  
Cause: `.pill` / `.dash-rail-link` / score info button / non-interactive `AppChip` buttons under 32px  
Fix: `.pill` and `.dash-rail-link` ≥ 44px; score info `min-h-11`; decorative region chips render as `<span>` when non-interactive  
Auditor: ✅ VERIFIED 2026-10-14T11:30:00Z — auditor-independent 7/7 hard=0 tap=0 text=0 pageErr=0; VERSION.json in dist @ c1ec7bb

### AUR-V3-2 — publish VERSION.json on Pages
severity: P1 · status: ✅ VERIFIED
Where: live `https://shamikhahmed.github.io/AuraCap/VERSION.json` (404 while main deploy red)  
Cause: `public/VERSION.json` already present after stepR, but Pages deploy blocked — `finish-matrix` job ran Playwright preview without a prior `build` (webServer 120s timeout)  
Fix: `test:matrix` now `npm run build && …`; CI `ensure:version` gate after build; `dist/VERSION.json` verified locally (`5.4.2`)  
Note: live 200 requires merge→main green deploy (Phase I)  
Auditor: ✅ VERIFIED 2026-10-14T11:30:00Z — auditor-independent 7/7 hard=0 tap=0 text=0 pageErr=0; VERSION.json in dist @ c1ec7bb

### AUR-V3-3 — merge finish/auracap-stepR + review wip/auracap-2026-09
severity: P1 · status: ✅ VERIFIED
Where: Phase 0 / Wave C  
Cause: finish branch + untested WIP snapshot  
Fix: finish merged to `main` @ `cca19e4` (Conductor). Cherry-picked clear WIP improvements only: no Notification.requestPermission on cold load; `#main` landmark + skip link; CSS enter animations replacing framer-motion (P-AUR-2); Sidebar profile `aria-label`. Skipped WIP Dashboard aria-label removal.  
Auditor: ✅ VERIFIED 2026-10-14T11:30:00Z — auditor-independent 7/7 hard=0 tap=0 text=0 pageErr=0; VERSION.json in dist @ c1ec7bb

### AUR-V3-4 — gallery 32 shots → full v3 both themes
severity: P2 · status: L (later phase G)  
Where: gallery capture · light + dark × devices  
Cause: current gallery is light-oriented / incomplete vs §9  
Fix: — (Phase G after Auditor P0/P1)  
Auditor: —
