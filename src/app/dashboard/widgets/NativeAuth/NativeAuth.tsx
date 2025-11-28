'use client';
import { useEffect } from 'react';
import { MissingNativeAuthError } from '@/components/MissingNativeAuthError';
import { Label } from '@/components/Label';
import { OutputContainer } from '@/components/OutputContainer';

import {
  useGetLoginInfo,
  useGetNetworkConfig,
  useGetAccount,
  FormatAmount
} from '@/lib';
import { useGetProfile } from './hooks';
import { Username } from '../Account/components';

export const NativeAuth = () => {
  const { tokenLogin, isLoggedIn } = useGetLoginInfo();
  const { balance } = useGetAccount();
  const { isLoading, profile, getProfile } = useGetProfile();
  const { network } = useGetNetworkConfig();

  useEffect(() => {
    // On page refresh, tokenInfo is null which implies that we do not have access to loginInfo data
    if (isLoggedIn && tokenLogin?.nativeAuthToken) {
      getProfile();
    }
  }, [isLoggedIn]);

  if (!tokenLogin?.nativeAuthToken && !isLoading) {
    return <MissingNativeAuthError />;
  }

  if (!profile && !isLoading) {
    return (
      <OutputContainer>
        <div className='flex items-center gap-1'>
          <p>Unable to load profile</p>
        </div>
      </OutputContainer>
    );
  }

  return (
    <OutputContainer isLoading={isLoading}>
      <p>
        <Label>Address:</Label> {profile?.address ?? 'N/A'}
      </p>

      <Username account={profile} />
      <p>
        <Label>Shard: </Label> {profile?.shard ?? 'N/A'}
      </p>

      <div className='flex gap-1'>
        <Label>Balance:</Label>
        <FormatAmount
          value={balance}
          data-testid='balance'
          showLabel={true}
        />
      </div>
    </OutputContainer>
  );
};
