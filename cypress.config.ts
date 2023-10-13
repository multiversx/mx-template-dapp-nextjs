import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000/',
    defaultCommandTimeout: 20000,
    responseTimeout: 20000,
    requestTimeout: 20000,
    chromeWebSecurity: false,
    screenshotOnRunFailure: false,
    video: false,
    testIsolation: false
  }
});
