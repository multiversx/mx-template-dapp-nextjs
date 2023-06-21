import { defineConfig } from 'cypress';
export default defineConfig({
  e2e: {
    defaultCommandTimeout: 30000,
    responseTimeout: 30000,
    requestTimeout: 30000,
    chromeWebSecurity: false,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    }
  }
});
