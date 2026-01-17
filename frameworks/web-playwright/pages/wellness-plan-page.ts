import { Page, Locator } from '@playwright/test';
import { BasePage } from './base-page';
import { env } from '@shared/config/env';
import logger from '@shared/utils/logger';

export class WellnessPlanPage extends BasePage {
  readonly joinPlanButton: Locator;
  readonly mainHeading: Locator;

  constructor(page: Page) {
    super(page);
    this.joinPlanButton = this.page.getByRole('button', { name: 'Join Wellness Plan' });
    this.mainHeading = this.page.getByText('Peace of mind and real savings');
  }

  async goToWellnessPlanPage(): Promise<void> {
    logger.info('Navigate to Wellness Plan page');
    await this.navigateTo(`${env.baseUrl}/wellness-plan`);
  }
}
