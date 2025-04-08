import { TokenTransfer } from '@multiversx/sdk-core';
import { WALLET_PROVIDER_SEND_TRANSACTION_URL } from './sdkDappHelpers';
import { safeWindow } from '@/utils';

/**
 * For documentation, check out {@link https://docs.multiversx.com/wallet/webhooks#send-transaction-hook send transaciton hook}
 */
export const getTransactionUrl = (walletAddress: string) => {
  const walletBaseUrl = `${walletAddress}/${WALLET_PROVIDER_SEND_TRANSACTION_URL}`;

  const receiver =
    'erd1deaddeaddeaddeaddeaddeaddeaddeaddeaddeaddeaddeaddeaqtv0gag'; // add your receiver address here
  const data = 'Hello_world';
  const value = TokenTransfer.egldFromAmount('0.01').toString();
  const callbackUrl = encodeURIComponent(safeWindow.origin ?? '');

  const searchParams = {
    receiver,
    value,
    data,
    callbackUrl
  };

  const search = new URLSearchParams(searchParams).toString();

  const walletUrl = `${walletBaseUrl}?${search}`;
  return walletUrl;
};
