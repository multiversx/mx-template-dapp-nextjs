import { expect, test } from '@playwright/test';
import * as TestActions from '../support/template';
import { TestDataEnums } from '../support/template/testdata';

const keystoreConfig = {
  keystore: TestDataEnums.keystoreFilePath1,
  password: TestDataEnums.keystorePassword1,
  address: TestDataEnums.keystoreWalletAddress1
};

const pemConfig = {
  pem: TestDataEnums.keystoreFilePath5
};

test.describe('Connect a wallet', () => {
  // Connect wallet tests verify wallet connection functionality

  test.beforeEach(async ({ page }) => {
    await TestActions.navigateToConnectWallet(page);
  });

  test.describe('Keystore Connection', () => {
    test('should successfully connect with keystore file', async ({ page }) => {
      await TestActions.connectWebWallet({ page, loginMethod: keystoreConfig });

      await TestActions.checkConnectionToWallet(
        page,
        TestDataEnums.keystoreWalletAddress1
      );
    });
  });

  test.describe('PEM Connection', () => {
    test('should successfully connect with PEM file', async ({ page }) => {
      await TestActions.connectWebWallet({ page, loginMethod: pemConfig });

      await TestActions.checkConnectionToWallet(
        page,
        TestDataEnums.keystoreWalletAddress5
      );
    });
  });

  test.describe('Connection Validation', () => {
    test('should handle missing password for keystore', async ({ page }) => {
      // Test with keystore but no password
      const invalidKeystoreConfig = {
        keystore: TestDataEnums.keystoreFilePath1,
        password: undefined
      };

      // This should throw an error for missing password
      await expect(
        TestActions.connectWebWallet({
          page,
          loginMethod: invalidKeystoreConfig
        })
      ).rejects.toThrow('Password is required when using a keystore');
    });
  });
});
