import React from 'react';
import { AuthenticatedRoutesWrapper } from '@multiversx/sdk-dapp/wrappers';
import { routes, routeNames } from '@/routes';
import { useSearchParams } from 'next/navigation';

export const Layout = ({ children }: { children: React.ReactNode }) => {
  const query = useSearchParams();

  return (
    <main className='d-flex flex-column flex-grow-1'>
      <AuthenticatedRoutesWrapper
        routes={routes}
        unlockRoute={`${routeNames.unlock}${query}`}
      >
        {children}
      </AuthenticatedRoutesWrapper>
    </main>
  );
};
