'use client';
import { UnlockPanelManager, useGetLoginInfo } from '@/lib';
import { RouteNamesEnum } from '@/localConstants';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Unlock() {
  const router = useRouter();
  const { isLoggedIn } = useGetLoginInfo();

  const unlockPanelManager = UnlockPanelManager.init({
    loginHandler: () => {
      router.push(RouteNamesEnum.dashboard);
    },
    closeCallback: () => {
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
