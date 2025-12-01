import { defineConfig } from "@playwright/test";
import { env } from "@shared/config/env";

export default defineConfig({
  testDir: "./tests",
  reporter:[
    ['html', { outputFolder: 'playwright-report', open: 'never' }],
    ['json', { outputFile: 'test-results/results.json' }],
    ['junit', { outputFile: 'test-results/results.xml' }]
  ],
  use: {
    headless: true,
    viewport: { width: 1920, height: 1080 },
    baseURL: env.baseUrl,
    actionTimeout: env.timeout,
    navigationTimeout: env.timeout,
    screenshot: 'only-on-failure',
  },
});
