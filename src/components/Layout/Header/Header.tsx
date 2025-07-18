'use client';
import { useRouter } from 'next/navigation';
import { Button, MxLink } from '@/components';
import { environment } from '@/config';
import { useGetIsLoggedIn } from '@/lib';
import { RouteNamesEnum } from '@/localConstants';
import mvxLogo from '../../../../public/assets/img/multiversx-logo.svg';
import Image from 'next/image';
import { ConnectButton, GitHubButton, NotificationsButton } from './components';

export const Header = () => {
  const isLoggedIn = useGetIsLoggedIn();
  const router = useRouter();

  const onClick = async () => {
    router.push(RouteNamesEnum.logout);
  };

  return (
    <header className='flex flex-row align-center justify-between pl-6 pr-6 pt-6'>
      <MxLink
        className='flex items-center justify-between'
        to={isLoggedIn ? RouteNamesEnum.dashboard : RouteNamesEnum.home}
      >
        <Image src={mvxLogo} alt='logo' className='w-full h-6' />
      </MxLink>

      <nav className='h-full w-full text-sm sm:relative sm:left-auto sm:top-auto sm:flex sm:w-auto sm:flex-row sm:justify-end sm:bg-transparent'>
        <div className='flex justify-end container mx-auto items-center gap-2'>
          <div className='flex gap-1 items-center'>
            <div className='w-2 h-2 rounded-full bg-green-500' />
            <p className='text-gray-600'>{environment}</p>
          </div>

          {isLoggedIn && (
            <>
              <GitHubButton />
              <NotificationsButton />
              <Button
                onClick={onClick}
                className='inline-block rounded-lg px-3 py-2 text-center hover:no-underline my-0 text-gray-600 hover:bg-slate-100 mx-0'
              >
                Close
              </Button>
            </>
          )}

          {!isLoggedIn && <ConnectButton />}
        </div>
      </nav>
    </header>
  );
};
