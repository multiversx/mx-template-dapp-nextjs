'use client';

import React from 'react';
import { walletConnectV2ProjectId } from '@/config';
import { routeNames } from '@/routes';
import { AuthRedirectWrapper } from '@/components/AuthRedirectWrapper';
import dynamic from 'next/dynamic';

const ExtensionLoginButton = dynamic(
  async () => {
    return (
      await import('@multiversx/sdk-dapp/UI/extension/ExtensionLoginButton')
    ).ExtensionLoginButton;
  },
  { ssr: false }
);

const WalletConnectLoginButton = dynamic(
  async () => {
    return (
      await import(
        '@multiversx/sdk-dapp/UI/walletConnect/WalletConnectLoginButton'
      )
    ).WalletConnectLoginButton;
  },
  { ssr: false }
);

const LedgerLoginButton = dynamic(
  async () => {
    return (await import('@multiversx/sdk-dapp/UI/ledger/LedgerLoginButton'))
      .LedgerLoginButton;
  },
  { ssr: false }
);

const WebWalletLoginButton = dynamic(
  async () => {
    return (
      await import('@multiversx/sdk-dapp/UI/webWallet/WebWalletLoginButton')
    ).WebWalletLoginButton;
  },
  { ssr: false }
);

const UnlockPage = () => {
  const commonProps = {
    callbackRoute: routeNames.dashboard,
    nativeAuth: true // optional
  };

  return (
    <>
      <main className='mt-5'>
        <div className='home d-flex flex-fill align-items-center'>
          <div className='m-auto' data-testid='unlockPage'>
            <div className='card my-4 text-center'>
              <div className='card-body py-4 px-2 px-sm-2 mx-lg-4'>
                <h4 className='mb-4'>Login</h4>
                <p className='mb-4'>pick a login method</p>

                <ExtensionLoginButton
                  loginButtonText='Extension'
                  {...commonProps}
                />

                <WebWalletLoginButton
                  loginButtonText='Web wallet'
                  {...commonProps}
                />
                <LedgerLoginButton
                  loginButtonText='Ledger'
                  className='test-class_name'
                  {...commonProps}
                />
                <WalletConnectLoginButton
                  loginButtonText='Maiar'
                  {...commonProps}
                  {...(walletConnectV2ProjectId
                    ? {
                        isWalletConnectV2: true
                      }
                    : {})}
                />
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default function Unlock() {
  return (
    <AuthRedirectWrapper>
      <UnlockPage />
    </AuthRedirectWrapper>
  );
}
