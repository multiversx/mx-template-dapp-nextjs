import { expect } from '@playwright/test';
import { PingPongEnum } from './testdata';
import { CheckButtonStatusType } from './types';

export const checkButtonStatus = async ({
  page,
  type,
  lastClickedButton
}: CheckButtonStatusType) => {
  const container = page.locator(`#ping-pong-${type}`);
  await container.scrollIntoViewIfNeeded();

  const suffix = type === PingPongEnum.abi ? 'Abi' : 'Raw';
  const pingButton = container.getByTestId(`btnPing${suffix}`);
  const pongButton = container.getByTestId(`btnPong${suffix}`);

  // Check that ping button became disabled by looking for disabled attribute
  if (lastClickedButton === 'ping') {
    await expect(pingButton).toHaveAttribute('disabled');
    return;
  }

  if (lastClickedButton === 'pong') {
    await expect(pongButton).toHaveAttribute('disabled');
    return;
  }
};
