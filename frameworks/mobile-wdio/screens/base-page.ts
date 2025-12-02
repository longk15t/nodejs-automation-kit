export default class BasePage {
  async waitForElementDisplayed(element: any, timeout = 10000) {
    await element.waitForDisplayed({ timeout });
  }

  async waitForElementExist(element: any, timeout = 10000) {
    await element.waitForExist({ timeout });
  }
  async waitForElementClickable(element: any, timeout = 10000) {
    await element.waitForClickable({ timeout });
  }

  async clickElement(element: any) {
    await element.click();
  }

  async setValue(element: any, value: string) {
    await this.waitForElementDisplayed(element);
    await element.clearValue();
    await element.setValue(value);
  }

  async getText(element: any) {
    await this.waitForElementDisplayed(element);
    return await element.getText();
  }

  async isElementDisplayed(element: any) {
    try {
      return await element.isDisplayed();
    } catch (error) {
      return false;
    }
  }

  async isElementExist(element: any) {
    try {
      return await element.isExisting();
    } catch (error) {
      return false;
    }
  }

  async scrollToElement(element: any) {
    await element.scrollIntoView();
  }

  async swipe(direction: string) {
    const { width, height } = await driver.getWindowSize();
    const centerX = width / 2;
    const centerY = height / 2;

    let startX, startY, endX, endY;

    switch (direction.toLowerCase()) {
      case "up":
        startX = endX = centerX;
        startY = centerY + 200;
        endY = centerY - 200;
        break;
      case "down":
        startX = endX = centerX;
        startY = centerY - 200;
        endY = centerY + 200;
        break;
      case "left":
        startY = endY = centerY;
        startX = centerX + 200;
        endX = centerX - 200;
        break;
      case "right":
        startY = endY = centerY;
        startX = centerX - 200;
        endX = centerX + 200;
        break;
      default:
        throw new Error(`Invalid swipe direction: ${direction}`);
    }

    await driver.performActions([
      {
        type: "pointer",
        id: "finger1",
        parameters: { pointerType: "touch" },
        actions: [
          { type: "pointerMove", duration: 0, x: startX, y: startY },
          { type: "pointerDown", button: 0 },
          { type: "pause", duration: 100 },
          { type: "pointerMove", duration: 1000, x: endX, y: endY },
          { type: "pointerUp", button: 0 },
        ],
      },
    ]);
    await driver.releaseActions();
  }

  /**
   * Take screenshot
   * @param {string} filename - Screenshot filename
   */
  async takeScreenshot(filename: string) {
    await driver.saveScreenshot(`./screenshots/${filename}.png`);
  }

  async hideKeyboard() {
    try {
      if (await driver.isKeyboardShown()) {
        await driver.hideKeyboard();
      }
    } catch (error) {
      // Keyboard might not be shown, ignore error
    }
  }

  async pause(milliseconds: number) {
    await driver.pause(milliseconds);
  }

  getElementByTextAndClass(text: string, className: string) {
    const selector = `new UiSelector().text("${text}").className("${className}")`;
    return $(`android=${selector}`);
  }

  getElementByText(text: string) {
    const selector = `new UiSelector().text("${text}")`;
    return $(`android=${selector}`);
  }

  getElementByTextContains(text: string) {
    const selector = `new UiSelector().textContains("${text}")`;
    return $(`android=${selector}`);
  }

  getElementByContentDesc(contentDesc: string) {
    return $(`//*[@content-desc="${contentDesc}"]`);
  }

  getElementByResourceId(resourceId: string) {
    return $(`//*[@resource-id="${resourceId}"]`);
  }

  getElementByAccessibilityId(accessibilityId: string) {
    return $(`~${accessibilityId}`);
  }

  async assertElementText(element: any, expectedText: string) {
    await expect(element).toHaveText(expectedText);
  }

  async assertElementDisplayed(element: any) {
    await expect(element).toBeDisplayed();
  }

  async assertElementExists(element: any) {
    await expect(element).toExist();
  }

  async scrollUntilElementVisible(element: any, maxScrolls = 5) {
    for (let i = 0; i < maxScrolls; i++) {
      try {
        if (await this.isElementDisplayed(element)) {
          return;
        }
        await this.swipe("up");
        await this.pause(1000);
      } catch (error) {
        if (i === maxScrolls - 1) {
          throw new Error(`Element not found after ${maxScrolls} scrolls`);
        }
      }
    }
  }
}
