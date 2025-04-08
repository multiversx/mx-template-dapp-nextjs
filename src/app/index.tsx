'use client';

import { type ReactNode } from 'react';

import {
  AxiosInterceptors,
  BatchTransactionsContextProvider
} from '@/wrappers';

export default function App({ children }: { children: ReactNode }) {
  return (
    <AxiosInterceptors>
      <BatchTransactionsContextProvider>
        {children}
      </BatchTransactionsContextProvider>
    </AxiosInterceptors>
  );
}
