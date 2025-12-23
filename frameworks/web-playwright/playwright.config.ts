import { defineConfig, devices } from '@playwright/test';
import { env } from '@shared/config/env';
import * as path from 'path';

const smartReportOutput = path.join(__dirname, 'test-results', 'smart-report.html');

const isCI = !!process.env.CI;
const isHeadless = !process.argv.includes('--headed');

export default defineConfig({
  testDir: './tests',
  expect: { timeout: env.timeout },
  timeout: env.timeout,
  workers: process.env.CI ? 2 : 1,
  fullyParallel: false,
  reporter: [
    ['html', { outputFolder: 'playwright-report', open: 'never' }],
    ['json', { outputFile: 'test-results/results.json' }],
    ['junit', { outputFile: 'test-results/results.xml' }],
    ['playwright-smart-reporter', { outputFile: smartReportOutput }],
  ],
  use: {
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
        viewport: isCI || isHeadless ? { width: 1920, height: 1080 } : null,
        deviceScaleFactor: isCI ? 1 : undefined,
        launchOptions: {
          args: isCI || isHeadless ? [] : ['--start-maximized'],
        },
      },
    },
    {
      name: 'android',
      use: {
        browserName: 'chromium',
        ...devices['Pixel 7'],
        headless: true,
      },
    },
    {
      name: 'ios',
      use: {
        browserName: 'webkit',
        ...devices['iPhone 13'],
        headless: true,
        userAgent:
          'Mozilla/5.0 (iPhone; CPU iPhone OS 13_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.1.1 Mobile/15E148 Safari/604.1',
      },
    },
  ],
});
