import { test, expect } from "@playwright/test";

test.describe("Smoke tests", () => {
  test("homepage loads and has correct title", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/The Helpful Dev/i);
  });

  test("homepage hero heading is visible", async ({ page }) => {
    await page.goto("/");
    const h1 = page.getByRole("heading", { level: 1 });
    await expect(h1).toBeVisible();
  });

  test("skip-to-content link exists and is accessible", async ({ page }) => {
    await page.goto("/");
    const skipLink = page.getByRole("link", { name: /skip to main content/i });
    await expect(skipLink).toBeAttached(); // exists in DOM
    await expect(skipLink).not.toBeInViewport(); // visually hidden (sr-only) until focused
  });

  test("newsletter form has accessible email input", async ({ page }) => {
    await page.goto("/");
    // At least one email input with associated label
    const emailInput = page.getByLabel(/email address/i).first();
    await expect(emailInput).toBeVisible();
  });

  test("fasting app page loads", async ({ page }) => {
    await page.goto("/app/fasting");
    await expect(page).toHaveTitle(/Fasting/i);
    const h1 = page.getByRole("heading", { level: 1 });
    await expect(h1).toBeVisible();
  });

  test("potty panda app page loads", async ({ page }) => {
    await page.goto("/app/potty-panda");
    await expect(page).toHaveTitle(/Potty Panda/i);
  });

  test("unvail app page loads", async ({ page }) => {
    await page.goto("/app/unvail");
    await expect(page).toHaveTitle(/unvAIl/i);
  });

  test("timeagotchi app page loads", async ({ page }) => {
    await page.goto("/app/timeagotchi");
    await expect(page).toHaveTitle(/Timeagotchi/i);
  });

  test("privacy page loads and is accessible", async ({ page }) => {
    await page.goto("/privacy");
    await expect(page).toHaveTitle(/Privacy/i);
  });

  test("404 page renders for unknown routes", async ({ page }) => {
    const response = await page.goto("/this-page-does-not-exist");
    expect(response?.status()).toBe(404);
    await expect(page.getByText("404")).toBeVisible();
  });

  test("robots.txt is served", async ({ page }) => {
    const response = await page.goto("/robots.txt");
    expect(response?.status()).toBe(200);
    const body = await response?.text();
    expect(body).toContain("sitemap");
  });

  test("sitemap.xml is served", async ({ page }) => {
    const response = await page.goto("/sitemap.xml");
    expect(response?.status()).toBe(200);
  });

  test("HSTS header is present", async ({ page }) => {
    const response = await page.goto("/");
    const hsts = response?.headers()["strict-transport-security"];
    expect(hsts).toBeDefined();
    expect(hsts).toContain("max-age");
  });
});
