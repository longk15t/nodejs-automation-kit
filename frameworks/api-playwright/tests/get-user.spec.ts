import { test, expect } from "@playwright/test";

test("GET /users → returns users list", async ({ request }) => {
  const response = await request.get("/users");

  expect(response.ok()).toBeTruthy();

  const body = await response.json();
  expect(body.length).toBeGreaterThan(0);
});
