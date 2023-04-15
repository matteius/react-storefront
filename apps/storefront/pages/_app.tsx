import "styles/globals.css";

import { ApolloProvider } from "@apollo/client";
import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { NextPage } from "next";
import { AppProps } from "next/app";
import Script from "next/script";
import NextNProgress from "nextjs-progressbar";
import React, { ReactElement, ReactNode, useEffect } from "react";

import { RegionsProvider } from "@/components/RegionsProvider";
import { BaseSeo } from "@/components/seo/BaseSeo";
import { API_URI } from "@/lib/const";
import { CheckoutProvider } from "@/lib/providers/CheckoutProvider";
import { useAuthenticatedApolloClient } from "@/lib/auth/useAuthenticatedApolloClient";
import { SaleorAuthProvider, useAuthChange, useSaleorAuthClient } from "@/lib/auth";

import firebaseConfig from "../firebase";

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page: ReactElement) => page);
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    const firebaseApp = initializeApp(firebaseConfig);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    getAnalytics(firebaseApp);
  }, []);

  const useSaleorAuthClientProps = useSaleorAuthClient({
    saleorApiUrl: API_URI,
    storage: typeof window !== "undefined" ? window.localStorage : undefined,
  });

  const { saleorAuthClient } = useSaleorAuthClientProps;

  const { apolloClient, resetClient } = useAuthenticatedApolloClient(
    saleorAuthClient.fetchWithAuth
  );

  useAuthChange({
    onSignedOut: () => resetClient(),
    onSignedIn: () =>
      apolloClient.refetchQueries({
        include: ["User"],
      }),
  });

  return (
    <>
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        onLoad={() => {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-call
          const firebaseApp = initializeApp(firebaseConfig);
          // eslint-disable-next-line @typescript-eslint/no-unsafe-call
          getAnalytics(firebaseApp);
        }}
      />
      <SaleorAuthProvider {...useSaleorAuthClientProps}>
        <ApolloProvider client={apolloClient}>
          <CheckoutProvider>
            <RegionsProvider>
              <BaseSeo />
              <NextNProgress color="#5B68E4" options={{ showSpinner: false }} />
              {getLayout(<Component {...pageProps} />)}
            </RegionsProvider>
          </CheckoutProvider>
        </ApolloProvider>
      </SaleorAuthProvider>
    </>
  );
}

export default MyApp;
