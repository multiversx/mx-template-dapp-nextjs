import { PropsWithChildren, useEffect } from 'react';
import { sampleAuthenticatedDomains } from '@/config';
import { setAxiosInterceptors } from '@/helpers';
import { useGetLoginInfo } from '@/hooks';

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
