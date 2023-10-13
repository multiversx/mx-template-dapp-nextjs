import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000/',
    defaultCommandTimeout: 30000,
    responseTimeout: 70000,
    requestTimeout: 70000,
    chromeWebSecurity: false,
    screenshotOnRunFailure: false,
    video: false,
    testIsolation: false
  }
});
