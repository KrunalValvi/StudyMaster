import { test, expect } from '@playwright/test';

test('homepage has title', async ({ page }) => {
  await page.goto('/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/StudyMaster/);
});

test('navigation works', async ({ page }) => {
  await page.goto('/');

  // Should have navigation elements
  await expect(page.locator('nav')).toBeVisible();
});