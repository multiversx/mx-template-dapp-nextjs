import { useAxiosInterceptorContext } from "@multiversx/sdk-dapp/wrappers/AxiosInterceptorContext";
import { useMemo } from "react";

export const useGetNativeAuthToken = () => {
  const {
    loginInfo: { tokenLogin },
  } = useAxiosInterceptorContext();
  return useMemo(() => tokenLogin?.nativeAuthToken, [tokenLogin]);
};
