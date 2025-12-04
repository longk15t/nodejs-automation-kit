const { config } = require("./wdio.share.conf");

const path = require("path");
const iosAppPath = path.join(process.cwd(), "app/ios/MyRNDemoApp.app");

/**
 * Run Configuration
 */
(config.port = 4723),
  /**
   * Specs
   */
  (config.specs = ["../tests/ios-*.ts"]);

/**
 * Capabilities
 */

config.capabilities = [
  {
    platformName: "IOS",
    "appium:deviceName": "iPhone 15 Pro Max",
    "appium:platformVersion": "17.5",
    "appium:automationName": "XCUITest",
    "appium:app": iosAppPath,
    "appium:showXcodeLog": true,
    "appium:usePrebuiltWDA": false,
    "appium:useNewWDA": true,
  },

];

  // Test runner services
  config.services = ["appium"],

exports.config = config;
