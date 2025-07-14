'use client';
import { getAccountProvider, useGetIsLoggedIn } from '@/lib';
import { RouteNamesEnum } from '@/localConstants';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Logout() {
  const isLoggedIn = useGetIsLoggedIn();
  const router = useRouter();
  const provider = getAccountProvider();

  const handleLogout = async () => {
    await provider.logout();
    router.push(RouteNamesEnum.home);
  };

  useEffect(() => {
    if (!isLoggedIn) {
      router.replace(RouteNamesEnum.home);
      return;
    }
    handleLogout();
  }, [isLoggedIn]);

  return (
    <div className='flex justify-center items-center w-full h-full self-center'>
      <div className='w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin' />
    </div>
  );
}
