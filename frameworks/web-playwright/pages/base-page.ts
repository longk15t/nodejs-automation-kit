import { Page, Locator } from '@playwright/test';
import { env } from '@shared/config/env';
import { logger } from "@shared/utils/logger";

export class BasePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigateTo(url: string): Promise<void> {
    await this.page.goto(url);
    await this.page.evaluate(() => localStorage.clear());
    await this.page.reload();
  }

  async getTitle(): Promise<string> {
    return await this.page.title();
  }

  async waitForPageLoad(): Promise<void> {
    await this.page.waitForLoadState('domcontentloaded');
  }

  getLocatorByText(text: string): Locator {
    return this.page.getByText(text, { exact: true });
  }
}
