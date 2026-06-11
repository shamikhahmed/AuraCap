import { test, expect } from '@playwright/test';

async function enterApp(page: import('@playwright/test').Page) {
  await page.getByRole('button', { name: /Launch Ecosystem Studio/i }).click();
  const skip = page.getByRole('button', { name: 'Skip' });
  if (await skip.isVisible({ timeout: 2000 }).catch(() => false)) {
    await skip.click();
  }
  await expect(page.getByText('Control Center')).toBeVisible({ timeout: 15_000 });
}

test.describe('AuraCap PWA', () => {
  test('welcome → demo → dashboard shows scores', async ({ page }) => {
    await page.goto('./');
    await expect(page.getByText('Every Device. Perfected.')).toBeVisible();
    await page.getByRole('button', { name: /Try with sample wardrobe/i }).click();

    await expect(page.getByText("You're viewing a demo")).toBeVisible({ timeout: 15_000 });
    await expect(page.getByText('Aura Score')).toBeVisible({ timeout: 10_000 });

    const scoreRing = page.locator('.font-extrabold.font-display').first();
    await expect(scoreRing).toBeVisible();
    const scoreText = await scoreRing.textContent();
    expect(Number(scoreText)).toBeGreaterThan(0);
  });

  test('import guide tab is accessible', async ({ page }) => {
    await page.goto('./');
    await enterApp(page);

    await page.getByRole('link', { name: 'Import Apps' }).first().click();
    await page.getByRole('button', { name: /How to Import/i }).click();
    await expect(page.getByText('iPhone — Shortcuts App Method')).toBeVisible();
    await expect(page.getByText('Mac — Terminal Method')).toBeVisible();
  });

  test('import flow adds apps', async ({ page }) => {
    await page.goto('./');
    await enterApp(page);

    await page.getByRole('link', { name: 'Import Apps' }).first().click();
    await expect(page.getByRole('heading', { name: 'Import Your Apps' })).toBeVisible();

    await page.locator('textarea').first().fill('Instagram\nTikTok\nNotion\nBinance');
    await page.getByRole('button', { name: /Import & Analyze/i }).click();

    await expect(page.getByText(/Imported from/i)).toBeVisible({ timeout: 10_000 });
    await expect(page.getByRole('button', { name: /Instagram/ })).toBeVisible();
    await expect(page.getByText('4', { exact: true }).first()).toBeVisible();
  });
});
