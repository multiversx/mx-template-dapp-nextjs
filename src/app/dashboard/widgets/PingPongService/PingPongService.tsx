'use client';
import { faArrowDown, faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import moment from 'moment';
import { useEffect, useState } from 'react';
import {
  Button,
  ContractAddress,
  Label,
  MissingNativeAuthError,
  OutputContainer,
  PingPongOutput
} from '@/components';
import { getCountdownSeconds, setTimeRemaining } from '@/helpers';
import { useSendPingPongTransaction } from '@/hooks';
import { useGetLoginInfo, useGetPendingTransactions } from '@/lib';
import {
  useGetPingTransaction,
  useGetPongTransaction,
  useGetTimeToPong
} from './hooks';

// The transactions are being done by directly requesting to template-dapp service
export const PingPongService = () => {
  const [hasPing, setHasPing] = useState(true);
  const [secondsLeft, setSecondsLeft] = useState(0);

  const { sendPingTransactionFromService, sendPongTransactionFromService } =
    useSendPingPongTransaction();
  const getTimeToPong = useGetTimeToPong();
  const getPingTransaction = useGetPingTransaction();
  const getPongTransaction = useGetPongTransaction();
  const transactions = useGetPendingTransactions();
  const hasPendingTransactions = transactions.length > 0;

  const { tokenLogin } = useGetLoginInfo();

  const setSecondsRemaining = async () => {
    if (!tokenLogin?.nativeAuthToken) {
      return;
    }

    const secondsRemaining = await getTimeToPong();
    const { canPing, timeRemaining } = setTimeRemaining(secondsRemaining);

    setHasPing(canPing);
    if (timeRemaining && timeRemaining >= 0) {
      setSecondsLeft(timeRemaining);
    }
  };

  const onSendPingTransaction = async () => {
    const pingTransaction = await getPingTransaction();

    if (!pingTransaction) {
      return;
    }

    await sendPingTransactionFromService([pingTransaction]);
  };

  const onSendPongTransaction = async () => {
    const pongTransaction = await getPongTransaction();

    if (!pongTransaction) {
      return;
    }

    await sendPongTransactionFromService([pongTransaction]);
  };

  const timeRemaining = moment()
    .startOf('day')
    .seconds(secondsLeft ?? 0)
    .format('mm:ss');

  const pongAllowed = secondsLeft === 0;

  useEffect(() => {
    getCountdownSeconds({ secondsLeft, setSecondsLeft });
  }, [hasPing]);

  useEffect(() => {
    setSecondsRemaining();
  }, [hasPendingTransactions]);

  if (!tokenLogin?.nativeAuthToken) {
    return <MissingNativeAuthError />;
  }

  const isPingDisabled = !hasPing || hasPendingTransactions;
  const isPongDisabled = !pongAllowed || hasPing || hasPendingTransactions;

  return (
    <div className='flex flex-col gap-6'>
      <div className='flex flex-col gap-2'>
        <div className='flex justify-start gap-2'>
          <Button
            disabled={isPingDisabled}
            onClick={onSendPingTransaction}
            data-testid='btnPingService'
            data-cy='transactionBtn'
          >
            <FontAwesomeIcon icon={faArrowUp} className='mr-1' />
            Ping
          </Button>

          <Button
            disabled={isPongDisabled}
            data-testid='btnPongService'
            data-cy='transactionBtn'
            onClick={onSendPongTransaction}
          >
            <FontAwesomeIcon icon={faArrowDown} className='mr-1' />
            Pong
          </Button>
        </div>
      </div>

      <OutputContainer>
        {!hasPendingTransactions && (
          <>
            <ContractAddress />
            {!pongAllowed && (
              <p>
                <Label>Time remaining: </Label>
                <span className='text-red-600'>{timeRemaining}</span> until able
                to pong
              </p>
            )}
          </>
        )}
        <PingPongOutput
          transactions={transactions}
          pongAllowed={pongAllowed}
          timeRemaining={timeRemaining}
        />
      </OutputContainer>
    </div>
  );
};
