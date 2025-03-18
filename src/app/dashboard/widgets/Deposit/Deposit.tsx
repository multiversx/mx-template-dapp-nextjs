'use client';

import { OutputContainer } from '@/components';
import { useGetAccountInfo } from '@/hooks';
import { useState } from 'react';
import { useGetNativeAuthToken } from '@/app/dashboard/widgets/Deposit/useGetNativeAuthToken';
import { init } from '@multiversx/sdk-dapp-liquidity/reactjs/init/init';
import { Web3AppProvider } from '@multiversx/sdk-dapp-liquidity/reactjs/context/Web3AppProvider';
import { BridgeForm } from '@multiversx/sdk-dapp-liquidity/reactjs/components/BridgeForm/BridgeForm';
import { TransactionToastContainer } from '@multiversx/sdk-dapp-liquidity/reactjs/components/TransactionToast/TransactionToastContainer';

const metadata = {
  name: 'AppName',
  description: 'AppName Example',
  url: 'https://example.com', // origin must match your domain & subdomain
  icons: ['https://avatars.githubusercontent.com/u/179229932']
};
const projectId = 'e429ce46a9c011b5cdc17eb357a40ee2';
const provider = init({
  /**
   * @reown AppKit options
   */
  appKitOptions: {
    allowUnsupportedChain: true,
    projectId,
    metadata,
    connectorImages: {
      injected: 'https://avatars.githubusercontent.com/u/179229932',
      walletConnect:
        'https://avatars.githubusercontent.com/u/37784886?s=200&v=4',
      'io.metamask':
        'https://avatars.githubusercontent.com/u/11744586?s=200&v=4',
      'com.trustwallet.app':
        'https://avatars.githubusercontent.com/u/32179889?s=200&v=4'
    },
    themeMode: 'dark',
    themeVariables: {
      '--w3m-font-family': 'Roobert,system-ui,sans-serif'
    },
    features: {
      email: false,
      socials: false
    }
  },
  adapterConfig: {
    ssr: true
  },
  acceptedChainIDs: [97, 4002],
  acceptedConnectorsIDs: [
    'io.metamask',
    'com.trustwallet.app',
    'walletconnect'
  ],
  apiURL: 'https://devnet-tools.multiversx.com/liquidity-sdk',
  bridgeURL: 'https://devnet-bridge.multiversx.com',
  mvxApiURL: 'https://devnet-api.multiversx.com',
  mvxExplorerAddress: 'https://devnet-explorer.multiversx.com',
  mvxChainId: '44'
});

export const Deposit = () => {
  const { account: mvxAccount } = useGetAccountInfo();
  const [showHistory, setShowHistory] = useState(false);

  // const evmAccount = useAccount();
  const nativeAuthToken = useGetNativeAuthToken();

  const onConnectToMvx = async () => {
    // Login to MultiversX
  };

  const onDisconnectFromMvx = async () => {
    // Logout from MultiversX
  };

  const onHistoryClose = () => {
    setShowHistory(false);
  };

  const onNavigate = (_url: string) => {
    console.log(_url);
    // router.push(url);
  };

  return (
    <OutputContainer>
      <div className='flex flex-col text-black' data-testid='deposit'>
        <Web3AppProvider
          appKit={provider.appKit}
          config={provider.config}
          options={provider.options}
        >
          <BridgeForm
            mvxChainId={'44'}
            mvxAddress={mvxAccount?.address}
            username={mvxAccount?.username}
            nativeAuthToken={nativeAuthToken}
            showHistory={showHistory}
            onSuccessfullySentTransaction={(txHashes) => {
              console.log(txHashes);
              // DO SOMETHING
            }}
            onFailedSentTransaction={() => {
              // DO SOMETHING
            }}
            onHistoryClose={onHistoryClose}
            onMvxConnect={onConnectToMvx}
            onMvxDisconnect={onDisconnectFromMvx}
            onNavigate={onNavigate}
          />
          <TransactionToastContainer theme='colored' />
        </Web3AppProvider>
      </div>
    </OutputContainer>
  );
};
