import { test, expect } from '@shared/fixtures/fixture';
import wellnessContent from '../data/wellness-plan-content.json';

test.describe('CMS Content Validation', () => {
  test('should validate all membership items in Wellness Plan', async ({ wellnessPlanPage }) => {
    await wellnessPlanPage.goToWellnessPlanPage();
    await expect(wellnessPlanPage.mainHeading).toBeVisible();
    for (const menuText of wellnessContent.membershipItems) {
      await expect(wellnessPlanPage.page.getByRole('heading', { name: menuText })).toBeVisible();
    }
  });
});
