import { test, expect } from '@playwright/test';

async function enterApp(page: import('@playwright/test').Page) {
  await page.getByRole('button', { name: /Open AuraCap/i }).click();
  const skip = page.getByRole('button', { name: 'Skip' });
  if (await skip.isVisible({ timeout: 2000 }).catch(() => false)) {
    await skip.click();
  }
  await expect(page.getByRole('heading', { name: 'Overview' })).toBeVisible({ timeout: 15_000 });
}

test.describe('AuraCap PWA', () => {
  test('welcome → sample data → overview shows Aura Score', async ({ page }) => {
    await page.goto('./');
    await expect(page.getByRole('heading', { name: 'AuraCap' })).toBeVisible();
    await page.getByRole('button', { name: /Try sample data/i }).click();

    await expect(page.getByText("You're viewing sample data")).toBeVisible({ timeout: 15_000 });
    await expect(page.getByText('Use my apps')).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Overview' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Aura Score' })).toBeVisible({ timeout: 10_000 });
    await expect(page.getByText('LIVE')).toHaveCount(0);

    const scoreRing = page.locator('.font-extrabold.font-display').first();
    await expect(scoreRing).toBeVisible();
    const scoreText = await scoreRing.textContent();
    expect(Number(scoreText)).toBeGreaterThan(0);
  });

  test('device names normalize in header', async ({ page }) => {
    await page.goto('./');
    await page.getByRole('button', { name: /Try sample data/i }).click();
    await expect(page.getByRole('heading', { name: 'Overview' })).toBeVisible({ timeout: 15_000 });
    await expect(page.getByRole('button', { name: /Device: iPhone/i })).toBeVisible();
    await expect(page.getByText(/iPhone 16 Pro Max/i).first()).toBeVisible();
  });

  test('import guide tab is accessible', async ({ page }) => {
    await page.goto('./');
    await enterApp(page);

    await page.getByRole('link', { name: 'Import Apps' }).first().click();
    await page.getByRole('button', { name: /How to Import/i }).click();
    await expect(page.getByText('iPhone — Shortcuts App Method')).toBeVisible();
    await expect(page.getByText('Mac — Terminal Method')).toBeVisible();
  });

  test('organizer page has Mac Dock guide download', async ({ page }) => {
    await page.goto('./');
    await page.getByRole('button', { name: /Try sample data/i }).click();
    await expect(page.getByRole('heading', { name: 'Aura Score' })).toBeVisible({ timeout: 15_000 });

    await page.getByRole('link', { name: 'Organizer' }).first().click();
    await expect(page.getByRole('heading', { name: 'Smart Organizer' })).toBeVisible({ timeout: 10_000 });
    await expect(page.getByRole('button', { name: /Mac Dock Guide/i })).toBeVisible();
  });

  test('import flow adds apps', async ({ page }) => {
    await page.goto('./');
    await enterApp(page);

    await page.getByRole('link', { name: /Import Apps/i }).first().click();
    await expect(page.getByRole('heading', { name: /Import your apps/i })).toBeVisible();
    await expect(page.getByText(/Paste or type your apps/i).first()).toBeVisible();

    await page.locator('textarea').first().fill('Instagram\nTikTok\nNotion\nBinance');
    await page.getByRole('button', { name: /Import & Analyze/i }).click();

    await expect(page.getByText(/Imported from/i)).toBeVisible({ timeout: 10_000 });
    await expect(page.getByRole('button', { name: /Instagram/ })).toBeVisible();
    await expect(page.getByText('4', { exact: true }).first()).toBeVisible();
  });

  test('profiles page merges snapshots tab and history redirect', async ({ page }) => {
    await page.goto('./');
    await enterApp(page);

    await page.getByRole('link', { name: /Profiles & Snapshots/i }).first().click();
    await expect(page.getByRole('heading', { name: 'Multi-Profile System' })).toBeVisible({ timeout: 10_000 });
    await page.getByRole('button', { name: 'Snapshots' }).click();
    await expect(page.getByRole('heading', { name: 'Layout Snapshots' })).toBeVisible();

    await page.goto('./history');
    await expect(page).toHaveURL(/tab=snapshots/);
    await expect(page.getByRole('heading', { name: 'Layout Snapshots' })).toBeVisible({ timeout: 10_000 });
  });

  test('settings shows Apple disclaimer and theme control', async ({ page }) => {
    await page.goto('./');
    await enterApp(page);
    await page.getByRole('link', { name: 'Settings' }).first().click();
    await expect(page.getByRole('heading', { name: 'Settings' })).toBeVisible({ timeout: 10_000 });
    await expect(page.getByText(/Apple, iPhone, iPad and Mac are trademarks/i)).toBeVisible();
    await expect(page.getByRole('button', { name: /Dark/i })).toBeVisible();
  });

  test('skip link is visually hidden until focused', async ({ page }) => {
    await page.goto('./');
    const skip = page.locator('.cap-skip-link');
    await expect(skip).toBeAttached();
    const box = await skip.boundingBox();
    // Off-screen or above viewport when not focused
    expect(!box || box.y < 0 || box.y + box.height < 8).toBeTruthy();
  });
});
