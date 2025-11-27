import { expect, test } from '@playwright/test';
import * as TestActions from '../support/template';
import { extractBalanceFromContainer } from '../support/template';
import { SelectorsEnum, TestDataEnums } from '../support/template/testdata';

const keystoreConfig = {
  keystore: TestDataEnums.keystoreFilePath1,
  password: TestDataEnums.keystorePassword1,
  address: TestDataEnums.keystoreWalletAddress1
};

// TODO: Unable to load profile error appears -> check if this is a known issue
// and then adjust the test accordingly (if necessary)
test.describe.skip('Native auth', () => {
  test.beforeEach(async ({ page }) => {
    await TestActions.navigateToConnectWallet(page);
    await TestActions.connectWebWallet({ page, loginMethod: keystoreConfig });
    await TestActions.checkConnectionToWallet(page, keystoreConfig.address);
  });

  test('should display correct wallet address and balance in native auth', async ({
    page
  }) => {
    // Get account balance before any actions
    const accountBalance = await TestActions.extractBalanceFromContainer({
      page,
      containerSelector: SelectorsEnum.topInfoContainer,
      selectorType: 'testId'
    });

    // Scroll to the native auth container into viewport
    await page
      .locator(SelectorsEnum.nativeAuthContainer)
      .scrollIntoViewIfNeeded();

    // Verify container is in viewport
    const container = page.locator(SelectorsEnum.nativeAuthContainer);
    await expect(container).toBeInViewport();

    // Check that the address is displayed and matches the account address
    const nativeAuthAddress = page
      .locator(SelectorsEnum.nativeAuthContainer)
      .getByTestId(SelectorsEnum.trimFullAddress);

    await expect(nativeAuthAddress).toHaveText(keystoreConfig.address);

    // Check that the balance is displayed and matches the account balance
    const nativeAuthBalance = await extractBalanceFromContainer({
      page,
      containerSelector: SelectorsEnum.nativeAuthContainer,
      selectorType: 'locator'
    });

    await expect(nativeAuthBalance).toBe(accountBalance);
  });
});
