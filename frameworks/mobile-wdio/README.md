# Run test on Android

`npm run wdio:android`

# Run test on IOS

`npm run wdio:ios`

# Eslint config

`https://www.npmjs.com/package/eslint-plugin-wdio`

# Run on browserstack

`npx wdio config/android-wdio.bs.conf.js`

Link result: https://automation.browserstack.com/builds/fczrjts35zyi8ku0qexearsdu4uu2tzvejvuhpzy

# Run one test

`npx wdio config/android-wdio.bs.conf.js --spec test/screenObjects/android/login.screen.js`

# Generate allure report

Clear the report first:
`npx allure generate allure-results --clean`

==> Because we have add to config on complete so that don't need clear the report fist

Run report
`npx allure open`
