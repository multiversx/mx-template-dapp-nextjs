import { getIsProviderEqualTo, getWindowLocation } from '@/utils/sdkDappUtils';
import { LoginMethodsEnum } from '@/types/sdkDappTypes';

// relative is the relative path for the callbackUrl
// for signMessage it is necessary to send the full url Ex: https:localhost:3002/dashboard#sign-message
type GetCallbackUrlProps = {
  anchor?: string;
  relative?: boolean;
};

export const getCallbackUrl = ({
  anchor,
  relative = true
}: GetCallbackUrlProps) => {
  const { pathname, origin } = getWindowLocation();
  const isWebWallet = getIsProviderEqualTo(LoginMethodsEnum.wallet);

  if (!isWebWallet || !pathname || !origin) {
    return '';
  }

  const basePath = relative ? `${pathname}` : `${origin}${pathname}`;

  if (anchor) {
    return `${basePath}#${anchor}`;
  }

  return basePath;
};
