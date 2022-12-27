import Layout from "../components/Layout";
import TransitionEffect from "../components/TransitionEffect";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ThemeProvider } from "next-themes";
import { SessionProvider } from "next-auth/react";

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <ThemeProvider>
        <Layout>
          <TransitionEffect>
            <Component {...pageProps} />
          </TransitionEffect>
        </Layout>
      </ThemeProvider>
    </SessionProvider>
  );
}

export default MyApp;
