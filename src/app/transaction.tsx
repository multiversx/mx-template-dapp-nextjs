import { useGetNetworkConfig, MvxExplorerLink } from '@/lib';
import { getTransactionUrl, useTransactionOutcome } from '@/helpers';
import { Label } from '@/components/Label';
import { TRANSACTIONS_ENDPOINT } from '@/localConstants';

export const Transaction = () => {
  const { network } = useGetNetworkConfig();
  const transactionUrl = getTransactionUrl(network.walletAddress);

  const txData = useTransactionOutcome();

  return (
    <div className='flex flex-col gap-2 text-sm'>
      <a
        href={transactionUrl}
        className='self-start inline-block rounded-lg px-3 py-2 text-center hover:no-underline my-0 bg-transparent hover:bg-blue-600 text-blue-600 hover:text-white mr-0 border-solid border-blue-600 border-[1px]'
      >
        Send transaction
      </a>
      {txData.status && (
        <p>
          <Label>Transaction status:</Label> {txData.status}
        </p>
      )}
      {txData.address && (
        <p>
          <Label>Sender:</Label> {txData.address}
        </p>
      )}
      {txData.txHash && (
        <p>
          <Label>Hash:</Label>
          <MvxExplorerLink
            link={`/${TRANSACTIONS_ENDPOINT}/${txData.txHash}`}
            class='border-b border-dotted border-gray-500 hover:border-solid hover:border-gray-800 text-green-700'
          >
            {txData.txHash}
          </MvxExplorerLink>
        </p>
      )}
    </div>
  );
};
