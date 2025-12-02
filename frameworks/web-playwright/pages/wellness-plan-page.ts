import { Page, Locator } from '@playwright/test';
import { BasePage } from './base-page';
import { env } from '@shared/config/env';

export class WellnessPlanPage extends BasePage {
  readonly joinPlanButton: Locator;
  readonly mainHeading: Locator;

  constructor(page: Page) {
    super(page);
    this.joinPlanButton = page.getByRole('button', {name: 'Join Wellness Plan'});
    this.mainHeading = page.getByText('Peace of mind and real savings');
  }

  async goToWellnessPlanPage(): Promise<void> {
    await this.navigateTo(`${env.baseUrl}/wellness-plan`);
    
  }
}
