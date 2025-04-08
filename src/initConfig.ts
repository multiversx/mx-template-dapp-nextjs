/* eslint-disable @typescript-eslint/no-explicit-any */
import './styles/globals.css';

import { walletConnectV2ProjectId } from './config';
import {
  ICustomProvider,
  ProviderTypeEnum,
  InitAppType,
  EnvironmentsEnum
} from './types';
import { InMemoryProvider } from './provider/inMemoryProvider';
import { safeWindow } from '@/utils';

const ADDITIONAL_PROVIDERS = {
  inMemoryProvider: 'inMemoryProvider'
} as const;

export const ExtendedProviders = {
  ...ProviderTypeEnum,
  ...ADDITIONAL_PROVIDERS
} as const;

const DEFAULT_TOAST_LIEFTIME = 5000;

const providers: ICustomProvider<ProviderTypeEnum>[] = [
  {
    name: ADDITIONAL_PROVIDERS.inMemoryProvider,
    type: ExtendedProviders.inMemoryProvider,
    icon: '',
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    constructor: async (_address?: string) => new InMemoryProvider()
  }
];

(safeWindow as any).multiversx = {};
// Option 1: Add providers using the `window.providers` array
(safeWindow as any).multiversx.providers = providers;

export const config: InitAppType = {
  storage: { getStorageCallback: () => sessionStorage },
  dAppConfig: {
    nativeAuth: true,
    environment: EnvironmentsEnum.devnet,
    network: {
      walletAddress: 'https://devnet-wallet.multiversx.com'
    },
    providers: {
      walletConnect: {
        walletConnectV2ProjectId
      }
    },
    successfulToastLifetime: DEFAULT_TOAST_LIEFTIME
  }

  // Option 2: Add providers using the config `customProviders` array
  // customProviders: [customWalletProvider]
};
