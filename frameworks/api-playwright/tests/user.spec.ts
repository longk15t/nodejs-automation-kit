import { test, expect } from "@playwright/test";
import { ApiClient } from "@shared/helpers/api-client";
import { randomEmail } from "@shared/utils/random";
import { logger } from "@shared/utils/logger";

test.describe("API - User Service", () => {
  let api: ApiClient;

  test.beforeAll(async () => {
    api = new ApiClient();
    await api.init();
  });

  test("should create a user", async () => {
    logger.info("Creating a new user");

    const email = randomEmail();

    const response = await api.post("/users", {
      email,
      password: "password123",
    });

    logger.info("API response:", response);

    expect(response).toHaveProperty("id");
    expect(response.email).toBe(email);
  });

  test.afterAll(async () => {
    await api.dispose();
  });
});
