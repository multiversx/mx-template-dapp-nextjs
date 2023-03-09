import dynamic from "next/dynamic";

export const TransactionsTable = dynamic(
  async () => {
    return (await import("@multiversx/sdk-dapp/UI/TransactionsTable"))
      .TransactionsTable;
  },
  { ssr: false }
);

export const Loader = dynamic(
  async () => {
    return (await import("@multiversx/sdk-dapp/UI/Loader")).Loader;
  },
  { ssr: false }
);

export const PageState = dynamic(
  async () => {
    return (await import("@multiversx/sdk-dapp/UI/PageState")).PageState;
  },
  { ssr: false }
);
