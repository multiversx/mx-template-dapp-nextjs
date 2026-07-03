import BigNumber from 'bignumber.js';
import { safeWindow } from '@/lib';

const WALLET_PROVIDER_SEND_TRANSACTION_URL = 'hook/transaction';

/**
 * For documentation, check out {@link https://docs.multiversx.com/wallet/webhooks#send-transaction-hook send transaciton hook}
 */
export const getTransactionUrl = (walletAddress: string) => {
  const walletBaseUrl = `${walletAddress}/${WALLET_PROVIDER_SEND_TRANSACTION_URL}`;

  const receiver =
    'erd1deaddeaddeaddeaddeaddeaddeaddeaddeaddeaddeaddeaddeaqtv0gag'; // add your receiver address here
  const data = 'Hello_world';
  const value = new BigNumber('0.01').shiftedBy(18).toFixed();
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
