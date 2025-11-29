import { test, expect } from "@playwright/test";

test("Authenticated request", async ({ request }) => {
  const token = "dummy-token";

  const response = await request.get("/profile", {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  expect(response.status()).toBe(200);
});