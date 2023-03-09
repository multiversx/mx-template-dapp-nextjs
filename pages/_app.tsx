import "../styles/globals.css";
import "../public/assets/sass/theme.scss";
import type { AppProps } from "next/app";
import { DappProvider } from "@multiversx/sdk-dapp/wrappers/DappProvider";
import { AxiosInterceptorContext } from "@multiversx/sdk-dapp/wrappers/AxiosInterceptorContext";
import { EnvironmentsEnum } from "@multiversx/sdk-dapp/types";
import dynamic from "next/dynamic";
import * as React from "react";
import {
  apiTimeout,
  walletConnectV2ProjectId,
  sampleAuthenticatedDomains,
} from "../config";
import { Layout } from "../components/Layout";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
config.autoAddCss = false;

const SignTransactionsModals = dynamic(
  async () => {
    return (await import("@multiversx/sdk-dapp/UI/SignTransactionsModals"))
      .SignTransactionsModals;
  },
  { ssr: false }
);
const NotificationModal = dynamic(
  async () => {
    return (await import("@multiversx/sdk-dapp/UI/NotificationModal"))
      .NotificationModal;
  },
  { ssr: false }
);
const TransactionsToastList = dynamic(
  async () => {
    return (await import("@multiversx/sdk-dapp/UI/TransactionsToastList"))
      .TransactionsToastList;
  },
  { ssr: false }
);

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AxiosInterceptorContext.Provider>
      <AxiosInterceptorContext.Interceptor
        authenticatedDomanis={sampleAuthenticatedDomains}
      >
        <DappProvider
          environment={EnvironmentsEnum.devnet}
          customNetworkConfig={{
            name: "customConfig",
            apiTimeout,
            walletConnectV2ProjectId,
          }}
        >
          <Layout>
            <AxiosInterceptorContext.Listener />
            <TransactionsToastList />
            <NotificationModal />
            <SignTransactionsModals className="custom-class-for-modals" />
            <Component {...pageProps} />
          </Layout>
        </DappProvider>
      </AxiosInterceptorContext.Interceptor>
    </AxiosInterceptorContext.Provider>
  );
}
