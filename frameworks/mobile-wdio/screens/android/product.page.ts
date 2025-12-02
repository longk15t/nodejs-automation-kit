import BasePage from "../base-page";


class ProductsScreen extends BasePage {
  get openMenu() {
    return $("~open menu");
  }

  get loginButton() {
    return $('//*[@text="Log In"]');
  }

  async openLoginMenu() {
    await this.openMenu.click();
    await this.loginButton.click();
  }

  get productsLabel() {
    const selector =
      'new UiSelector().text("Products").className("android.widget.TextView")';
    return $(`android=${selector}`);
  }

  async verifyProductsText(expectedText = "Products") {
    await expect(this.productsLabel).toHaveText(expectedText);
  }
}

export default new ProductsScreen();
