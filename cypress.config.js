const { defineConfig } = require('cypress')

module.exports = defineConfig({
  allowCypressEnv: false,

  e2e: {
    baseUrl: 'https://guest:welcome2qauto@qauto.forstudy.space',
    // defaultCommandTimeout: 10000,
    video: false,
    screenshotOnRunFailure: false,
    // retries: {
    //   runMode: 2,
    //   openMode: 2,
    // },
  },
})
