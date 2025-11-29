import { expect } from "expect";
import { env } from "@shared/config/env";
import { logger } from "@shared/utils/logger";

describe("Mobile - Login Flow", () => {
  it("should load login page on mobile browser", async () => {
    logger.info("Opening mobile browser at:", env.baseUrl);

    await browser.url(env.baseUrl + "/login");
    const title = await browser.getTitle();
    expect(title).toMatch(/Login/i);

    logger.info("Login page verified on mobile device");
  });

  it("should submit login form", async () => {
    const emailField = await $("input#email");
    const passField = await $("input#password");
    const submitBtn = await $("button#submit");

    await emailField.setValue("test@test.com");
    await passField.setValue("password123");

    await submitBtn.click();

    const dashboardTitle = await $("h1.dashboard-title");
    expect(await dashboardTitle.getText()).toMatch(/Dashboard/i);

    logger.info("Login successful");
  });
});
