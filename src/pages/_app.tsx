import "@/styles/globals.css";
import { NextPage } from "next";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";

import { Inter } from "next/font/google";
import Head from "next/head";
import { ReactElement, ReactNode } from "react";

const inter = Inter({ subsets: ["latin"] });

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppPropsWithLayout) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <>
      <Head>
        <title>CTA</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, maximum-scale=1, width=device-width, user-scalable=no, shrink-to-fit=no"
        />
        <meta
          name="description"
          content="Connection Transport App"
          key="description"
        />
        <link rel="icon" href="/icon.png" />
      </Head>
      <SessionProvider session={session}>
        <div className={`${inter.className}`}>
          {getLayout(<Component {...pageProps} />)}
        </div>
      </SessionProvider>
    </>
  );
}
