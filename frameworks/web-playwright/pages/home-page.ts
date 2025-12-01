import { Page, Locator } from '@playwright/test';
import { BasePage } from './base-page';
import { logger } from '@shared/utils/logger';

export class HomePage extends BasePage {
  readonly addTaskButton: Locator;
  itemWithText: (text: string) => Locator;

  constructor(page: Page) {
    super(page);
    this.addTaskButton = this.page.locator('xpath=//input[@id="new-task"]');
    this.itemWithText = (text: string) => this.page.locator('ul li', { hasText: text });
  }

  /**
   * Return the primary todo input. Prefer the placeholder selector common to TodoMVC,
   * fall back to the first visible input on the page.
   */
  async getTodoInput(): Promise<Locator> {
    const byPlaceholder = this.page.locator('input[placeholder="What needs to be done?"]');
    if (await byPlaceholder.count()) return byPlaceholder.first();
    return this.page.locator('input:visible').first();
  }

  /**
   * Convenience: add a todo by typing then pressing Enter.
   */
  async addTodo(text: string) {
    logger.info(`Add todo ${text}`);
    const input = await this.getTodoInput();
    await input.fill(text);
    await input.press('Enter');
  }

  /**
   * Locator for actual todo list items. Returns only LI elements that contain a label
   * which avoids counting the input field that may be inside the list.
   */
  todoItems() {
    return this.page.locator('ul li', { has: this.page.locator('label') });
  }
}
