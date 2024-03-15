'use client';
import { useState, useCallback } from 'react';
import {
  deleteTransactionToast,
  removeAllSignedTransactions,
  removeAllTransactionsToSign
} from '@multiversx/sdk-dapp/services/transactions/clearTransactions';
import { contractAddress } from '@/config';
import { signAndSendTransactions } from '@/helpers/signAndSendTransactions';
import {
  useGetAccountInfo,
  useGetNetworkConfig,
  useTrackTransactionStatus
} from '@/hooks/sdkDappHooks';
import { GAS_PRICE, SessionEnum, VERSION } from '@/localConstants';
import { getChainId } from '@/utils/getChainId';
import { smartContract } from '@/utils/smartContract';
import {
  PingRawProps,
  PingPongServiceProps,
  PongRawProps
} from '@/types/pingPong.types';
import { newTransaction } from '@/helpers/sdkDappHelpers';
import { Transaction } from '@/types/sdkCoreTypes';
import { Address } from '@multiversx/sdk-core';

type PingPongTransactionProps = {
  type: SessionEnum;
};

const PING_TRANSACTION_INFO = {
  processingMessage: 'Processing Ping transaction',
  errorMessage: 'An error has occured during Ping',
  successMessage: 'Ping transaction successful'
};

const PONG_TRANSACTION_INFO = {
  processingMessage: 'Processing Pong transaction',
  errorMessage: 'An error has occured during Pong',
  successMessage: 'Pong transaction successful'
};

export const useSendPingPongTransaction = ({
  type
}: PingPongTransactionProps) => {
  const [pingPongSessionId, setPingPongSessionId] = useState(
    sessionStorage.getItem(type)
  );

  const network = useGetNetworkConfig();
  const { address, account } = useGetAccountInfo();

  const transactionStatus = useTrackTransactionStatus({
    transactionId: pingPongSessionId ?? '0'
  });

  const clearAllTransactions = () => {
    removeAllSignedTransactions();
    removeAllTransactionsToSign();
    deleteTransactionToast(pingPongSessionId ?? '');
  };

  const sendPingTransactionFromAbi = useCallback(
    async ({ amount, callbackRoute }: PingRawProps) => {
      clearAllTransactions();

      const pingTransaction = smartContract.methodsExplicit
        .ping()
        .withValue(amount ?? '0')
        .withGasLimit(60000000)
        .withChainID(getChainId())
        .withSender(new Address(address))
        .buildTransaction();

      const sessionId = await signAndSendTransactions({
        transactions: [pingTransaction],
        callbackRoute,
        transactionsDisplayInfo: PING_TRANSACTION_INFO
      });

      sessionStorage.setItem(type, sessionId);
      setPingPongSessionId(sessionId);
    },
    []
  );

  const sendPongTransactionFromAbi = useCallback(
    async ({ callbackRoute }: PongRawProps) => {
      clearAllTransactions();

      const pongTransaction = smartContract.methodsExplicit
        .pong()
        .withValue('0')
        .withGasLimit(60000000)
        .withChainID(getChainId())
        .withSender(new Address(address))
        .buildTransaction();

      const sessionId = await signAndSendTransactions({
        transactions: [pongTransaction],
        callbackRoute,
        transactionsDisplayInfo: PONG_TRANSACTION_INFO
      });

      sessionStorage.setItem(type, sessionId);
      setPingPongSessionId(sessionId);
    },
    []
  );

  const sendPingTransaction = useCallback(
    async ({ amount, callbackRoute }: PingRawProps) => {
      clearAllTransactions();

      const pingTransaction = newTransaction({
        value: amount,
        data: 'ping',
        receiver: contractAddress,
        gasLimit: 60000000,
        gasPrice: GAS_PRICE,
        chainID: network.chainID,
        nonce: account.nonce,
        sender: address,
        version: VERSION
      }) as unknown as Transaction;

      const sessionId = await signAndSendTransactions({
        transactions: [pingTransaction],
        callbackRoute,
        transactionsDisplayInfo: PING_TRANSACTION_INFO
      });

      sessionStorage.setItem(type, sessionId);
      setPingPongSessionId(sessionId);
    },
    []
  );

  const sendPongTransaction = useCallback(
    async ({ callbackRoute }: PongRawProps) => {
      clearAllTransactions();

      const pongTransaction = newTransaction({
        value: '0',
        data: 'pong',
        receiver: contractAddress,
        gasLimit: 60000000,
        gasPrice: GAS_PRICE,
        chainID: network.chainID,
        nonce: account.nonce,
        sender: address,
        version: VERSION
      }) as unknown as Transaction;

      const sessionId = await signAndSendTransactions({
        transactions: [pongTransaction],
        callbackRoute,
        transactionsDisplayInfo: PONG_TRANSACTION_INFO
      });

      sessionStorage.setItem(type, sessionId);
      setPingPongSessionId(sessionId);
    },
    []
  );

  const sendPingTransactionFromService = useCallback(
    async ({ transactions, callbackRoute }: PingPongServiceProps) => {
      clearAllTransactions();

      const sessionId = await signAndSendTransactions({
        transactions,
        callbackRoute,
        transactionsDisplayInfo: PING_TRANSACTION_INFO
      });

      sessionStorage.setItem(type, sessionId);
      setPingPongSessionId(sessionId);
    },
    []
  );

  const sendPongTransactionFromService = useCallback(
    async ({ transactions, callbackRoute }: PingPongServiceProps) => {
      clearAllTransactions();

      const sessionId = await signAndSendTransactions({
        transactions,
        callbackRoute,
        transactionsDisplayInfo: PONG_TRANSACTION_INFO
      });

      sessionStorage.setItem(type, sessionId);
      setPingPongSessionId(sessionId);
    },
    []
  );

  return {
    sendPingTransaction,
    sendPongTransaction,
    sendPingTransactionFromAbi,
    sendPongTransactionFromAbi,
    sendPingTransactionFromService,
    sendPongTransactionFromService,
    transactionStatus
  };
};
