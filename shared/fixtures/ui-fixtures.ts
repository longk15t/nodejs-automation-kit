import { test as base } from '@playwright/test';
import { HomePage } from '../../frameworks/web-playwright/pages/home-page';
import { AboutPage } from '../../frameworks/web-playwright/pages/about-page';
import { WellnessPlanPage } from '../../frameworks/web-playwright/pages/wellness-plan-page';
import { PetAdvicePage } from '../../frameworks/web-playwright/pages/pet-advice-page';

export const test = base.extend<{
  homePage: HomePage;
  aboutPage: AboutPage;
  wellnessPlanPage: WellnessPlanPage;
  petAdvicePage: PetAdvicePage;
}>({
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },
  aboutPage: async ({ page }, use) => {
    await use(new AboutPage(page));
  },
  wellnessPlanPage: async ({ page }, use) => {
    await use(new WellnessPlanPage(page));
  },
  petAdvicePage: async ({ page }, use) => {
    await use(new PetAdvicePage(page));
  }
});
