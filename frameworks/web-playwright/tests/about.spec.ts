import { test, expect } from '@shared/fixtures/fixture';

test.describe('About page', () => {
  test('should load about page and display header', 
    { tag: '@regression' },
    async ({ aboutPage }) => {
    await aboutPage.gotoAbout();
    await expect(aboutPage.header).toBeVisible();
    expect(await aboutPage.getTitle()).toBe('About Us - Best for Pet in Australia');
  });

  test('should display Our Services section', 
    { tag: '@smoke' },
    async ({ aboutPage }) => {
    await aboutPage.gotoAbout();
    await expect(aboutPage.sectionOurServices).toBeVisible();
  });
});
