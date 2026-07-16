import type { ReactNode } from 'react';
import { AuthRedirectWrapper } from '@/wrappers';
import { HomeView } from '../components';

// The Home content renders as the persistent background for both `/` and
// `/unlock`. This layout stays mounted while navigating between those two
// routes, so `/unlock` (which only opens the global unlock panel) appears as a
// drawer over the homepage — mirroring the nested-route/`<Outlet>` behavior of
// the Vite mx-template-dapp.
export default function HomeLayout({ children }: { children: ReactNode }) {
  return (
    <AuthRedirectWrapper requireAuth={false}>
      <HomeView />

      {children}
    </AuthRedirectWrapper>
  );
}
