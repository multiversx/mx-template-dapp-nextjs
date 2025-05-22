'use client';
import type { PropsWithChildren } from 'react';

import {
  AxiosInterceptors,
  BatchTransactionsContextProvider
} from '@/wrappers';

export default function App({ children }: PropsWithChildren) {
  return (
    <AxiosInterceptors>
      <BatchTransactionsContextProvider>
        {children}
      </BatchTransactionsContextProvider>
    </AxiosInterceptors>
  );
}
