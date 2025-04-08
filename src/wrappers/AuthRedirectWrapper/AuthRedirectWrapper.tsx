'use client';
import { useEffect } from 'react';
import type { PropsWithChildren } from 'react';
import { useGetIsLoggedIn } from '@/lib';
import { RouteNamesEnum } from '@/localConstants';
import { redirect } from 'next/navigation';

interface AuthRedirectWrapperPropsType extends PropsWithChildren {
  requireAuth?: boolean;
}

export const AuthRedirectWrapper = ({
  children,
  requireAuth = true
}: AuthRedirectWrapperPropsType) => {
  const isLoggedIn = useGetIsLoggedIn();

  useEffect(() => {
    if (isLoggedIn && !requireAuth) {
      redirect(RouteNamesEnum.dashboard);
    }

    if (!isLoggedIn && requireAuth) {
      redirect(RouteNamesEnum.unlock);
    }
  }, [isLoggedIn, requireAuth]);

  return <>{children}</>;
};
