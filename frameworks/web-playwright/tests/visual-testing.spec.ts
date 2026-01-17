import { test, expect } from '@shared/fixtures/fixture';

const isCI = process.env.CI === 'true';

test.describe('Visual testing on desktop browser', { tag: '@visual' }, () => {
  test.skip(isCI, 'Skipping visual tests on CI environment');

  test.beforeEach(async ({ petAdvicePage }) => {
    await petAdvicePage.gotoPetAdvicePage();
  });

  test('Dog/Cat Advice buttons visual snapshot', async ({ petAdvicePage }) => {
    expect(await petAdvicePage.dogAdviceButton.screenshot()).toMatchSnapshot('dog-advice-button.png', {
      maxDiffPixelRatio: 0.01,
    });
    expect(await petAdvicePage.catAdviceButton.screenshot()).toMatchSnapshot('cat-advice-button.png', {
      maxDiffPixelRatio: 0.01,
    });
  });
});

test.describe('Responsive Visual Testing on mobile viewport', { tag: '@visual' }, () => {
  test.skip(isCI, 'Skipping visual tests on CI environment');
  test('Android device visual snapshot', async ({ petAdvicePage }) => {
    await petAdvicePage.setViewPort(412, 915); // Google pixel 7
    await petAdvicePage.gotoPetAdvicePage();
    expect(await petAdvicePage.page.screenshot({ fullPage: true })).toMatchSnapshot('android-pet-advice-fullpage.png', {
      maxDiffPixelRatio: 0.1,
    });
  });

  test('iOS device visual snapshot', async ({ petAdvicePage }) => {
    await petAdvicePage.setViewPort(390, 844); // iPhone 13
    await petAdvicePage.gotoPetAdvicePage();
    expect(await petAdvicePage.page.screenshot({ fullPage: true })).toMatchSnapshot('ios-pet-advice-fullpage.png', {
      maxDiffPixelRatio: 0.1,
    });
  });
});
