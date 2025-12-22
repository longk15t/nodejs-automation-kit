import { Page, Locator } from '@shared/fixtures/fixture';

export class BasePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigateTo(url: string): Promise<void> {
    await this.page.goto(url);
    await this.waitForPageLoad();
  }

  async getTitle(): Promise<string> {
    return await this.page.title();
  }

  async waitForPageLoad(state?: 'domcontentloaded'): Promise<void> {
    await this.page.waitForLoadState(state);
  }

  getLocatorByText(text: string): Locator {
    return this.page.getByText(text, { exact: true });
  }

  async setViewPort(w: number, h: number): Promise<void> {
    await this.page.setViewportSize({ width: w, height: h });
  }

  async getStyle(element: Locator, property: string): Promise<string> {
    const isElementFound = await element.elementHandle();
    if (!isElementFound) throw new Error(`Element not found for style extraction: ${element}`);

    const value = await element.evaluate((el, prop: string) => {
      return window.getComputedStyle(el).getPropertyValue(prop);
    }, property);

    return value.trim();
  }
}
