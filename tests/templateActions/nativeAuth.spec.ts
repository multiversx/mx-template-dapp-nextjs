import { expect, test } from '@playwright/test';
import * as TestActions from '../support/template';
import { extractBalanceFromContainer } from '../support/template';
import { SelectorsEnum, TestDataEnums } from '../support/template/testdata';

const keystoreConfig = {
  keystore: TestDataEnums.keystoreFilePath1,
  password: TestDataEnums.keystorePassword1,
  address: TestDataEnums.keystoreWalletAddress1
};

test.describe('Native auth', () => {
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

    // Scroll the native auth container into viewport. The dashboard anchor and
    // the widget share the `native-auth` id, so scope to the first match.
    const container = page.locator(SelectorsEnum.nativeAuthContainer).first();
    await container.scrollIntoViewIfNeeded();

    // Verify container is in viewport
    await expect(container).toBeInViewport();

    // Check that the address is displayed and matches the account address.
    // The visible value is trimmed via a web component, so assert on the
    // untrimmed value carried by the userAddress testid within the widget.
    const addressElement = container
      .getByTestId(SelectorsEnum.userAddress)
      .first();
    await expect(addressElement).toContainText(keystoreConfig.address);

    // Check that the balance is displayed and matches the account balance
    const nativeAuthBalance = await extractBalanceFromContainer({
      page,
      containerSelector: SelectorsEnum.nativeAuthContainer,
      selectorType: 'locator'
    });

    await expect(nativeAuthBalance).toBe(accountBalance);
  });
});
