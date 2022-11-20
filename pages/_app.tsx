import "styles/globals.css";

import { ApolloProvider } from "@apollo/client";
import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { NextPage } from "next";
import { AppProps } from "next/app";
import Script from "next/script";
import NextNProgress from "nextjs-progressbar";
import React, { ReactElement, ReactNode, useEffect } from "react";

import { DemoBanner } from "@/components/DemoBanner";
import { RegionsProvider } from "@/components/RegionsProvider";
import { SaleorProviderWithChannels } from "@/components/SaleorProviderWithChannels";
import { DEMO_MODE } from "@/lib/const";
import apolloClient from "@/lib/graphql";
import { CheckoutProvider } from "@/lib/providers/CheckoutProvider";

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
    const firebaseApp = initializeApp(firebaseConfig);
    getAnalytics(firebaseApp);
  }, []);

  return (
    <>
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        onLoad={() => {
          const firebaseApp = initializeApp(firebaseConfig);
          getAnalytics(firebaseApp);
        }}
      />
      <ApolloProvider client={apolloClient}>
        <CheckoutProvider>
          <RegionsProvider>
            <SaleorProviderWithChannels>
              <NextNProgress color="#5B68E4" options={{ showSpinner: false }} />
              {DEMO_MODE && <DemoBanner />}
              {getLayout(<Component {...pageProps} />)}
            </SaleorProviderWithChannels>
          </RegionsProvider>
        </CheckoutProvider>
      </ApolloProvider>
    </>
  );
}

export default MyApp;
