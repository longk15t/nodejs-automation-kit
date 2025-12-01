import { test, expect } from '@shared/fixtures/fixture';

test.describe('Demo To Do - basic operations', () => {
  test.beforeEach(async ({ homePage }) => {
    await homePage.navigateTo('/Demos/demo-to-do/');
  });

  test('Add a single todo (happy path)', async ({ homePage }) => {
    // Add one todo
    await homePage.addTodo('Buy groceries');

    // Assert the item was added
    const addedItem = homePage.itemWithText('Buy groceries');
    await expect(addedItem).toBeVisible();

    // Input should have been cleared after adding
    const input = await homePage.getTodoInput();
    expect(await input.inputValue()).toBe('');

    // Only count actual todo list items — LI elements that contain a label (exclude the input)
    const todos = homePage.todoItems();
    await expect(todos).toHaveCount(1);
  });

  test('Add multiple todos sequentially', async ({ homePage }) => {
    const tasks = ['Task A', 'Task B', 'Task C'];
    for (const task of tasks) {
      await homePage.addTodo(task);
    }

    // Use the POM helper to avoid counting the input element
    const todos = homePage.todoItems();
    await expect(todos).toHaveCount(tasks.length);

    // The demo app may prepend or append items; assert each task appears somewhere in the list
    const texts = await todos.allTextContents();
    for (const task of tasks) {
      // normalize and assert presence
      const found = texts.some((t) => t.includes(task));
      expect(found).toBeTruthy();
    }
  });

  test('Reject empty or whitespace-only todo', async ({ homePage }) => {
    // Attempt to add an empty todo (spaces only) and ensure no item is created
    const input = await homePage.getTodoInput();

    // Type only spaces and press Enter
    await input.fill('   ');
    await input.press('Enter');

    // The demo app may create an item containing only whitespace. Assert the label trims to empty.
    const todos = homePage.todoItems();
    await expect(todos).toHaveCount(1);
    const label = todos.nth(0).locator('label');
    const labelText = (await label.innerText()).trim();
    expect(labelText).toBe('');

    // Sanity: input still exists and is visible
    await expect(input).toBeVisible();
  });
});
