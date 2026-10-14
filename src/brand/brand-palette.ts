/** AuraCap brand palette (kill-list / ACBrand). Paths under src/brand/ are brandOk. */
export const ACBrand = {
  appleBlue: '#0071E3',
  appleBlueLite: '#409CFF',
  appleBlueBright: '#0A84FF',
  indigo: '#4f6ef7',
  indigoSoft: '#7b5ea7',
  teal: '#1de9b6',
  tealDeep: '#0097a7',
  amber: '#f59e0b',
  red: '#ef4444',
  violet: '#a855f7',
  violetBlue: '#6366f1',
  pink: '#ec4899',
  rose: '#f43f5e',
  cyan: '#22d3ee',
  green: '#22c55e',
  lime: '#84cc16',
  orange: '#f97316',
  pkGreen: '#00a550',
  ukBlue: '#012169',
  uaeGreen: '#009000',
  oled: '#050507',
  oledDeep: '#0d0d20',
  white: '#fff',
} as const;

export const AC_ACCENT_PAIRS: readonly [string, string][] = [
  [ACBrand.appleBlue, ACBrand.appleBlueLite],
  [ACBrand.teal, ACBrand.tealDeep],
  [ACBrand.amber, ACBrand.red],
  [ACBrand.violet, ACBrand.violetBlue],
  [ACBrand.pink, ACBrand.rose],
  [ACBrand.cyan, ACBrand.violetBlue],
];

export const AC_VERSION_COLORS = [
  ACBrand.indigo,
  ACBrand.teal,
  ACBrand.amber,
  ACBrand.violet,
] as const;

export const AC_CATEGORY_COLORS: Record<string, string> = {
  social: ACBrand.pink,
  messaging: ACBrand.indigo,
  productivity: ACBrand.teal,
  notes: ACBrand.green,
  entertainment: ACBrand.red,
  music: ACBrand.violet,
  finance: ACBrand.cyan,
  crypto: ACBrand.amber,
  games: ACBrand.orange,
  health: ACBrand.green,
  fitness: ACBrand.lime,
  travel: ACBrand.teal,
  photo: ACBrand.pink,
  design: ACBrand.violet,
  pakistan: ACBrand.pkGreen,
  uk: ACBrand.ukBlue,
  uae: ACBrand.uaeGreen,
  ai: ACBrand.violetBlue,
};

export const AC_LOCKSCREEN_MINIMAL_BG = `linear-gradient(160deg,${ACBrand.oled},${ACBrand.oledDeep})`;
