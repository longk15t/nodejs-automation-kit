import { Page, Locator } from '@shared/fixtures/fixture';
import { BasePage } from './base-page';
import { logger } from '@shared/utils/logger';

export class HomePage extends BasePage {
  readonly mainHeading: Locator;

  constructor(page: Page) {
    super(page);
    this.mainHeading = this.page.getByText('Preventative vet care made simple and affordable.');
  }

  async gotoHome(): Promise<void> {
    logger.info('Navigate to home page');
    await this.navigateTo('');
  }
}
