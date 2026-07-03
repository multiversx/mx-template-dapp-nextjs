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

    // Scroll the sign message container into viewport
    await page
      .locator(SelectorsEnum.signMessageContainer)
      .scrollIntoViewIfNeeded();

    // Enter message and sign
    await page
      .getByRole('textbox', { name: 'Write message here' })
      .fill(message);
    await page.getByTestId(SelectorsEnum.signMsgButton).click();

    // Switch to the web wallet page
    const walletPage = await TestActions.getPageAndWaitForLoad(
      page.context(),
      OriginPageEnum.multiversxWallet
    );
    await expect(walletPage).toHaveURL(UrlRegex.multiversxWallet, {
      timeout: WALLET_URL_TIMEOUT_MS
    });

    // Confirm with the keystore and sign the message in the web wallet
    await TestActions.confirmWalletTransaction(walletPage, keystoreConfig);
    await walletPage.getByTestId(SelectorsEnum.signMsgWalletButton).click();

    // Switch back to the template dashboard
    const templatePage = await TestActions.getPageAndWaitForLoad(
      page.context(),
      OriginPageEnum.templateDashboard
    );

    // The encoded message is the hex of the input and is independent of the
    // signing key, so it is a stable assertion for the sign-success output.
    await expect(templatePage.getByText('0x6d7678')).toBeVisible();
  });
});
