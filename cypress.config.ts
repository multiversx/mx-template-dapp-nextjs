import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: 'https://localhost:3002/',
    defaultCommandTimeout: 20000,
    responseTimeout: 20000,
    requestTimeout: 20000,
    chromeWebSecurity: false,
    screenshotOnRunFailure: true,
    video: true,
    testIsolation: false
  }
});
