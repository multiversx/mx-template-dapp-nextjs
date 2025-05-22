import { ContractAddress } from '@/components/ContractAddress';
import { SignedTransactionType } from '@/lib';
import { TransactionsOutput } from './TransactionsOutput';
import { Label } from '@/components/Label';

type PingPongOutputType = {
  timeRemaining: string;
  pongAllowed: boolean;
  transactions?: SignedTransactionType[] | null;
};

export const PingPongOutput = ({
  timeRemaining,
  pongAllowed,
  transactions
}: PingPongOutputType) => {
  if (!transactions) {
    return null;
  }

  return (
    <>
      <ContractAddress />
      <TransactionsOutput transactions={transactions} />
      {!pongAllowed && (
        <p>
          <Label>Time remaining: </Label>
          <span className='text-red-600'>{timeRemaining}</span> until able to
          pong
        </p>
      )}
    </>
  );
};
