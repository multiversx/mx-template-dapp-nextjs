'use client';
import { OutputContainer, Label } from '@/components';
import {
  useGetAccountInfo,
  useGetNetworkConfig,
  MvxFormatAmount,
  FormatAmountController,
  DIGITS,
  DECIMALS
} from '@/lib';
import { Username } from './components';

export const Account = () => {
  const { address, account } = useGetAccountInfo();
  const { network } = useGetNetworkConfig();

  const { isValid, valueDecimal, valueInteger, label } =
    FormatAmountController.getData({
      digits: DIGITS,
      decimals: DECIMALS,
      egldLabel: network.egldLabel,
      input: account.balance
    });

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
            isValid={isValid}
            valueInteger={valueInteger}
            valueDecimal={valueDecimal}
            label={label}
            data-testid='balance'
          />
        </p>
      </div>
    </OutputContainer>
  );
};
