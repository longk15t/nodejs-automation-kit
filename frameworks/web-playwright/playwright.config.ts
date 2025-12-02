import { defineConfig, devices } from "@playwright/test";
import { env } from "@shared/config/env";

export default defineConfig({
  testDir: "./tests",
  expect: { timeout: env.timeout },
  timeout: env.timeout,
  workers: process.env.CI ? 2 : 1, 
  fullyParallel: false,
  reporter:[
    ['html', { outputFolder: 'playwright-report', open: 'never' }],
    ['json', { outputFile: 'test-results/results.json' }],
    ['junit', { outputFile: 'test-results/results.xml' }]
  ],
  use: {
    headless: true,
    baseURL: env.baseUrl,
    actionTimeout: env.timeout,
    navigationTimeout: env.timeout,
    screenshot: 'only-on-failure',
    permissions: ['geolocation'],
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
    {
      name: 'android',
      use: {
        browserName: 'chromium',
        ...devices['Pixel 7'],
      },
    },
    {
      name: 'ios',
      use: {
        browserName: 'webkit',
        ...devices['iPhone 13'],
        userAgent:
          'Mozilla/5.0 (iPhone; CPU iPhone OS 13_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.1.1 Mobile/15E148 Safari/604.1',
      },
    },
  ]
});
