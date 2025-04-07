'use client';

import { useGetNetworkConfig } from '@/hooks';
import { SignedTransactionType } from '@/types';
import {
  MvxFormatAmount,
  MvxExplorerLink
} from '@/components/sdkDappCoreUIComponents';
import { Label } from '@/components/Label';
import { ACCOUNTS_ENDPOINT, TRANSACTIONS_ENDPOINT } from '@/localConstants';

export const TransactionOutput = ({
  transaction
}: {
  transaction: SignedTransactionType;
}) => {
  const { network } = useGetNetworkConfig();

  const decodedData = transaction.data
    ? Buffer.from(transaction.data, 'base64').toString('ascii')
    : 'N/A';
  return (
    <div className='flex flex-col'>
      <p>
        <Label>Hash:</Label>
        <MvxExplorerLink
          page={`/${TRANSACTIONS_ENDPOINT}/${transaction.hash}`}
          className='border-b border-dotted border-gray-500 hover:border-solid hover:border-gray-800'
        >
          {transaction.hash}
        </MvxExplorerLink>
      </p>
      <p>
        <Label>Receiver:</Label>
        <MvxExplorerLink
          page={`/${ACCOUNTS_ENDPOINT}/${transaction.receiver}`}
          className='border-b border-dotted border-gray-500 hover:border-solid hover:border-gray-800'
        >
          {transaction.receiver}
        </MvxExplorerLink>
      </p>
      <p>
        <Label>Amount: </Label>
        <MvxFormatAmount
          value={transaction.value}
          showLabel={transaction.value !== '0'}
          egldLabel={network.egldLabel}
          data-testid='balance'
        />
      </p>
      <p>
        <Label>Gas price: </Label> {transaction.gasPrice}
      </p>
      <p>
        <Label>Gas limit: </Label> {transaction.gasLimit}
      </p>
      <p className='whitespace-nowrap'>
        <Label>Data: </Label> {decodedData}
      </p>
    </div>
  );
};
