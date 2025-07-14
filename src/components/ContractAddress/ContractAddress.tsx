import { contractAddress } from '@/config';
import { MvxExplorerLink, useGetNetworkConfig } from '@/lib';
import { Label } from '@/components/Label';
import { ACCOUNTS_ENDPOINT } from '@/localConstants';
import { getExplorerLink } from '@multiversx/sdk-dapp/out/utils/transactions/getExplorerLink';

export const ContractAddress = () => {
  const { network } = useGetNetworkConfig();
  const explorerAddress = network.explorerAddress;
  const explorerLink = getExplorerLink({
    to: `/${ACCOUNTS_ENDPOINT}/${contractAddress}`,
    explorerAddress
  });

  return (
    <p>
      <Label>Contract: </Label>
      <MvxExplorerLink
        link={explorerLink}
        class='border-b border-dotted border-gray-500 hover:border-solid hover:border-gray-800'
      >
        {contractAddress}
      </MvxExplorerLink>
    </p>
  );
};
