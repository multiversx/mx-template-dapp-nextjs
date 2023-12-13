'use client';
import { useScrollToElement } from '@/hooks';

// In order to not make dashboard client side create a client component which uses client hooks
export const ClientHooks = () => {
  useScrollToElement();

  return null;
};
