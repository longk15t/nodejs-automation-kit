# Setup

- Connected real/simulator/emulator device
- `npm install`
- Java JRE (latest version)

# Run test

`npm run wdio:android`

`npm run wdio:ios`

`npx wdio config/android-wdio.bs.conf.js`
Link result: https://automation.browserstack.com/builds/fczrjts35zyi8ku0qexearsdu4uu2tzvejvuhpzy

`npx wdio config/android-wdio.bs.conf.js --spec test/screenObjects/android/login.screen.js`

# Eslint config

`https://www.npmjs.com/package/eslint-plugin-wdio`

# Generate allure report

Clear the report first:
`npx allure generate allure-results --clean`

Run report
`npx allure open`
