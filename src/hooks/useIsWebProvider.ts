import { ProviderTypeEnum } from '@/types/sdkDappTypes';
import { useGetLoginInfo } from './sdkDappHooks';

export const useIsWebProvider = () => {
  const { providerType } = useGetLoginInfo();
  const isWebProvider = providerType === ProviderTypeEnum.webview;

  return { isWebProvider };
};
