import { contractAddress } from '@/config';
import { MvxExplorerLink } from '../sdkDappCoreUIComponents';
import { Label } from '@/components/Label';
import { ACCOUNTS_ENDPOINT } from '@/localConstants';

export const ContractAddress = () => {
  return (
    <p>
      <Label>Contract: </Label>
      <MvxExplorerLink
        page={`/${ACCOUNTS_ENDPOINT}/${contractAddress}`}
        className='border-b border-dotted border-gray-500 hover:border-solid hover:border-gray-800'
      >
        {contractAddress}
      </MvxExplorerLink>
    </p>
  );
};
