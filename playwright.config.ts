import { defineConfig, devices } from '@playwright/test';
import { TEST_CONFIG } from './tests/config';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  globalSetup: './tests/support/template/globalSetup.ts',
  /* timeout for each test */
  timeout: TEST_CONFIG.timeout,
  /* timeout for locators */
  expect: { timeout: TEST_CONFIG.expectTimeout },
  /* directory where the tests are located */
  testDir: './tests',
  /* pattern to match the tests */
  testMatch: '**/*.spec.ts',

  /* Run tests in files in parallel */
  fullyParallel: TEST_CONFIG.fullyParallel,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: TEST_CONFIG.retries,
  /* Parallel tests on CI only. */
  workers: TEST_CONFIG.workers,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: 'https://localhost:3002',
    ignoreHTTPSErrors: true,

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
    // Default to headless mode; will be overridden by the environment variable
    headless: true,

    /* Capture screenshot on test failure */
    screenshot: 'only-on-failure',

    /* Record video on any failure */
    video: 'retain-on-failure'
  },

  /* Configure projects for major browsers */
  projects: [
    {
      use: {
        ...devices['Desktop Chrome'],
        launchOptions: {
          args: [
            '--start-maximized',
            '--disable-web-security',
            '--disable-features=VizDisplayCompositor'
          ]
        }
      }
    }
  ],
  webServer: {
    // In CI, serve the already-built app (fast, deterministic). Locally, fall
    // back to the dev server (reused if one is already running).
    command: process.env.CI ? 'pnpm preview:ci' : 'pnpm start:devnet',
    // Wait on the raw Next server, NOT the HTTPS proxy: local-ssl-proxy binds
    // instantly and crashes if it receives a request before Next is listening
    // (ECONNREFUSED), which would make the webServer "exit early". Polling Next
    // directly keeps the proxy untouched until the app is actually up. Tests
    // still run against the HTTPS `baseURL` (https://localhost:3002).
    url: 'http://localhost:3000',
    timeout: 120 * 1000,
    reuseExistingServer: !process.env.CI,
    stdout: 'pipe',
    stderr: 'pipe',
    ignoreHTTPSErrors: true
  }
});
