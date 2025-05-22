'use client';
import { PropsWithChildren, useEffect } from 'react';
import { sampleAuthenticatedDomains } from '@/config';
import { useGetLoginInfo, setAxiosInterceptors } from '@/lib';

export const AxiosInterceptors = ({ children }: PropsWithChildren) => {
  const { tokenLogin } = useGetLoginInfo();

  useEffect(() => {
    setAxiosInterceptors({
      authenticatedDomains: sampleAuthenticatedDomains,
      bearerToken: tokenLogin?.nativeAuthToken
    });
  }, [tokenLogin?.nativeAuthToken]);

  return <>{children}</>;
};
