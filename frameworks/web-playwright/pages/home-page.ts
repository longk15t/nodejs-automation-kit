import { Page, Locator } from '@shared/fixtures/fixture';
import { BasePage } from './base-page';
import { logger } from '@shared/utils/logger';

export class HomePage extends BasePage {
  readonly navAbout: Locator;
  readonly mainHeading: Locator;

  constructor(page: Page) {
    super(page);
    this.navAbout = page.getByRole('link', {name: 'About'});
    this.mainHeading = page.getByText('Preventative vet care made simple and affordable.');
  }

  async gotoHome() {
    await this.navigateTo('');
  }

  async clickAbout() {
    logger.info('Click About menu item');
    await this.navAbout.click();
    await this.waitForPageLoad();
  }
}
