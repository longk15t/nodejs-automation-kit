import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  use: {
    headless: true,
    viewport: { width: 1920, height: 1080 }
  }
});