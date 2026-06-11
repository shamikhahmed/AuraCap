#!/usr/bin/env node
/**
 * Extracts AuraCap data constants from the single-file HTML source.
 * Usage: node scripts/extract-from-html.mjs [path-to-AuraOS.html]
 */
import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const htmlPath = process.argv[2] || join(process.env.HOME, 'Downloads', 'AuraOS.html');
const html = readFileSync(htmlPath, 'utf8');

const extract = (name) => {
  const re = new RegExp(`var ${name}\\s*=\\s*([\\s\\S]*?);\\s*(?:var |//|function )`, 'm');
  const m = html.match(re);
  if (!m) throw new Error(`Could not extract ${name}`);
  return m[1].trim();
};

const vars = [
  'CATS', 'LSBGS', 'LS_PRESETS', 'WIDGET_PRESETS',
  'SMART_FOLDERS', 'DNA_DIMS', 'DNA_PROFILES', 'LOC_SIGNALS', 'REDUNDANCY_GROUPS',
  'SAMPLE_LIST', 'DCLRS', 'DEMOJ', 'DEV_RULES', 'DEFAULT_PROFILES', 'DRECS',
];

const outDir = join(root, 'src', 'data');
mkdirSync(outDir, { recursive: true });

// DIST apps list (inline in HTML)
const distMatch = html.match(/var DIST=\[([^\]]+)\]/);
const distApps = distMatch
  ? distMatch[1].split(',').map((s) => s.replace(/['"]/g, '').trim())
  : ['TikTok', 'Instagram', 'Facebook', 'Twitter/X', 'Reddit', 'PUBG Mobile', 'Free Fire'];

writeFileSync(
  join(outDir, 'constants.ts'),
  `// Auto-generated from AuraOS.html (source) — run: node scripts/extract-from-html.mjs\n\n` +
  vars.map((v) => `export const ${v} = ${extract(v)} as const;\n`).join('\n') +
  `\nexport const DIST_APPS = ${JSON.stringify(distApps)} as const;\n`,
);

// Split APPS into separate file for readability
const appsRaw = extract('APPS');
writeFileSync(join(outDir, 'apps.ts'), `// Auto-generated\nimport type { AppEntry } from '@/types';\n\nexport const APPS: AppEntry[] = ${appsRaw};\n`);

// Wallpapers
const wpsRaw = extract('WPS');
writeFileSync(join(outDir, 'wallpapers.ts'), `// Auto-generated\nimport type { Wallpaper } from '@/types';\n\nexport const WPS: Wallpaper[] = ${wpsRaw};\n`);

// Widgets
const wgtsRaw = extract('WGTS');
writeFileSync(join(outDir, 'widgets.ts'), `// Auto-generated\nimport type { Widget } from '@/types';\n\nexport const WGTS: Widget[] = ${wgtsRaw};\n`);

console.log(`Extracted ${vars.length} constants + APPS, WPS, WGTS → src/data/`);
