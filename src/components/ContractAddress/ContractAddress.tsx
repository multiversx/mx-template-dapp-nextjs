import { contractAddress } from '@/config';
import { MvxExplorerLink } from '@/lib';
import { Label } from '@/components/Label';
import { ACCOUNTS_ENDPOINT } from '@/localConstants';

export const ContractAddress = () => {
  return (
    <p>
      <Label>Contract: </Label>
      <MvxExplorerLink
        link={`/${ACCOUNTS_ENDPOINT}/${contractAddress}`}
        class='border-b border-dotted border-gray-500 hover:border-solid hover:border-gray-800'
        text={contractAddress}
      />
    </p>
  );
};
