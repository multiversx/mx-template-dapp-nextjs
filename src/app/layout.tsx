'use client';
import '@/styles/globals.scss';
import { AxiosInterceptorContext } from '@multiversx/sdk-dapp/wrappers/AxiosInterceptorContext';
import {
  apiTimeout,
  sampleAuthenticatedDomains,
  walletConnectV2ProjectId
} from '@/config';
import { DappProvider } from '@multiversx/sdk-dapp/wrappers/DappProvider';
import { EnvironmentsEnum } from '@multiversx/sdk-dapp/types';
import { Layout } from '@/components/Layout';
import * as React from 'react';
import dynamic from 'next/dynamic';
import { Navbar } from '@/components/Layout/Navbar';
import { Footer } from '@/components/Layout/Footer';
import Head from 'next/head';

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

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <Head>
        <title>Create Next App</title>
        <meta name='description' content='Generated by create next app' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <body>
        <div className='bg-light d-flex flex-column flex-fill wrapper'>
          <Navbar />
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
                <Layout>
                  <AxiosInterceptorContext.Listener />
                  <TransactionsToastList />
                  <NotificationModal />
                  <SignTransactionsModals className='custom-class-for-modals' />
                  {children}
                </Layout>
              </DappProvider>
            </AxiosInterceptorContext.Interceptor>
          </AxiosInterceptorContext.Provider>
          <Footer />
        </div>
      </body>
    </html>
  );
}
