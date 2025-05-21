import { contractAddress } from '@/config';
import { MvxExplorerLink, useGetNetworkConfig } from '@/lib';
import { Label } from '@/components/Label';
import { ACCOUNTS_ENDPOINT } from '@/localConstants';

export const ContractAddress = () => {
  const { network } = useGetNetworkConfig();

  return (
    <p>
      <Label>Contract: </Label>
      <MvxExplorerLink
        link={`${network.explorerAddress}/${ACCOUNTS_ENDPOINT}/${contractAddress}`}
        class='border-b border-dotted border-gray-500 hover:border-solid hover:border-gray-800'
        text={contractAddress}
      />
    </p>
  );
};
