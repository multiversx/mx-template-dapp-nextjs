import { TEST_CONSTANTS } from './constants';
import { PingPongEnum } from './testdata';
import { HandlePingPongType } from './types';

export const handlePingPong = async ({ page, type }: HandlePingPongType) => {
  const container = page.locator(`#ping-pong-${type}`);
  await container.scrollIntoViewIfNeeded();

  const suffix = type === PingPongEnum.abi ? 'Abi' : 'Raw';
  const pingButton = container.getByTestId(`btnPing${suffix}`);
  const pongButton = container.getByTestId(`btnPong${suffix}`);

  // Use Playwright's isDisabled() for clarity
  const isPingEnabled = !(await pingButton.isDisabled());
  const isPongEnabled = !(await pongButton.isDisabled());

  if (!isPingEnabled && !isPongEnabled) {
    throw new Error('Neither Ping nor Pong button are enabled!');
  }

  if (isPingEnabled) {
    await pingButton.click();
    return 'ping';
  }

  if (isPongEnabled) {
    await pongButton.click();
    return 'pong';
  }

  throw new Error(
    `Neither Ping nor Pong button are enabled! Did you send a Ping or Pong within ${
      TEST_CONSTANTS.PING_PONG_COOLDOWN / 1000 / 60
    } minutes?`
  );
};
