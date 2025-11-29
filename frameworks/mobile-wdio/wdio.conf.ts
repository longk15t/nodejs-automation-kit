export const config = {
  runner: "local",
  framework: "mocha",
  specs: ["./tests/**/*.ts"],

  services: ["appium"],
  appium: { args: { relaxedSecurity: true } },

  capabilities: [
    {
      platformName: "Android",
      "appium:deviceName": "Android Emulator",
      "appium:platformVersion": "12.0",
      "appium:automationName": "UiAutomator2",
      "appium:app": "/path/to/app.apk",
    },
  ],

  mochaOpts: { ui: "bdd", timeout: 60000 },
};
