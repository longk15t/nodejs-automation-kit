import BasePage from '../base-page';

class LoginScreen extends BasePage {
  get userName() {
    return $('//*[@content-desc="Username input field"]');
  }

  get password() {
    return $('//android.widget.EditText[@content-desc="Password input field"]');
  }

  get loginButton() {
    return $('//android.view.ViewGroup[@content-desc="Login button"]/android.widget.TextView');
  }

  get errorMessage() {
    return $('//android.view.ViewGroup[@content-desc="generic-error-message"]/android.widget.TextView');
  }

  // Methods for actions
  async enterCredentials(user: string, pass: string) {
    await this.setValue(this.userName, user);
    await this.setValue(this.password, pass);
  }

  async clickLogin() {
    await this.clickElement(this.loginButton);
  }

  async getErrorMessage() {
    return await this.errorMessage.getText();
  }
}

export default new LoginScreen();
