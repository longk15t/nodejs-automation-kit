import { test, expect } from '@shared/fixtures/fixture';

test.describe('BFP home page test suites', () => {
  test('should load home page and display main heading', 
    { tag: '@smoke' },
    async ({ homePage }) => {
    await homePage.gotoHome();
    await expect(homePage.mainHeading).toBeVisible();
  });
});
