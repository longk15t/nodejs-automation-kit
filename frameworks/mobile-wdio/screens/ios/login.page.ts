import BasePage from '../base-page';
class LoginScreen extends BasePage {
  get usernameField() {
    return $('-ios class chain:**/XCUIElementTypeTextField[`name == "Username input field"`]');
  }

  get passwordField() {
    return $('-ios predicate string:name == "Password input field"');
  }

  get loginButton() {
    return $('//*[@name="Login button"]');
  }
}

export default new LoginScreen();
