import { expect, test } from '@playwright/test';
import * as TestActions from '../support/template';
import { TEST_CONSTANTS } from '../support/template/constants';
import {
  OriginPageEnum,
  SelectorsEnum,
  TestDataEnums,
  UrlRegex
} from '../support/template/testdata';
import { WALLET_URL_TIMEOUT_MS } from '../config';

const keystoreConfig = {
  keystore: TestDataEnums.keystoreFilePath2,
  password: TestDataEnums.keystorePassword2
};

test.describe('Sign & send batch', () => {
  test.beforeEach(async ({ page }) => {
    await TestActions.navigateToConnectWallet(page);
    await TestActions.connectWebWallet({ page, loginMethod: keystoreConfig });
    await TestActions.checkConnectionToWallet(
      page,
      TestDataEnums.keystoreWalletAddress2
    );
  });

  // NOTE: Requires the wallet to hold > 5 EGLD (MIN_BALANCE_FOR_BATCH_TX).
  test('should have sufficient balance for batch transactions', async ({
    page
  }) => {
    // Get account balance before any actions
    const accountBalance = await TestActions.extractBalanceFromContainer({
      page,
      containerSelector: SelectorsEnum.topInfoContainer,
      selectorType: 'testId'
    });

    // Check that account balance is greater than 5 required for batch transactions
    expect(accountBalance).toBeGreaterThan(
      TEST_CONSTANTS.MIN_BALANCE_FOR_BATCH_TX
    );
  });

  test('should complete full batch transaction flow', async ({ page }) => {
    const numberOfTransactions = 5;

    // Scroll the batch transactions container into viewport (widget id and
    // dashboard anchor share the id, so scope to the first match)
    await page
      .locator(SelectorsEnum.batchTransactionsContainer)
      .first()
      .scrollIntoViewIfNeeded();

    // Click sign-and-batch
    await page.getByTestId(SelectorsEnum.signAndBatchButton).first().click();

    // Switch to the web wallet page
    const walletPage = await TestActions.getPageAndWaitForLoad(
      page.context(),
      OriginPageEnum.multiversxWallet
    );
    await expect(walletPage).toHaveURL(UrlRegex.multiversxWallet, {
      timeout: WALLET_URL_TIMEOUT_MS
    });

    // Confirm with the keystore and sign each transaction in the batch
    await TestActions.confirmWalletTransaction(walletPage, keystoreConfig);
    await TestActions.signBatchTransactions({
      walletPage,
      buttonSelector: SelectorsEnum.signAndBatchButton,
      numberOfTransactions
    });

    // Switch back to the template dashboard
    const templatePage = await TestActions.getPageAndWaitForLoad(
      page.context(),
      OriginPageEnum.templateDashboard
    );

    // Wait for the transaction toast to be displayed
    await TestActions.waitForToastToBeDisplayed(templatePage);

    // Check that the transaction toast shows that all transactions are signed
    await TestActions.waitForTransactionToastToContain({
      page: templatePage,
      toastStatus: '5 / 5 transactions processed'
    });

    // Wait for the transaction toast to be closed
    await TestActions.waitForToastToBeClosed(templatePage);
  });
});
