'use client';

import {
  apiTimeout,
  sampleAuthenticatedDomains,
  walletConnectV2ProjectId
} from '@/config';
import { EnvironmentsEnum } from '@multiversx/sdk-dapp/types';
import { DappProvider } from '@multiversx/sdk-dapp/wrappers/DappProvider';
import { AxiosInterceptorContext } from '@multiversx/sdk-dapp/wrappers/AxiosInterceptorContext';
import {
  NotificationModal,
  SignTransactionsModals,
  TransactionsToastList
} from '@/components';

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
