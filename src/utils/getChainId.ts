import { environment } from '@/config';
import { chainIdByEnvironment } from '@multiversx/sdk-dapp/constants/network';

export const getChainId = () => {
  return chainIdByEnvironment[environment];
};
