import { expect } from '@wdio/globals'
import LoginScreen from "../screens/ios/login.page";
import ProductScreen from "../screens/ios/product.page";

describe("My Login Demo", () => {
  beforeEach(async () => {
    await ProductScreen.openLoginMenu();
  });

  it("should not login with invalid credentials", async () => {
    await LoginScreen.usernameField.setValue("testUser");
    await LoginScreen.passwordField.setValue("testPassword");
    await LoginScreen.loginButton.click();

    await expect(
      $("~Provided credentials do not match any user in this service.")
    ).toHaveText("Provided credentials do not match any user in this service.");
  });

  it("should login with valid credentials", async () => {
    await LoginScreen.usernameField.setValue("bob@example.com");
    await LoginScreen.passwordField.setValue("10203040");
    await LoginScreen.loginButton.click();

    await expect($('//XCUIElementTypeStaticText[@name="Products"]')).toHaveText(
      "Products"
    );
  });
});

