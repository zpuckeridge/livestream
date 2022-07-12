import Head from "next/head";

import { Box, Flex } from "@chakra-ui/react";
import { Cloudflare } from "../components/cloudflare";
import { Nav } from "../components/nav";
import { Chat } from "../components/chat";

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
        <Box flex="1">
          <Chat />
        </Box>
      </Flex>
    </Box>
  );
}
