import { expect, Page } from '@playwright/test';
import { SelectorsEnum } from './testdata';

// Check if the template is connected to the web wallet by veryfing that
// the template page contains the wallet address which confirms the connection
export const checkConnectionToWallet = async (
  page: Page,
  walletAddress: string
) => {
  const addressElement = page.getByTestId(SelectorsEnum.userAddress).first();
  await expect(addressElement).toContainText(walletAddress);
};
