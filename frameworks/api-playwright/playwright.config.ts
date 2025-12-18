import { defineConfig } from '@playwright/test';
import { env } from '@shared/config/env';

export default defineConfig({
  testDir: './tests',
  timeout: 60000,
  reporter: [
    ['html', { outputFolder: 'playwright-report', open: 'never' }],
    ['json', { outputFile: 'test-results/results.json' }],
    ['junit', { outputFile: 'test-results/results.xml' }],
  ],
  use: {
    baseURL: env.apiUrl,
    extraHTTPHeaders: {
      'Content-Type': 'application/json',
    },
  },
});
