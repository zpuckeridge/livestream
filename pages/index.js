import Head from "next/head";
import dynamic from "next/dynamic";

import { Box, Flex } from "@chakra-ui/react";
import { Stream } from "@cloudflare/stream-react";

const WidgetBot = dynamic(() => import("@widgetbot/react-embed"), {
  ssr: false,
});

export const Cloudflare = () => {
  const videoIdOrSignedUrl = "f077f9951270324416d117a6c1a93d52";
  return (
    <Box>
      <Stream controls src={videoIdOrSignedUrl} />
    </Box>
  );
};

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
