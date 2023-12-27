import { LoginMethodsEnum } from '@/types/sdkDappTypes';
import { useGetAccountProvider } from './sdkDappHooks';

export const useIsWebProvider = () => {
  const { providerType } = useGetAccountProvider();
  const isWebWallet = providerType === LoginMethodsEnum.wallet;

  return { isWebWallet };
};
