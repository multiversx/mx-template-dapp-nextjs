'use client';
import { initAppSingleton } from './helpers';
import { config } from '@/initConfig';
import { PropsWithChildren, useEffect, useState } from 'react';

export const InitAppWrapper = ({ children }: PropsWithChildren) => {
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const initializeApp = async () => {
      try {
        await initAppSingleton(config);
        setIsInitialized(true);
      } catch (err) {
        console.error(err);
      }
    };

    initializeApp();
  }, []);

  if (!isInitialized) {
    return null;
  }

  return <>{children}</>;
};
