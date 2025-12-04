const { config } = require("./wdio.share.conf");
require('dotenv').config({
  path:'./../.env'
});
/**
 * BrowserStack Credentials
 */
config.user = process.env.BROWSERSTACK_USER;
config.key = process.env.BROWSERSTACK_KEY;


/**
 * Specs
 */
config.specs = ["../tests/android-*.ts"];

/**
 * Capabilities
 */

config.capabilities = [
  {
    platformName: "Android",
    "appium:deviceName": "Samsung Galaxy S22 Ultra",
    "appium:platformVersion": "12.0",
    "appium:automationName": "UIAutomator2",
    "appium:app": "bs://3e07480423bf0b18950bfe09bb18a66340704c7e",
    "appium:autoGrantPermissions": true,
  },
];

// Test runner services
config.services = ["browserstack"],
exports.config = config;
