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
        setIsInitialized(true); // Update state after initialization
      } catch (error) {
        console.error('Failed to initialize app:', error);
        // Optionally handle error state or fallback UI
      }
    };

    initializeApp();
  }, []); // Runs only once when the component mounts

  // Optionally, show a loading indicator while initializing
  if (!isInitialized) {
    return <div>Loading...</div>; // or any loading spinner
  }

  return <>{children}</>;
};
