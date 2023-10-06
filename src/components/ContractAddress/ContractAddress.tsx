import { ACCOUNTS_ENDPOINT } from '@multiversx/sdk-dapp/apiCalls/endpoints';
import { contractAddress } from '@/config';
import { ExplorerLink } from '../sdkDappComponents';
import { Label } from '@/components/Label';

export const ContractAddress = () => {
  return (
    <p>
      <Label>Contract: </Label>
      <ExplorerLink
        page={`/${ACCOUNTS_ENDPOINT}/${contractAddress}`}
        className='border-b border-dotted border-gray-500 hover:border-solid hover:border-gray-800'
      >
        {contractAddress}
      </ExplorerLink>
    </p>
  );
};
