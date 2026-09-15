# AuraCap innerHTML sinks

Generated: 2026-09-15

## Policy
- Static UI chrome templates: OK
- User-controlled strings must use `textContent` / escaped helpers
- Prefer `textContent` when appending single values

## Counts

| Class | Count |
|-------|------:|
| static-template | 1 |

## Inventory

| File | Line | Class |
|------|-----:|-------|
| public/js/cap-demo-mode.js | 55 | static-template |

## Notes
`screen-gallery.html` also uses `innerHTML` for static gallery chrome; excluded from product kill-list (marketing/gallery shell). Demo banner markup is static template + escaped message path via `messageHtml` construction in the shared helper.
