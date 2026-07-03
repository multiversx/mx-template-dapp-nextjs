import { expect, test } from '@playwright/test';
import * as TestActions from '../support/template';
import { TEST_CONSTANTS } from '../support/template/constants';
import {
  OriginPageEnum,
  PingPongEnum,
  SelectorsEnum,
  TestDataEnums,
  UrlRegex
} from '../support/template/testdata';
import { WALLET_URL_TIMEOUT_MS } from '../config';

const pemConfig = {
  pem: TestDataEnums.keystoreFilePath5
};

test.describe('Ping & Pong (ABI)', () => {
  // Note: Ping/Pong buttons have a 3-minute cooldown period after being clicked

  test.beforeEach(async ({ page }) => {
    await TestActions.navigateToConnectWallet(page);
    await TestActions.connectWebWallet({ page, loginMethod: pemConfig });
    await TestActions.checkConnectionToWallet(
      page,
      TestDataEnums.keystoreWalletAddress5
    );
  });

  test('should have sufficient balance for ping & pong operations', async ({
    page
  }) => {
    // Get account balance before any actions
    const accountBalance = await TestActions.extractBalanceFromContainer({
      page,
      containerSelector: SelectorsEnum.topInfoContainer,
      selectorType: 'testId'
    });

    // Check that account balance is greater than 1 required for ping & pong
    expect(accountBalance).toBeGreaterThan(
      TEST_CONSTANTS.MIN_BALANCE_FOR_PING_PONG
    );
  });

  test('should complete full ping/pong transaction flow', async ({ page }) => {
    // Get account balance before any actions
    const accountBalance = await TestActions.extractBalanceFromContainer({
      page,
      containerSelector: SelectorsEnum.topInfoContainer,
      selectorType: 'testId'
    });

    // Scroll to the ping & pong container into viewport
    await page
      .locator(SelectorsEnum.pingPongAbiContainer)
      .scrollIntoViewIfNeeded();

    const clickedButton = await TestActions.handlePingPong({
      page,
      type: PingPongEnum.abi
    });

    // Switch to web wallet page
    const walletPage = await TestActions.getPageAndWaitForLoad(
      page.context(),
      OriginPageEnum.multiversxWallet
    );

    // Verify wallet page opened
    await expect(walletPage).toHaveURL(UrlRegex.multiversxWallet, {
      timeout: WALLET_URL_TIMEOUT_MS
    });

    // Sign transaction by confirming with pem
    await TestActions.confirmWalletTransaction(walletPage, pemConfig);

    // Click on Sign button to confirm the transaction in the web wallet
    await walletPage.getByTestId(SelectorsEnum.signButton).click();

    // Switch to template dashboard page
    const templatePage = await TestActions.getPageAndWaitForLoad(
      page.context(),
      OriginPageEnum.templateDashboard
    );

    // Wait for transaction toast to be displayed
    await TestActions.waitForToastToBeDisplayed(templatePage);

    // Check balance change based on the clicked button
    await TestActions.checkPingPongBalanceUpdate({
      page: templatePage,
      containerSelector: SelectorsEnum.topInfoContainer,
      initialBalance: accountBalance,
      isPing: clickedButton === 'ping'
    });

    // Check that the button status changed after the action
    await TestActions.checkButtonStatus({
      page,
      type: PingPongEnum.abi,
      lastClickedButton: clickedButton
    });
  });
});
