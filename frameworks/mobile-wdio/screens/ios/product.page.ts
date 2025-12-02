import BasePage from "../base-page";

class ProductScreen extends BasePage {
    get menuOption() {
        return $('~tab bar option menu');
    }
  
    get loginMenuItem() {
        return $('//XCUIElementTypeOther[@name="menu item log in"]');
    }
  
    async openLoginMenu() {
        await this.menuOption.click();
        await this.loginMenuItem.click();
    }
}

export default new ProductScreen();   