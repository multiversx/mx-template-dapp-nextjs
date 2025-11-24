import { safeWindow, TokenTransfer } from '@/lib';

/**
 * For documentation, check out {@link https://docs.multiversx.com/wallet/webhooks#send-transaction-hook send transaciton hook}
 */
export const getTransactionUrl = (walletAddress: string) => {
  const walletBaseUrl = `${walletAddress}/hook/transaction`;

  console.log('test');
  const receiver =
    'erd1deaddeaddeaddeaddeaddeaddeaddeaddeaddeaddeaddeaddeaqtv0gag'; // add your receiver address here
  const data = 'Hello_world';
  const value = TokenTransfer.newFromNativeAmount(
    BigInt(1_000_000_000_000_000)
  ).toString(); // 0.001 EGLD
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
