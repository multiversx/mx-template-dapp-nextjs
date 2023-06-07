'use client';

import {
  apiTimeout,
  sampleAuthenticatedDomains,
  walletConnectV2ProjectId
} from '@/config';
import { EnvironmentsEnum } from '@multiversx/sdk-dapp/types';
import { DappProvider } from '@multiversx/sdk-dapp/wrappers/DappProvider';
import { AxiosInterceptorContext } from '@multiversx/sdk-dapp/wrappers/AxiosInterceptorContext';
import dynamic from 'next/dynamic';

const SignTransactionsModals = dynamic(
  async () => {
    return (await import('@multiversx/sdk-dapp/UI/SignTransactionsModals'))
      .SignTransactionsModals;
  },
  { ssr: false }
);
const NotificationModal = dynamic(
  async () => {
    return (await import('@multiversx/sdk-dapp/UI/NotificationModal'))
      .NotificationModal;
  },
  { ssr: false }
);
const TransactionsToastList = dynamic(
  async () => {
    return (await import('@multiversx/sdk-dapp/UI/TransactionsToastList'))
      .TransactionsToastList;
  },
  { ssr: false }
);

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AxiosInterceptorContext.Provider>
      <AxiosInterceptorContext.Interceptor
        authenticatedDomanis={sampleAuthenticatedDomains}
      >
        <DappProvider
          environment={EnvironmentsEnum.devnet}
          customNetworkConfig={{
            name: 'customConfig',
            apiTimeout,
            walletConnectV2ProjectId
          }}
        >
          <AxiosInterceptorContext.Listener />
          <TransactionsToastList />
          <NotificationModal />
          <SignTransactionsModals className='custom-class-for-modals' />
          <>{children}</>
        </DappProvider>
      </AxiosInterceptorContext.Interceptor>
    </AxiosInterceptorContext.Provider>
  );
}
