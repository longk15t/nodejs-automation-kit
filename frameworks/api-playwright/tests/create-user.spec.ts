import { test, expect } from "@playwright/test";

test("POST /users → create user", async ({ request }) => {
  const payload = {
    name: "John Doe",
    email: "john@example.com",
  };

  const response = await request.post("/users", { data: payload });

  expect(response.status()).toBe(201);

  const body = await response.json();
  expect(body.name).toBe(payload.name);
});
