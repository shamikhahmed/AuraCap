import { test, expect } from '@playwright/test';

async function enterSample(page: import('@playwright/test').Page) {
  await page.goto('./');
  await page.getByRole('button', { name: /Try sample data/i }).click();
  await expect(page.getByRole('heading', { name: 'Overview' })).toBeVisible({ timeout: 15_000 });
}

test.describe('AuraCap viewport contract', () => {
  test('375px — floating tabs, desktop sidebar hidden', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await enterSample(page);
    await expect(page.locator('.floating-tab-bar')).toBeVisible();
    await expect(page.getByRole('navigation', { name: 'Primary' })).toBeHidden();
  });

  test('1280px — desktop sidebar, floating tabs hidden', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await enterSample(page);
    await expect(page.getByRole('navigation', { name: 'Primary' })).toBeVisible();
    await expect(page.locator('.floating-tab-bar')).toBeHidden();
  });

  test('375px — no content clipped behind floating tabs on primary tabs', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await enterSample(page);
    const labels = ['Home', 'Apps', 'Design', 'Cleanse', 'More'];
    for (const label of labels) {
      await page.locator('.floating-tab-bar').getByRole('link', { name: label }).click();
      await page.waitForTimeout(400);
      const ok = await page.evaluate(() => {
        const main = document.querySelector('main') || document.querySelector('#root');
        const nav = document.querySelector('.floating-tab-bar');
        if (!main || !nav) return false;
        const scroller = document.scrollingElement || document.documentElement;
        scroller.scrollTop = scroller.scrollHeight;
        const last = main.lastElementChild?.lastElementChild || main.lastElementChild;
        if (!last) return true;
        return last.getBoundingClientRect().bottom <= nav.getBoundingClientRect().top + 1;
      });
      expect(ok, `tab ${label}: last element clear of floating tabs`).toBe(true);
    }
  });
});
