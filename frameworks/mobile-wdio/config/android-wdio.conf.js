const { config } = require("./wdio.share.conf");

const path = require("path");
const androidAppPath = path.join(
  process.cwd(),
  "app/Android-MyDemoAppRN.1.3.0.build-244.apk"
);

/**
 * Run Configuration
 */

config.port = 4723,
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
    "appium:deviceName": "emulator-5554",
    "appium:platformVersion": "16",
    "appium:automationName": "UIAutomator2",
    "appium:app": androidAppPath,
  },
   
];
 // Test runner services
config.services = ["appium"],
exports.config = config;
