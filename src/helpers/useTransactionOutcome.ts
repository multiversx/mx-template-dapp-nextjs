import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

export const useTransactionOutcome = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [txData] = useState({
    status: searchParams.get('status'),
    txHash: searchParams.get('txHash'),
    address: searchParams.get('address')
  });

  useEffect(() => {
    // reset search params after transaction is completed
    if (txData.status && txData.address) {
      router.replace('/');
    }
  }, [searchParams, txData]);

  return txData;
};
