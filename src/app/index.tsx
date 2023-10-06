'use client';

import type { PropsWithChildren, ReactNode } from 'react';
import {
  TransactionsToastList,
  NotificationModal,
  SignTransactionsModals,
  DappProvider
  // uncomment this to use the custom transaction tracker
  // TransactionsTracker
} from '@/components';
import {
  apiTimeout,
  walletConnectV2ProjectId,
  environment,
  sampleAuthenticatedDomains
} from '@/config';
import { BatchTransactionsContextProvider } from '@/wrappers';
import { AxiosInterceptorContext } from '@multiversx/sdk-dapp/wrappers/AxiosInterceptorContext';
import { RouteNamesEnum } from '@/localConstants';

const AppContent = ({ children }: PropsWithChildren) => {
  return (
    <DappProvider
      environment={environment}
      customNetworkConfig={{
        name: 'customConfig',
        apiTimeout,
        walletConnectV2ProjectId
      }}
      dappConfig={{
        shouldUseWebViewProvider: true,
        logoutRoute: RouteNamesEnum.unlock
      }}
      customComponents={{
        transactionTracker: {
          // uncomment this to use the custom transaction tracker
          // component: TransactionsTracker,
          props: {
            onSuccess: (sessionId: string) => {
              console.log(`Session ${sessionId} successfully completed`);
            },
            onFail: (sessionId: string, errorMessage: string) => {
              console.log(`Session ${sessionId} failed. ${errorMessage ?? ''}`);
            }
          }
        }
      }}
    >
      <AxiosInterceptorContext.Listener>
        <TransactionsToastList />
        <NotificationModal />
        <SignTransactionsModals />
        {children}
      </AxiosInterceptorContext.Listener>
    </DappProvider>
  );
};

export default function App({ children }: { children: ReactNode }) {
  return (
    <AxiosInterceptorContext.Provider>
      <AxiosInterceptorContext.Interceptor
        authenticatedDomanis={sampleAuthenticatedDomains}
      >
        <BatchTransactionsContextProvider>
          <AppContent>{children}</AppContent>
        </BatchTransactionsContextProvider>
      </AxiosInterceptorContext.Interceptor>
    </AxiosInterceptorContext.Provider>
  );
}
