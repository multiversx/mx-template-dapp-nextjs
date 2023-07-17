'use client';

import React from 'react';
import { walletConnectV2ProjectId } from '@/config';
import { routeNames } from '@/routes';
import {
  ExtensionLoginButton,
  LedgerLoginButton,
  WalletConnectLoginButton,
  WebWalletLoginButton
} from '@/components';

export const UnlockContent = () => {
  const commonProps = {
    callbackRoute: routeNames.dashboard,
    nativeAuth: true // optional
  };

  return (
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
                data-testid='webWalletLoginBtn'
                {...commonProps}
              />
              <LedgerLoginButton
                loginButtonText='Ledger'
                className='test-class_name'
                {...commonProps}
              />
              <WalletConnectLoginButton
                loginButtonText='xPortal'
                {...commonProps}
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
