import Layout from "../components/Layout";
import TransitionEffect from "../components/TransitionEffect";
import type { AppProps } from "next/app";
import { Inter } from "@next/font/google";
import { SessionProvider } from "next-auth/react";
import "../styles/globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <main className={inter.className}>
        <Layout>
          <TransitionEffect>
            <Component {...pageProps} />
          </TransitionEffect>
        </Layout>
      </main>
    </SessionProvider>
  );
}

export default MyApp;
