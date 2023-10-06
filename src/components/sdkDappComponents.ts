'use client';

import dynamic from 'next/dynamic';

export const TransactionsTable = dynamic(
  async () => {
    return (await import('@multiversx/sdk-dapp/UI/TransactionsTable'))
      .TransactionsTable;
  },
  { ssr: false }
);

export const Loader = dynamic(
  async () => {
    return (await import('@multiversx/sdk-dapp/UI/Loader')).Loader;
  },
  { ssr: false }
);

export const PageState = dynamic(
  async () => {
    return (await import('@multiversx/sdk-dapp/UI/PageState')).PageState;
  },
  { ssr: false }
);

export const SignTransactionsModals = dynamic(
  async () => {
    return (await import('@multiversx/sdk-dapp/UI/SignTransactionsModals'))
      .SignTransactionsModals;
  },
  { ssr: false }
);
export const NotificationModal = dynamic(
  async () => {
    return (await import('@multiversx/sdk-dapp/UI/NotificationModal'))
      .NotificationModal;
  },
  { ssr: false }
);
export const TransactionsToastList = dynamic(
  async () => {
    return (await import('@multiversx/sdk-dapp/UI/TransactionsToastList'))
      .TransactionsToastList;
  },
  { ssr: false }
);

export const ExtensionLoginButton = dynamic(
  async () => {
    return (
      await import('@multiversx/sdk-dapp/UI/extension/ExtensionLoginButton')
    ).ExtensionLoginButton;
  },
  { ssr: false }
);

export const OperaWalletLoginButton = dynamic(
  async () => {
    return (
      await import(
        '@multiversx/sdk-dapp/UI/operaWallet/OperaWalletLoginButton/OperaWalletLoginButton'
      )
    ).OperaWalletLoginButton;
  },
  { ssr: false }
);

export const WalletConnectLoginButton = dynamic(
  async () => {
    return (
      await import(
        '@multiversx/sdk-dapp/UI/walletConnect/WalletConnectLoginButton'
      )
    ).WalletConnectLoginButton;
  },
  { ssr: false }
);

export const LedgerLoginButton = dynamic(
  async () => {
    return (await import('@multiversx/sdk-dapp/UI/ledger/LedgerLoginButton'))
      .LedgerLoginButton;
  },
  { ssr: false }
);

export const WebWalletLoginButton = dynamic(
  async () => {
    return (
      await import('@multiversx/sdk-dapp/UI/webWallet/WebWalletLoginButton')
    ).WebWalletLoginButton;
  },
  { ssr: false }
);

export const FormatAmount = dynamic(
  async () => {
    return (await import('@multiversx/sdk-dapp/UI/FormatAmount')).FormatAmount;
  },
  { ssr: false }
);

export const CopyButton = dynamic(
  async () => {
    return (await import('@multiversx/sdk-dapp/UI/CopyButton')).CopyButton;
  },
  { ssr: false }
);

export const TransactionRow = dynamic(
  async () => {
    return (
      await import(
        '@multiversx/sdk-dapp/UI/TransactionsTable/components/TransactionRow'
      )
    ).TransactionRow;
  },
  { ssr: false }
);

export const ExplorerLink = dynamic(
  async () => {
    return (await import('@multiversx/sdk-dapp/UI/ExplorerLink')).ExplorerLink;
  },
  { ssr: false }
);

export const DappProvider = dynamic(
  async () => {
    return (await import('@multiversx/sdk-dapp/wrappers/DappProvider')).DappProvider;
  },
  { ssr: false }
);