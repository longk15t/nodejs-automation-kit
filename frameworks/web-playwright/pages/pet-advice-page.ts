import { Page, Locator } from '@shared/fixtures/fixture';
import { BasePage } from './base-page';
import { logger } from '@shared/utils/logger';
import { env } from '@shared/config/env';

export class PetAdvicePage extends BasePage {
  readonly header: Locator;
  readonly dogAdviceButton: Locator;

  readonly catAdviceButton: Locator;

  constructor(page: Page) {
    super(page);
    this.header = this.page.getByRole('heading', { name: 'Pet Advice' });
    this.dogAdviceButton = this.page.getByRole('link', { name: 'Dog Advice' });
    this.catAdviceButton = this.page.getByRole('link', { name: 'Cat Advice' });
  }

  async gotoPetAdvicePage(): Promise<void> {
    logger.info('Navigate to Pet Advice page');
    await this.navigateTo(`${env.baseUrl}/pet-advice/`);
  }
}
