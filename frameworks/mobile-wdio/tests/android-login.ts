import { expect } from '@wdio/globals'
import LoginScreen from "../screens/android/login.page";
import ProductScreen from "../screens/android/product.page";

describe("My Login Demo on Android device", () => {
  beforeEach(async () => {
    await ProductScreen.openLoginMenu();
  });

  it("should not login with invalid credentials", async () => {
    await LoginScreen.enterCredentials("wrongUser", "wrongPassword");
    await LoginScreen.clickLogin();
    await driver.pause(3000);
    await expect(LoginScreen.errorMessage).toHaveText(
      "Provided credentials do not match any user in this service."
    );
  });

  it("should login with invalid credentials", async () => {
    await LoginScreen.enterCredentials("bob@example.com", "10203040");
    await LoginScreen.clickLogin();
    await driver.pause(3000);
    await ProductScreen.verifyProductsText();
  });
});

