import { defineConfig, devices } from "@playwright/test";
import { env } from "@shared/config/env";

export default defineConfig({
  testDir: "./tests",
  reporter:[
    ['html', { outputFolder: 'playwright-report', open: 'never' }],
    ['json', { outputFile: 'test-results/results.json' }],
    ['junit', { outputFile: 'test-results/results.xml' }]
  ],
  use: {
    baseURL: env.apiUrl,
    extraHTTPHeaders: {
      "Content-Type": "application/json",
    },
  },
  projects: [
    {
      name: 'chrome',
      use: {
        ...devices['Desktop Chrome'],
        viewport:
          process.env.CI === 'true' ? { width: 1920, height: 1080 } : null,
        deviceScaleFactor: process.env.CI === 'true' ? 1 : undefined,
        launchOptions: { args: ['--start-maximized'] },
      },
    },
  ]
});
