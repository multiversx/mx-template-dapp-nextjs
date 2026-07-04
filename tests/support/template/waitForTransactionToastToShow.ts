import { expect } from '@playwright/test';
import { TEST_CONSTANTS } from './constants';
import { SelectorsEnum } from './testdata';
import { WaitForTransactionToastToContainType } from './types';

export const waitForTransactionToastToContain = async ({
  page,
  toastTitle,
  toastContent,
  toastStatus,
  toastIndex = 0
}: WaitForTransactionToastToContainType) => {
  if (!toastTitle && !toastContent && !toastStatus) {
    throw new Error('Either toast title, content or status must be provided');
  }

  const titleLocator = page.getByTestId(SelectorsEnum.toastTitle);
  const contentLocator = page.getByTestId(SelectorsEnum.toastContent);
  const statusLocator = page.getByTestId(SelectorsEnum.toastStatus);

  // Wait for toast visibility
  await expect(contentLocator.nth(toastIndex)).toBeVisible({
    timeout: TEST_CONSTANTS.TOAST_WAIT_TIMEOUT
  });

  if (toastTitle) {
    await expect(titleLocator.nth(toastIndex)).toContainText(toastTitle, {
      timeout: TEST_CONSTANTS.TOAST_WAIT_TIMEOUT,
      useInnerText: true
    });
  }

  if (toastContent) {
    await expect(contentLocator.nth(toastIndex)).toContainText(toastContent, {
      timeout: TEST_CONSTANTS.TOAST_WAIT_TIMEOUT,
      useInnerText: true
    });
  }

  if (toastStatus) {
    // The batch status text progresses (1 / 5 → 2 / 5 → … → 5 / 5) and can live
    // on a re-rendered or duplicated node, so pinning to a single nth() snapshot
    // can get stuck on an element that never reaches the final value. Instead,
    // wait for ANY status element to contain the target text.
    await expect(
      statusLocator.filter({ hasText: toastStatus }).first()
    ).toBeVisible({
      timeout: TEST_CONSTANTS.TOAST_WAIT_TIMEOUT
    });
  }
};
