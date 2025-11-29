import { defineConfig } from "@playwright/test";
import "./../../shared/config/env"; // ensure env is loaded
import { env } from "@shared/config/env";

export default defineConfig({
  testDir: "./tests",
  use: {
    headless: true,
    viewport: { width: 1920, height: 1080 },
    baseURL: env.baseUrl,
    actionTimeout: env.timeout,
    navigationTimeout: env.timeout,
  },
});
