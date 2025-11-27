import { test } from '@playwright/test';
import * as TestActions from '../support/template';
import { readValueFromFile } from '../support/template';
import { TestDataEnums } from '../support/template/testdata';

const privateKeyConfig = {
  address: TestDataEnums.keystoreWalletAddress6,
  privateKey: readValueFromFile(TestDataEnums.keystoreFilePath6, 'utf8').trim()
};

test.describe('Connect a wallet', () => {
  // Connect wallet tests verify wallet connection functionality

  test.beforeEach(async ({ page }) => {
    await TestActions.navigateToConnectWallet(page);
  });

  test.describe('In Memory Provider Connection', () => {
    test('should successfully connect with Address and Private Key', async ({
      page
    }) => {
      await TestActions.connectInMemoryProvider({
        page,
        loginMethod: privateKeyConfig
      });

      await TestActions.checkConnectionToWallet(page, privateKeyConfig.address);
    });
  });
});
