'use client';
import { UnlockPanelManager, useGetLoginInfo } from '@/lib';
import { RouteNamesEnum } from '@/localConstants';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

// Renders nothing itself: the homepage is the group layout's persistent
// background, and this page just opens the global unlock panel over it (a
// drawer). Closing the panel navigates back to `/`, which keeps the same
// mounted background.
export default function Unlock() {
  const router = useRouter();
  const { isLoggedIn } = useGetLoginInfo();

  const unlockPanelManager = UnlockPanelManager.init({
    loginHandler: () => {
      router.push(RouteNamesEnum.dashboard);
    },
    onClose: async () => {
      router.replace(RouteNamesEnum.home);
    }
  });

  const handleOpenUnlockPanel = () => {
    unlockPanelManager.openUnlockPanel();
  };

  useEffect(() => {
    if (isLoggedIn) {
      router.replace(RouteNamesEnum.dashboard);
      return;
    }

    handleOpenUnlockPanel();
  }, [isLoggedIn]);

  return null;
}
