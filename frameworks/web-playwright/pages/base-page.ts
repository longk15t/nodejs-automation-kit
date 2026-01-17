import { Page, Locator, expect } from '@shared/fixtures/fixture';
import logger from '@shared/utils/logger';
import path from 'path';

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

  async getUrl(): Promise<string> {
    return this.page.url();
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

  async clickElement(element: Locator, timeout = 120): Promise<void> {
    await this.waitForElementVisible(element, timeout);
    await element.click({ timeout: timeout * 1000 });
  }

  async fillText(element: Locator, value: any): Promise<void> {
    await element.fill(value);
  }

  async clickOption(value: string): Promise<void> {
    await this.clickElement(this.optionByName(value, true));
  }

  async clickRadio(value: string): Promise<void> {
    const radioElement = this.radioByName(value);
    await this.clickElement(radioElement);
    await expect(radioElement).toBeChecked();
  }

  async getElementInnerText(element: Locator): Promise<string | null> {
    await this.waitForElementVisible(element);
    return element.textContent() || null;
  }

  async waitForPageLoaded(state: any = 'domcontentloaded'): Promise<void> {
    await this.page.waitForLoadState(state);
  }

  public optionByName = (radioName: string, exact = false): Locator =>
    this.page.getByRole('option', { name: radioName, exact });

  public radioByName = (radioName: string): Locator => this.page.getByRole('radio', { name: radioName });

  async waitForElementVisible(element: Locator | string, timeout = 180): Promise<void> {
    if (typeof element === 'string') {
      await this.page.waitForSelector(element, {
        state: 'visible',
        timeout: timeout * 1000,
      });
    } else {
      await element.waitFor({ state: 'visible', timeout: timeout * 1000 });
    }
  }

  async waitForElementHidden(element: Locator, timeout = 180): Promise<void> {
    if (typeof element === 'string') {
      await this.page.waitForSelector(element, {
        state: 'hidden',
        timeout: timeout * 1000,
      });
    } else {
      await element.waitFor({ state: 'hidden', timeout: timeout * 1000 });
    }
  }

  async mouseHoverOnWebElement(element: Locator): Promise<void> {
    await element.hover();
  }

  async dragAndDrop(dragElementLocator: string, dropElementLocator: string): Promise<void> {
    await this.page.waitForSelector(dragElementLocator);
    await this.page.waitForSelector(dropElementLocator);
    await this.page.dragAndDrop(dragElementLocator, dropElementLocator);
  }

  async downloadFile(locator: string): Promise<string> {
    const [download] = await Promise.all([this.page.waitForEvent(`download`), this.page.click(locator)]);
    await download.saveAs(path.join(__dirname, `../Downloads`, download.suggestedFilename()));
    return download.suggestedFilename();
  }

  async uploadFile(locator: Locator, fileName: string): Promise<void> {
    const fileChooserPromise = this.page.waitForEvent('filechooser');
    await this.clickElement(locator);
    const fileChooser = await fileChooserPromise;
    await fileChooser.setFiles(path.join(__dirname, fileName));
  }

  async keyPress(locator: string, key: string): Promise<void> {
    await this.page.press(locator, key);
  }

  async selectDropdownOption(locator: string, option: string): Promise<void> {
    await this.page.locator(locator).selectOption(option);
  }

  async checkCheckbox(locator: string): Promise<void> {
    await this.page.locator(locator).check();
    await expect(this.page.locator(locator)).toBeChecked();
  }

  async isCheckboxChecked(locator: string): Promise<boolean> {
    return await this.page.locator(locator).isChecked();
  }

  async uncheckCheckbox(locator: string): Promise<void> {
    await this.page.locator(locator).uncheck();
  }

  async isCheckboxUnchecked(locator: string): Promise<boolean> {
    return !(await this.page.locator(locator).isChecked());
  }

  async getCookie(cookieName: string, url = `${process.env.BASE_URL}`): Promise<string | undefined> {
    const cookie = await this.page.context().cookies(url);
    //console.log("cookie text: " + JSON.stringify(cookie));

    const lengthCookie = cookie.length;
    let valueOfCookie;

    for (let step = 0; step < lengthCookie; step++) {
      if (cookie[step]['name'] === cookieName) {
        valueOfCookie = cookie[step]['value'];
        logger.debug(`Cookie: ${cookieName}=${valueOfCookie}`);
        break;
      }
    }
    return valueOfCookie;
  }

  async setCookie(cookieName: string, cookieValue: string): Promise<void> {
    // Set the cookie
    await this.page.evaluate(
      ({ name, value }) => {
        document.cookie = `${name}=${value}`;
      },
      { name: cookieName, value: cookieValue },
    );

    // Check if the cookie was set
    const cookieSet = await this.page.evaluate((name) => {
      const cookies = document.cookie;
      return cookies.includes(name);
    }, cookieName);

    // Throw an error if the cookie wasn't set
    if (!cookieSet) {
      throw new Error(`Cookie "${cookieName}" was not set.`);
    }
  }

  async focusElement(locator: string): Promise<void> {
    await this.page.locator(locator).focus();
  }

  async closePage(): Promise<void> {
    await this.page.close();
    expect(this.page.isClosed()).toBeTruthy();
  }

  async reloadPage(): Promise<void> {
    await this.page.reload();
    await this.waitForPageLoaded();
  }

  async changeLanguage(language: string): Promise<void> {
    await this.navigateTo(this.page.url().replace('en', language));
  }

  async waitForUrlToBe(expectedUrl: string, timeoutValue = 180): Promise<void> {
    await this.page.waitForURL(expectedUrl, { timeout: timeoutValue * 1000 });
    await this.waitForPageLoaded();
  }

  async verifyDropdownContains(dropdown: Locator, options: string[]): Promise<void> {
    await this.waitForElementVisible(dropdown);
    const actualOptions: Locator[] = await dropdown.locator('option').all();
    expect(actualOptions.length).toBe(options.length + 1); //Need to add the empty placeholder '' option
    actualOptions.filter(async (actualOption: Locator) => {
      const optionLabel = await actualOption.textContent();
      if (optionLabel !== '') {
        expect(options).toContain(optionLabel);
      }
    });
  }
}
