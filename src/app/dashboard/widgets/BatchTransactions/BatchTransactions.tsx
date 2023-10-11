'use client';
import { useEffect, useState } from 'react';
import {
  faPaperPlane,
  faArrowsRotate
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useGetBatches } from '@multiversx/sdk-dapp/hooks/transactions/batch/useGetBatches';
import { Button, OutputContainer, TransactionsOutput } from '@/components';
import { sendTransactions } from '@/helpers';
import { useGetAccountInfo, useGetPendingTransactions } from '@/hooks';
import { SessionEnum } from '@/localConstants';
import { SignedTransactionType } from '@/types';
import { useBatchTransactionContext } from '@/wrappers';
import { getBatchTransactions, getSwapAndLockTransactions } from './helpers';
import { useSendSignedTransactions } from './hooks';
import { BatchTransactionsType } from './types';
import { sendBatchTransactions } from '@multiversx/sdk-dapp/services/transactions/sendBatchTransactions';

export const BatchTransactions = () => {
  const { setSendBatchTransactionsOnDemand } = useBatchTransactionContext();
  const { address } = useGetAccountInfo();
  const { batches } = useGetBatches();
  const { hasPendingTransactions } = useGetPendingTransactions();

  const [stateTransactions, setStateTransactions] = useState<
    SignedTransactionType[] | null
  >(null);
  const [transactionsOrder, setTransactionsOrder] = useState<number[][]>([]);
  const [currentSessionId, setCurrentSessionId] = useState(
    sessionStorage.getItem(SessionEnum.signedSessionId)
  );
  const [trackBatchId, setTrackBatchId] = useState(
    sessionStorage.getItem(SessionEnum.batchId)
  );

  const { batchId, setBatchSessionId } = useSendSignedTransactions({
    signedSessionId: currentSessionId,
    transactionsOrder
  });

  // this process will not go through useSendSignedTransactions
  // it will automatically sign and send transactions
  const signAndAutoSendBatchTransactions = async () => {
    sessionStorage.setItem(SessionEnum.sendBatchTransactionsOnDemand, 'false');
    setSendBatchTransactionsOnDemand(false);

    const payload = getBatchTransactions(address);
    const { transactions } = payload;

    const groupedTransactions = [
      [transactions[0]],
      [transactions[1], transactions[2]],
      [transactions[3], transactions[4]]
    ];

    const { batchId: currentBatchId, error } = await sendBatchTransactions({
      transactions: groupedTransactions,
      callbackRoute: window.location.pathname,
      customTransactionInformation: { redirectAfterSign: true },
      transactionsDisplayInfo: {
        processingMessage: 'Processing transactions',
        errorMessage: 'An error has occurred during transaction execution',
        successMessage: 'Batch transactions successful'
      }
    });

    if (error) {
      console.error('Could not execute transactions', error);
      return;
    }

    sessionStorage.setItem(SessionEnum.batchId, currentBatchId);
    setTrackBatchId(currentBatchId);
  };

  const executeTransactions = async (payload: BatchTransactionsType) => {
    // Save in sessionStorage as on redirect from wallet provider, it will reset the context and it will not trigger the manual batch transactions
    sessionStorage.setItem(SessionEnum.sendBatchTransactionsOnDemand, 'true');
    setSendBatchTransactionsOnDemand(true);

    const { transactions, order } = payload;

    const { sessionId, error } = await sendTransactions({
      transactions,
      signWithoutSending: true,
      callbackRoute: window.location.pathname,
      customTransactionInformation: { redirectAfterSign: true }
    });

    if (error) {
      console.error('Could not execute transactions', error);
      return;
    }

    if (order) {
      setTransactionsOrder(order);
    }

    const newBatchSessionId = Date.now().toString();
    // sdk-dapp by default takes the last session id from sdk-dapp’s redux store on page refresh
    // in order to differentiate the transactions between widgets, a persistence of sessionId is needed
    sessionStorage.setItem(SessionEnum.batchSessionId, newBatchSessionId);
    sessionStorage.setItem(SessionEnum.signedSessionId, sessionId);

    setBatchSessionId(newBatchSessionId);
    setCurrentSessionId(sessionId);
  };

  const executeBatchTransactions = () => {
    const payload = getBatchTransactions(address);
    executeTransactions(payload);
  };

  const executeSwapAndLockTransactions = () => {
    const payload = getSwapAndLockTransactions(address);
    executeTransactions(payload);
  };

  // If manual batch transactions are executed, track the batchId
  useEffect(() => {
    if (batchId) {
      setTrackBatchId(batchId);
    }
  }, [batchId]);

  useEffect(() => {
    if (trackBatchId && batches[trackBatchId]) {
      setStateTransactions(batches[trackBatchId].transactions.flat());
    }
  }, [trackBatchId, batches]);

  return (
    <div className='flex flex-col gap-6'>
      <div className='flex flex-col md:flex-row gap-2 items-start'>
        <Button
          onClick={signAndAutoSendBatchTransactions}
          disabled={hasPendingTransactions}
        >
          <FontAwesomeIcon icon={faPaperPlane} className='mr-1' />
          Sign & send batch
        </Button>

        <Button
          onClick={executeBatchTransactions}
          disabled={hasPendingTransactions}
        >
          <FontAwesomeIcon icon={faPaperPlane} className='mr-1' />
          Sign batch & controlled sending
        </Button>

        <Button
          onClick={executeSwapAndLockTransactions}
          disabled={hasPendingTransactions}
        >
          <FontAwesomeIcon icon={faArrowsRotate} className='mr-1' />
          Swap & Lock
        </Button>
      </div>

      <OutputContainer>
        {stateTransactions && (
          <TransactionsOutput transactions={stateTransactions} />
        )}
      </OutputContainer>
    </div>
  );
};
