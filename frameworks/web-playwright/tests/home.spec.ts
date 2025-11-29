import { test, expect } from "@playwright/test";
import { env } from "@shared/config/env";
import { logger } from "@shared/utils/logger";

test.describe("Web UI - Home Page", () => {
  test("should load home page and verify title", async ({ page }) => {
    logger.info("Navigating to:", env.baseUrl);
    await page.goto(env.baseUrl);
    await expect(page).toHaveTitle(/Home/i);
    logger.info("Home page loaded successfully");
  });
});
