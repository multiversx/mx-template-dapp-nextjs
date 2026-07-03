import { BrowserContext, expect, Page, test } from '@playwright/test';
import { setupMetaMaskWallet } from '../support/metaMask/setupMetaMaskWallet';
import * as TestActions from '../support/template';
import { getPageAndWaitForLoad } from '../support/template/getPageAndWaitForLoad';
import { OriginPageEnum, UrlRegex } from '../support/template/testdata';
import { TEST_CONSTANTS } from '../support/template/constants';

// TODO: Load variables from .env.test.local when running locally
// Get password and address from environment variables
const METAMASK_MNEMONIC = process.env.METAMASK_MNEMONIC || '';
const METAMASK_ADDRESS = process.env.METAMASK_ADDRESS || '';
const METAMASK_PASSWORD = process.env.METAMASK_PASSWORD || '';

// Validate that required environment variables are present
if (!METAMASK_PASSWORD || !METAMASK_ADDRESS || !METAMASK_MNEMONIC) {
  throw new Error(
    'METAMASK_PASSWORD, METAMASK_MNEMONIC, and METAMASK_ADDRESS environment variables are missing. Please set them in .env.test.local for local development or as a GitHub Secret for CI.'
  );
}

test.describe('Connect a wallet', () => {
  let metamaskContext: BrowserContext;
  let extensionId: string;
  let dAppPage: Page;

  test.beforeEach(async () => {
    // Setup MetaMask for each test
    const result = await setupMetaMaskWallet(
      METAMASK_MNEMONIC,
      METAMASK_PASSWORD
    );
    metamaskContext = result.context;
    extensionId = result.extensionId;

    // Create a page in the MetaMask context for the dApp
    dAppPage = await metamaskContext.newPage();
    await TestActions.navigateToConnectWallet(dAppPage);
  });

  test.afterEach(async () => {
    // Close the browser context to free up resources
    if (metamaskContext) {
      try {
        await metamaskContext.close();
        // Wait a moment to ensure the context is fully closed
        // Persistent contexts need a bit more time to release the userDataDir lock
        await new Promise((resolve) => setTimeout(resolve, 2000));
      } catch (error) {
        // Context might already be closed, ignore the error
      }
    }
  });

  test.describe('MetaMask Connection', () => {
    test('should successfully connect with MetaMask', async () => {
      // Use the MetaMask context and dApp page from beforeEach
      const context = metamaskContext;
      const page = dAppPage;

      // Click the connect MetaMask button
      await page.getByTestId('metamask').click();

      // Get the notification page and wait for it to load in the MetaMask context
      const notificationPage = await getPageAndWaitForLoad(
        context,
        `chrome-extension://${extensionId}/notification.html`,
        {
          viewport: { width: 360, height: 592 }
        }
      );

      // Handle MetaMask Snap privacy warning
      await TestActions.handleMetaMaskSnap(
        context,
        extensionId,
        notificationPage
      );

      // Switch to template page
      const templatePage = await getPageAndWaitForLoad(
        context,
        OriginPageEnum.templateDashboard
      );

      // Verify template page opened
      await expect(templatePage).toHaveURL(UrlRegex.templateDashboard, {
        timeout: TEST_CONSTANTS.URL_NAVIGATION_TIMEOUT
      });

      // Verify connection using TestActions helper
      await TestActions.checkConnectionToWallet(page, METAMASK_ADDRESS);
    });
  });
});
