'use client';
import { MvxFormatAmount, OutputContainer, Label } from '@/components';
import { useGetAccountInfo, useGetNetworkConfig } from '@/lib';
import { Username } from './components';

export const Account = () => {
  const { address, account } = useGetAccountInfo();
  const { network } = useGetNetworkConfig();

  return (
    <OutputContainer>
      <div className='flex flex-col text-black' data-testid='topInfo'>
        <p className='truncate'>
          <Label>Address: </Label>
          <span data-testid='accountAddress'> {address}</span>
        </p>

        <Username account={account} />

        <p>
          <Label>Shard: </Label>
          {account.shard}
        </p>

        <p>
          <Label>Balance: </Label>
          <MvxFormatAmount
            value={account.balance}
            egldLabel={network.egldLabel}
            data-testid='balance'
          />
        </p>
      </div>
    </OutputContainer>
  );
};
