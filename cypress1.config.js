const { defineConfig } = require('cypress')

module.exports = defineConfig({
  //allowCypressEnv: false,
  reporter: 'cypress-mochawesome-reporter',
  e2e: {
    baseUrl: 'https://guest:welcome2qauto@qauto2.forstudy.space',
    video: false,
    screenshotOnRunFailure: false,
    // retries: {
    //   runMode: 2,
    //   openMode: 2,
    // defaultCommandTimeout: 10000,
    // },
    //require('cypress-mochawesome-reporter/plugin')(on),
    //baseUrl: `https://${process.name.USERNAME}:${process.env.PASSWORD}@qauto.forstudy.space`,
  },
})
