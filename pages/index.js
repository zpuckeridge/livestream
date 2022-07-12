import Head from "next/head";
import dynamic from "next/dynamic";

import { Box, Flex } from "@chakra-ui/react";
import { Cloudflare } from "../components/cloudflare";
import { Nav } from "../components/nav";

const WidgetBot = dynamic(() => import("@widgetbot/react-embed"), {
  ssr: false,
});

export default function Home() {
  return (
    <Box>
      <Head>
        <title>⏺️ Watch Live!</title>
        <meta
          name="description"
          content="Catch sdelta's live or watch latest vods!"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Nav />
      <Flex>
        <Box w="75%">
          <Cloudflare />
        </Box>
        <Box flex="1" bg="darkgrey">
          <WidgetBot
            server="491954283814715392"
            channel="537794443265441792"
            width="100%"
            height="100%"
          />
        </Box>
      </Flex>
    </Box>
  );
}
