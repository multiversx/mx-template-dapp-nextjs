import { defineConfig } from 'cypress';

export default defineConfig({
  reporter: 'mochawesome',
  reporterOptions: {
    charts: true,
    reportPageTitle: 'E2E Report',
    inlineAssets: true,
    saveAllAttempts: true,
    mochaFile: 'results/my-test-output-[hash].xml',
    overwrite: false,
    html: false,
    json: true,
    embeddedScreenshots: true
  },

  e2e: {
    baseUrl: 'https://template-dapp-nextjs.multiversx.com/',
    defaultCommandTimeout: 20000,
    responseTimeout: 20000,
    requestTimeout: 20000,
    chromeWebSecurity: false,
    screenshotOnRunFailure: true,
    video: true,
    testIsolation: false
  }
});
