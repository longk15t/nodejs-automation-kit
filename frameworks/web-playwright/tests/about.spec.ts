import { test, expect } from '@shared/fixtures/fixture';

test.describe('About page', () => {
  test.beforeEach(async ({ aboutPage }) => {
    await aboutPage.gotoAbout();
  });

  test('should load about page and display header', { tag: '@regression' }, async ({ aboutPage }) => {
    await expect(aboutPage.header).toBeVisible();
    expect(await aboutPage.getTitle()).toBe('About Us - Best for Pet in Australia');
  });

  test('should display Our Services section', { tag: '@smoke' }, async ({ aboutPage }) => {
    await expect(aboutPage.sectionOurServices).toBeVisible();
  });

  test('Check the Our service section heading', { tag: '@regression' }, async ({ aboutPage }) => {
    await expect(aboutPage.sectionOurServices).toHaveText(
      'Providing the best care for your pet should be as easy as loving them!',
      { timeout: 1000 },
    );
  });
});
