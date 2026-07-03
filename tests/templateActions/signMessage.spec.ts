import { expect, test } from '@playwright/test';
import * as TestActions from '../support/template';
import {
  OriginPageEnum,
  SelectorsEnum,
  TestDataEnums,
  UrlRegex
} from '../support/template/testdata';
import { WALLET_URL_TIMEOUT_MS } from '../config';

const keystoreConfig = {
  keystore: TestDataEnums.keystoreFilePath1,
  password: TestDataEnums.keystorePassword1
};

test.describe('Sign Message', () => {
  test.beforeEach(async ({ page }) => {
    await TestActions.navigateToConnectWallet(page);
    await TestActions.connectWebWallet({ page, loginMethod: keystoreConfig });
    await TestActions.checkConnectionToWallet(
      page,
      TestDataEnums.keystoreWalletAddress1
    );
  });

  test('should complete full message signing flow', async ({ page }) => {
    const message = 'mvx';

    // Scroll to the sign message container into viewport
    await page
      .locator(SelectorsEnum.signMessageContainer)
      .scrollIntoViewIfNeeded();

    // Enter message
    await page
      .getByRole('textbox', { name: 'Write message here' })
      .fill(message);

    // Click on Sign button
    await page.getByTestId(SelectorsEnum.signMsgButton).click();

    // Switch to web wallet page
    const walletPage = await TestActions.getPageAndWaitForLoad(
      page.context(),
      OriginPageEnum.multiversxWallet
    );

    // Verify wallet page opened
    await expect(walletPage).toHaveURL(UrlRegex.multiversxWallet, {
      timeout: WALLET_URL_TIMEOUT_MS
    });

    // Sign transaction by confirming with keystore in the web wallet
    await TestActions.confirmWalletTransaction(walletPage, keystoreConfig);

    // Click on Sign button to confirm the sign message in the web wallet
    await walletPage.getByTestId(SelectorsEnum.signMsgWalletButton).click();

    // Switch to template dashboard page
    const templatePage = await TestActions.getPageAndWaitForLoad(
      page.context(),
      OriginPageEnum.templateDashboard
    );

    // Verify the decoded message contains the expected message
    const decodedMessage =
      'cb0f0cbcf70e54e0e79fb2c1a48e01883e15fb3bb686773a7bb8b26ebb69447de75dd8c8645e9af1';
    await expect(templatePage.getByText(decodedMessage)).toBeVisible();
  });
});
