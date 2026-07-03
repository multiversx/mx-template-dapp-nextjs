import { TEST_CONSTANTS } from './constants';
import { PingPongEnum } from './testdata';
import { HandlePingPongType } from './types';

export const handlePingPong = async ({ page, type }: HandlePingPongType) => {
  // The widget id and the dashboard anchor share `#ping-pong-<type>`, and the
  // button web component can expose data-testid on more than one node, so scope
  // to the first match in both cases.
  const container = page.locator(`#ping-pong-${type}`).first();
  await container.scrollIntoViewIfNeeded();

  const suffix = type === PingPongEnum.abi ? 'Abi' : 'Raw';
  const pingButton = container.getByTestId(`btnPing${suffix}`).first();
  const pongButton = container.getByTestId(`btnPong${suffix}`).first();

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
