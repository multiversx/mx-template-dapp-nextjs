import { useSendPingPongTransaction } from '@/hooks';

import { useGetPingAmount, useGetTimeToPong } from './hooks';
import { PingPongComponent } from '@/components';
import { ItemsIdentifiersEnum } from '../../dashboard.types';

export const PingPongAbi = () => {
  const getTimeToPong = useGetTimeToPong();
  const { sendPingTransactionFromAbi, sendPongTransactionFromAbi } =
    useSendPingPongTransaction();
  const pingAmount = useGetPingAmount();

  return (
    <PingPongComponent
      id={ItemsIdentifiersEnum.pingPongAbi}
      sendPingTransaction={sendPingTransactionFromAbi}
      sendPongTransaction={sendPongTransactionFromAbi}
      getTimeToPong={getTimeToPong}
      pingAmount={pingAmount}
    />
  );
};
