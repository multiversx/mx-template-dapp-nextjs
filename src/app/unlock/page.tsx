'use client';
import {
  MvxUnlockButton,
  MvxUnlockPanel,
  IProviderFactory,
  ProviderFactory
} from '@/lib';
import { Button } from '@/components';
import { ExtendedProviders } from '@/initConfig';
import { RouteNamesEnum } from '@/localConstants';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const SHOW_ADVANCED_LOGIN_METHOD = true;

export default function Unlock() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const handleLogin = async ({ type, anchor }: IProviderFactory) => {
    const provider = await ProviderFactory.create({
      type,
      anchor
    });
    await provider?.login();
    router.push(RouteNamesEnum.dashboard);
  };

  const handleOpenUnlockPanel = () => {
    setIsOpen(true);
  };

  const handleCloseUnlockPanel = () => {
    setIsOpen(false);
  };

  return (
    <>
      <Button onClick={handleOpenUnlockPanel}>Connect</Button>
      <MvxUnlockPanel
        isOpen={isOpen}
        onLogin={({ detail }) =>
          handleLogin({
            type: detail.provider,
            anchor: detail.anchor
          })
        }
        onClose={handleCloseUnlockPanel}
      >
        {
          // you can safely remove this if you don't need to implement a custom provider
          SHOW_ADVANCED_LOGIN_METHOD && (
            <MvxUnlockButton
              label='In Memory Provider'
              onClick={() =>
                handleLogin({
                  type: ExtendedProviders.inMemoryProvider
                })
              }
            />
          )
        }
      </MvxUnlockPanel>
    </>
  );
}
