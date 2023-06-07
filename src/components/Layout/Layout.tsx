'use client';

import { AuthenticatedRoutesWrapper } from '@multiversx/sdk-dapp/wrappers';
import { routeNames, routes } from '@/routes';
import { useSearchParams } from 'next/navigation';
import { Navbar } from '@/components/Layout/Navbar';
import Footer from '@/components/Layout/Footer';

export const Layout = ({ children }: { children: React.ReactNode }) => {
  const query = useSearchParams();

  return (
    <main className='bg-light d-flex flex-column flex-fill wrapper'>
      <Navbar />
      <div className='d-flex flex-column flex-grow-1'>
        <AuthenticatedRoutesWrapper
          routes={routes}
          unlockRoute={`${routeNames.unlock}${query}`}
        >
          <>{children}</>
        </AuthenticatedRoutesWrapper>
      </div>
      <Footer />
    </main>
  );
};
