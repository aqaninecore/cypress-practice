const { defineConfig } = require("cypress");

module.exports = defineConfig({
  allowCypressEnv: false,

  e2e: {
    baseUrl: "https://example.cypress.io",
    // defaultCommandTimeout: 10000,
    // video: false,
    // screenshotOnRunFailure: true,
    // retries: {
    //   runMode: 2,
    //   openMode: 2,
    // },
  },
});
