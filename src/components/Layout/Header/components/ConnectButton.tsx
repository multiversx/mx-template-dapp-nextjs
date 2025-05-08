'use client';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/Button';
import { UnlockPanelManager } from '@/lib';
import { RouteNamesEnum } from '@/localConstants';

export const ConnectButton = () => {
  const router = useRouter();

  const unlockPanelManager = UnlockPanelManager.init({
    loginHandler: () => {
      router.push(RouteNamesEnum.dashboard);
    }
  });

  const handleOpenUnlockPanel = () => {
    unlockPanelManager.openUnlockPanel();
  };

  return <Button onClick={handleOpenUnlockPanel}>Connect</Button>;
};
