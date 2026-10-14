#!/usr/bin/env node
/** Live-URL gallery v3 — Dashboard + Apps + Settings × light/dark × devices (AUR-V3-4). */
import { createRequire } from 'node:module';
import { mkdirSync, writeFileSync, readFileSync, existsSync, unlinkSync, readdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const GALLERY_DIR = join(ROOT, 'docs', 'screenshots', 'gallery');
const MANIFEST = join(GALLERY_DIR, 'gallery-manifest.json');
const LIVE_ROOT = (process.env.GALLERY_BASE_URL || 'https://shamikhahmed.github.io/AuraCap/').split('?')[0].replace(/\/?$/, '/');
const ACCENT = '#6366F1';
const CAPTURED_AT = new Date().toISOString();

const pwRoot =
  process.env.PW_CORE || join(ROOT, '..', 'MasteryCap', 'node_modules', 'playwright-core');
const { chromium } = createRequire(import.meta.url)(pwRoot);

const VIEWPORTS = {
  iphone: { width: 390, height: 844, deviceScaleFactor: 3 },
  ipad: { width: 1180, height: 820, deviceScaleFactor: 2 },
  mac: { width: 1440, height: 900, deviceScaleFactor: 2 },
};

const SCREENS = [
  { path: '/dashboard', group: 'Overview', screen: 'Dashboard', caption: 'Aura Score and constellation overview (demo).' },
  { path: '/apps', group: 'Library', screen: 'App Library', caption: 'On-device app library and search.' },
  { path: '/settings', group: 'System', screen: 'Settings', caption: 'Theme, profiles, and support.' },
];

function slug(s) {
  return String(s)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

function shotPath(theme, device, group, screen) {
  return `${theme}/${device}/${slug(group)}--${slug(screen)}--demo.webp`;
}

function pngToWebp(pngPath, webpPath) {
  mkdirSync(dirname(webpPath), { recursive: true });
  if (spawnSync('cwebp', ['-q', '82', pngPath, '-o', webpPath]).status === 0 && existsSync(webpPath)) {
    try {
      unlinkSync(pngPath);
    } catch {
      /* */
    }
    return;
  }
  spawnSync('cp', [pngPath, webpPath]);
}

function wipeLegacyGallery() {
  mkdirSync(GALLERY_DIR, { recursive: true });
  for (const f of readdirSync(GALLERY_DIR)) {
    if (/\.(png|webp)$/i.test(f)) unlinkSync(join(GALLERY_DIR, f));
  }
  for (const theme of ['light', 'dark']) {
    for (const device of ['iphone', 'ipad', 'mac']) {
      const sub = join(GALLERY_DIR, theme, device);
      if (!existsSync(sub)) continue;
      for (const f of readdirSync(sub)) {
        if (f.endsWith('.webp') || f.endsWith('.png')) unlinkSync(join(sub, f));
      }
    }
  }
}

function pageUrl(routePath) {
  const seg = routePath.replace(/^\//, '');
  return seg ? `${LIVE_ROOT}${seg}?demo=1` : `${LIVE_ROOT}?demo=1`;
}

async function setTheme(page, theme) {
  await page.emulateMedia({ colorScheme: theme });
  await page.evaluate((t) => {
    document.documentElement.setAttribute('data-theme', t);
    document.body.classList.toggle('light', t === 'light');
  }, theme);
  await page.waitForTimeout(280);
}

async function ensureDemoEntered(page) {
  await page.waitForFunction(() => window.__APP_READY__ === true, null, { timeout: 60000 });
  const onDashboard = await page
    .waitForFunction(
      () =>
        /\/dashboard\/?$/i.test(location.pathname) ||
        /\/AuraCap\/dashboard/i.test(location.pathname),
      null,
      { timeout: 8000 },
    )
    .then(() => true)
    .catch(() => false);
  if (!onDashboard) {
    const sample = page.getByRole('button', { name: /Try sample data/i });
    if (await sample.isVisible().catch(() => false)) {
      await sample.click();
    }
    await page.waitForFunction(
      () =>
        /dashboard/i.test(location.pathname) ||
        (document.body.innerText || '').includes('Aura Score'),
      null,
      { timeout: 60000 },
    );
  }
  await page.waitForTimeout(500);
}

async function goRoute(page, routePath) {
  await page.goto(pageUrl(routePath), { waitUntil: 'domcontentloaded', timeout: 60000 });
  await page.waitForFunction(() => window.__APP_READY__ === true, null, { timeout: 45000 });
  await page.waitForFunction(
    (p) => location.pathname.includes(p.replace(/^\//, '')),
    routePath,
    { timeout: 45000 },
  );
  await page.waitForTimeout(500);
}

async function main() {
  wipeLegacyGallery();
  const shots = [];
  const browser = await chromium.launch({ headless: true });
  try {
    for (const [device, vp] of Object.entries(VIEWPORTS)) {
      for (const theme of ['light', 'dark']) {
        const context = await browser.newContext({
          viewport: { width: vp.width, height: vp.height },
          deviceScaleFactor: vp.deviceScaleFactor,
          colorScheme: theme,
          isMobile: device !== 'mac',
          hasTouch: device !== 'mac',
        });
        const page = await context.newPage();
        await page.goto(pageUrl('/dashboard'), { waitUntil: 'domcontentloaded', timeout: 60000 });
        await ensureDemoEntered(page);
        await setTheme(page, theme);

        for (const scr of SCREENS) {
          await goRoute(page, scr.path);
          await setTheme(page, theme);
          const rel = shotPath(theme, device, scr.group, scr.screen);
          const webpPath = join(GALLERY_DIR, rel);
          const pngPath = webpPath.replace(/\.webp$/, '.png');
          mkdirSync(dirname(pngPath), { recursive: true });
          await page.screenshot({ path: pngPath, animations: 'disabled' });
          pngToWebp(pngPath, webpPath);
          shots.push({
            id: `${slug(scr.group)}--${slug(scr.screen)}--demo`,
            group: scr.group,
            screen: scr.screen,
            state: 'demo',
            theme,
            device,
            file: rel,
            route: scr.path,
            caption: scr.caption,
            w: vp.width * vp.deviceScaleFactor,
            h: vp.height * vp.deviceScaleFactor,
          });
          process.stdout.write(`✓ ${theme}/${device}${scr.path}\n`);
        }
        await context.close();
      }
    }
  } finally {
    await browser.close();
  }

  const version = JSON.parse(readFileSync(join(ROOT, 'VERSION.json'), 'utf8')).version;
  writeFileSync(
    MANIFEST,
    JSON.stringify({ app: 'AuraCap', version, capturedAt: CAPTURED_AT, accent: ACCENT, schema: 2, shots }, null, 2),
  );
  console.log(`\nAuraCap gallery v3: ${shots.length} shots → ${MANIFEST}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
