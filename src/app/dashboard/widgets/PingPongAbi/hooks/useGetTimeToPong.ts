import { contractAddress } from '@/config';
import {
  ProxyNetworkProvider,
  Address,
  AddressValue,
  SmartContractController,
  AbiRegistry,
  useGetAccount,
  useGetNetworkConfig,
  useGetLoginInfo
} from '@/lib';
import pingPongAbi from '@/contracts/ping-pong.abi.json';

export const useGetTimeToPong = () => {
  const { network } = useGetNetworkConfig();
  const { address } = useGetAccount();
  const loginInfo = useGetLoginInfo();

  const getTimeToPong = async () => {
    if (!address || !loginInfo.tokenLogin?.nativeAuthToken) {
      return;
    }

    try {
      const proxy = new ProxyNetworkProvider(network.apiAddress, {
        headers: {
          Authorization: `Bearer ${loginInfo.tokenLogin.nativeAuthToken}`
        }
      });

      const abi = AbiRegistry.create(pingPongAbi);

      const scController = new SmartContractController({
        chainID: network.chainId,
        networkProvider: proxy,
        abi
      });

      const result = await scController.query({
        contract: Address.newFromBech32(contractAddress),
        function: 'getTimeToPong',
        arguments: [new AddressValue(new Address(address))]
      });

      console.log({ result });
      const value = result?.valueOf();
      const secondsRemaining: number = Number(value);

      return secondsRemaining;
    } catch (err) {
      console.error('Unable to call getTimeToPong', err);
    }
  };

  return getTimeToPong;
};
