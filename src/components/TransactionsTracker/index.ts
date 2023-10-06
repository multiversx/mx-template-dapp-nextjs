import dynamic from 'next/dynamic';

export const TransactionsTracker = dynamic(
  async () => {
    return (await import('./TransactionsTracker')).TransactionsTracker;
  },
  { ssr: false }
);
