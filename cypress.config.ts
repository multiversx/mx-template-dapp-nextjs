export default {
  e2e: {
    baseUrl: 'http://localhost:3000/',
    defaultCommandTimeout: 15000,
    responseTimeout: 15000,
    requestTimeout: 15000,
    chromeWebSecurity: false,
    screenshotOnRunFailure: false,
    video: false,
    videoUploadOnPasses: false,
    testIsolation: false,
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    setupNodeEvents(on, config) {
      // implement node event listeners here
    }
  }
};
