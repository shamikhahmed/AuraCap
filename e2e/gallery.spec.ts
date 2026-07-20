import { test, expect, type Page } from '@playwright/test';
import { mkdirSync, writeFileSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const GALLERY_DIR = join(process.cwd(), 'docs', 'screenshots', 'gallery');

const SCREENS = [
  { route: './dashboard', slug: 'dashboard', label: 'Dashboard' },
  { route: './dna', slug: 'dna', label: 'Digital DNA' },
  { route: './import', slug: 'import', label: 'Import Apps' },
  { route: './import-guide', slug: 'import-guide', label: 'Import Guide' },
  { route: './apps', slug: 'apps', label: 'App Library' },
  { route: './organizer', slug: 'organizer', label: 'Smart Organizer' },
  { route: './designer', slug: 'designer', label: 'Smart Assistant' },
  { route: './wallpaper', slug: 'wallpaper', label: 'Wallpapers' },
  { route: './lockscreen', slug: 'lockscreen', label: 'Lock Screen' },
  { route: './widgets', slug: 'widgets', label: 'Widget Lab' },
  { route: './shortcuts', slug: 'shortcuts', label: 'Shortcuts' },
  { route: './cleanse', slug: 'cleanse', label: 'Digital Cleanse' },
  { route: './routine', slug: 'routine', label: 'Daily Routine' },
  { route: './profiles', slug: 'profiles', label: 'Profiles' },
  { route: './settings', slug: 'settings', label: 'Settings' },
] as const;

const VIEWPORTS = {
  mobile: { width: 393, height: 852 },
  desktop: { width: 1280, height: 800 },
} as const;

type ManifestShot = { file: string; label: string; route: string; viewport: string };

function appendManifest(shots: ManifestShot[]) {
  const manifestPath = join(GALLERY_DIR, 'gallery-manifest.json');
  let existing: { shots: ManifestShot[] } = { shots: [] };
  try {
    existing = JSON.parse(readFileSync(manifestPath, 'utf8'));
  } catch {
    /* first writer */
  }
  const merged = [...existing.shots.filter((s) => !shots.some((n) => n.file === s.file)), ...shots];
  merged.sort((a, b) => a.file.localeCompare(b.file));
  const version = JSON.parse(readFileSync(join(process.cwd(), 'VERSION.json'), 'utf8')).version;
  writeFileSync(
    manifestPath,
    JSON.stringify({ app: 'AuraCap', version, generated: new Date().toISOString(), shots: merged }, null, 2),
  );
}

async function captureAll(page: Page, viewport: keyof typeof VIEWPORTS) {
  const shots: ManifestShot[] = [];

  // Welcome screen first — demo entry navigates past it
  await page.goto('./');
  await expect(page.getByText('Your Apple DNA.')).toBeVisible({ timeout: 15_000 });
  const welcomeFile = `${viewport}-00-welcome.png`;
  await page.screenshot({ path: join(GALLERY_DIR, welcomeFile), fullPage: true });
  shots.push({ file: welcomeFile, label: 'Welcome', route: '/', viewport });

  // Enter demo mode
  await page.goto('./?demo=1');
  await expect(page.getByText('Aura Score')).toBeVisible({ timeout: 20_000 });

  for (const [i, screen] of SCREENS.entries()) {
    await page.goto(screen.route);
    await expect(page.locator('#root > *').first()).toBeVisible({ timeout: 15_000 });
    await page.waitForTimeout(600); // settle animations
    const file = `${viewport}-${String(i + 1).padStart(2, '0')}-${screen.slug}.png`;
    await page.screenshot({ path: join(GALLERY_DIR, file), fullPage: true });
    shots.push({ file, label: screen.label, route: screen.route.slice(1), viewport });
  }

  appendManifest(shots);
}

for (const viewport of ['mobile', 'desktop'] as const) {
  test.describe(`Screen gallery — ${viewport}`, () => {
    test.skip(!process.env.CAPTURE_GALLERY, 'Gallery capture runs via `npm run gallery` (CAPTURE_GALLERY=1)');

    test.use({
      viewport: VIEWPORTS[viewport],
      deviceScaleFactor: 2,
      isMobile: viewport === 'mobile',
      hasTouch: viewport === 'mobile',
    });

    test.beforeAll(() => {
      mkdirSync(GALLERY_DIR, { recursive: true });
    });

    test(`capture ${SCREENS.length + 1} ${viewport} screens`, async ({ page }) => {
      await captureAll(page, viewport);
    });
  });
}
