import { test, expect } from '@shared/fixtures/fixture';
import wellnessContent from '../data/wellness-plan-content.json';

test.describe('CMS Content Validation', () => {
  test('should validate all membership items in Wellness Plan page', 
    { tag: '@cms' }, async ({ wellnessPlanPage }) => {
    await wellnessPlanPage.navigateTo(wellnessContent.pageUrl);
    await expect(wellnessPlanPage.mainHeading).toBeVisible();
    await expect(wellnessPlanPage.mainHeading).toHaveText(wellnessContent.mainHeading.expectedText);
    const fontFamily = await wellnessPlanPage.getStyle(wellnessPlanPage.mainHeading, 'font-family');
    const fontSize = await wellnessPlanPage.getStyle(wellnessPlanPage.mainHeading, 'font-size');
    const fontWeight = await wellnessPlanPage.getStyle(wellnessPlanPage.mainHeading, 'font-weight');
    const color = await wellnessPlanPage.getStyle(wellnessPlanPage.mainHeading, 'color');
    expect.soft(fontFamily).toContain(wellnessContent.mainHeading.fontFamily);
    expect.soft(fontSize).toContain(wellnessContent.mainHeading.fontSize);
    expect.soft(fontWeight).toContain(wellnessContent.mainHeading.fontWeight);
    expect.soft(color).toContain(wellnessContent.mainHeading.color);

    for (const menuText of wellnessContent.membershipItems) {
      await expect.soft(wellnessPlanPage.page.getByRole('heading', { name: menuText })).toBeVisible();
    }
  });
});
