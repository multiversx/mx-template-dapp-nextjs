'use client';
import { initApp } from '@/helpers';
import { config } from '@/initConfig';
import { PropsWithChildren, useEffect, useState } from 'react';

export const InitAppWrapper = ({ children }: PropsWithChildren) => {
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const initializeApp = async () => {
      try {
        console.log({ config });
        await initApp(config);
        console.log('App initialized');
        setIsInitialized(true);
      } catch (error) {
        console.error('Failed to initialize app:', error);
      }
    };

    initializeApp();
  }, []);

  if (!isInitialized) {
    return <div>Loading...</div>;
  }

  return <>{children}</>;
};
