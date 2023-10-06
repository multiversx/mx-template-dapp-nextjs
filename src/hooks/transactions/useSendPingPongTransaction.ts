'use client';
import { useState } from 'react';
import {
  deleteTransactionToast,
  removeAllSignedTransactions,
  removeAllTransactionsToSign
} from '@multiversx/sdk-dapp/services/transactions/clearTransactions';
import { contractAddress } from '@/config';
import { refreshAccount, sendTransactions } from '@/helpers';
import { useTrackTransactionStatus } from '@multiversx/sdk-dapp/hooks/transactions/useTrackTransactionStatus';
import { SessionEnum } from '@/localConstants';
import { IPlainTransactionObject } from '@/types/sdkCoreTypes';
import { getChainId } from '@/utils/getChainId';
import { smartContract } from '@/utils/smartContract';

export const useSendPingPongTransaction = (type: SessionEnum) => {
  const [pingPongSessionId, setPingPongSessionId] = useState(
    sessionStorage.getItem(type)
  );

  const transactionStatus = useTrackTransactionStatus({
    transactionId: pingPongSessionId ?? '0'
  });

  const clearAllTransactions = () => {
    removeAllSignedTransactions();
    removeAllTransactionsToSign();
    deleteTransactionToast(pingPongSessionId ?? '');
  };

  const sendPingTransactionFromAbi = async (amount?: string) => {
    clearAllTransactions();

    const pingTransaction = smartContract.methodsExplicit
      .ping()
      .withValue(amount ?? '0')
      .withGasLimit(60000000)
      .withChainID(getChainId())
      .buildTransaction()
      .toPlainObject();

    await refreshAccount();
    const { sessionId } = await sendTransactions({
      transactions: pingTransaction,
      transactionsDisplayInfo: {
        processingMessage: 'Processing Ping transaction',
        errorMessage: 'An error has occured during Ping',
        successMessage: 'Ping transaction successful'
      },
      redirectAfterSign: false
    });

    sessionStorage.setItem(type, sessionId);
    setPingPongSessionId(sessionId);
  };

  const sendPongTransactionFromAbi = async () => {
    clearAllTransactions();

    const pongTransaction = smartContract.methodsExplicit
      .pong()
      .withValue('0')
      .withGasLimit(60000000)
      .withChainID(getChainId())
      .buildTransaction()
      .toPlainObject();

    await refreshAccount();
    const { sessionId } = await sendTransactions({
      transactions: pongTransaction,
      transactionsDisplayInfo: {
        processingMessage: 'Processing Pong transaction',
        errorMessage: 'An error has occured during Pong',
        successMessage: 'Pong transaction successful'
      },
      redirectAfterSign: false
    });

    sessionStorage.setItem(type, sessionId);
    setPingPongSessionId(sessionId);
  };

  const onSendPingTransaction = async (amount?: string) => {
    clearAllTransactions();

    const pingTransaction = {
      value: amount,
      data: 'ping',
      receiver: contractAddress,
      gasLimit: '60000000'
    };

    await refreshAccount();
    const { sessionId } = await sendTransactions({
      transactions: pingTransaction,
      transactionsDisplayInfo: {
        processingMessage: 'Processing Ping transaction',
        errorMessage: 'An error has occured during Ping',
        successMessage: 'Ping transaction successful'
      },
      redirectAfterSign: false
    });

    sessionStorage.setItem(type, sessionId);
    setPingPongSessionId(sessionId);
  };

  const onSendPongTransaction = async () => {
    clearAllTransactions();

    const pongTransaction = {
      value: '0',
      data: 'pong',
      receiver: contractAddress,
      gasLimit: '60000000'
    };

    await refreshAccount();
    const { sessionId } = await sendTransactions({
      transactions: pongTransaction,
      transactionsDisplayInfo: {
        processingMessage: 'Processing Pong transaction',
        errorMessage: 'An error has occured during Pong',
        successMessage: 'Pong transaction successful'
      },
      redirectAfterSign: false
    });

    sessionStorage.setItem(type, sessionId);
    setPingPongSessionId(sessionId);
  };

  const sendPingTransactionFromService = async (
    transaction: IPlainTransactionObject
  ) => {
    clearAllTransactions();

    await refreshAccount();
    const { sessionId } = await sendTransactions({
      transactions: [transaction],
      transactionsDisplayInfo: {
        processingMessage: 'Processing Ping transaction',
        errorMessage: 'An error has occured during Ping',
        successMessage: 'Ping transaction successful'
      },
      redirectAfterSign: false
    });

    sessionStorage.setItem(type, sessionId);
    setPingPongSessionId(sessionId);
  };

  const sendPongTransactionFromService = async (
    transaction: IPlainTransactionObject
  ) => {
    clearAllTransactions();

    await refreshAccount();
    const { sessionId } = await sendTransactions({
      transactions: [transaction],
      transactionsDisplayInfo: {
        processingMessage: 'Processing Pong transaction',
        errorMessage: 'An error has occured during Pong',
        successMessage: 'Pong transaction successful'
      },
      redirectAfterSign: false
    });

    sessionStorage.setItem(type, sessionId);
    setPingPongSessionId(sessionId);
  };

  return {
    onSendPingTransaction,
    onSendPongTransaction,
    sendPingTransactionFromAbi,
    sendPongTransactionFromAbi,
    sendPingTransactionFromService,
    sendPongTransactionFromService,
    transactionStatus
  };
};
