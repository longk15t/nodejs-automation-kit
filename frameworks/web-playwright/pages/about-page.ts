import { Page, Locator } from '@shared/fixtures/fixture';
import { BasePage } from './base-page';
import logger from '@shared/utils/logger';
import { env } from '@shared/config/env';

export class AboutPage extends BasePage {
  readonly header: Locator;
  readonly sectionOurServices: Locator;

  constructor(page: Page) {
    super(page);
    this.header = this.page.getByRole('heading', { name: 'About' });
    this.sectionOurServices = this.page.locator(
      'text=Providing the best care for your pet should be as easy as loving them!',
    );
  }

  async gotoAbout(): Promise<void> {
    logger.info('Navigate to About page');
    await this.navigateTo(`${env.baseUrl}/about/`);
  }
}
