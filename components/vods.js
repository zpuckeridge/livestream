import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import { Cloudflare } from "../components/cloudflare";

import {
  Flex,
  Circle,
  Box,
  Button,
  Image,
  Badge,
  useColorModeValue,
  Icon,
  chakra,
  Tooltip,
} from "@chakra-ui/react";

function FetchVideos() {
  const { isLoading, error, data } = useQuery(
    ["repoData"],
    async () => {
      try {
        const result = await fetch("/api/cloudflare");
        return await result.json();
      } catch (error) {
        throw error;
      }
    },
    { cacheTime: 0 }
  );

  if (isLoading) return "Loading...";
  if (error) return "An error has occurred: " + error.message;

  return (
    <>
      {data.result.map((v) => {
        return <Cloudflare videoIdOrSignedUrl={v.uid} key={v.uid} />;
      })}
    </>
  );
}

const queryClient = new QueryClient();

export function Vods() {
  return (
    <QueryClientProvider client={queryClient}>
      <Flex p={50} w="full" alignItems="center" justifyContent="center">
        <Box
          maxW="lg"
          borderWidth="2px"
          rounded="lg"
          shadow="lg"
          position="relative"
        >
          <Box p="6">
            <Box d="flex" alignItems="baseline">
              <Badge rounded="full" px="2" fontSize="0.8em" colorScheme="red">
                New
              </Badge>
            </Box>
            <Flex mt="1" justifyContent="space-between" alignContent="center">
              <Box
                fontSize="2xl"
                fontWeight="semibold"
                as="h4"
                lineHeight="tight"
                isTruncated
              >
                Vod Name #1
                <FetchVideos />
              </Box>
            </Flex>
          </Box>
        </Box>
        <Box
          marginLeft="2rem"
          maxW="lg"
          borderWidth="2px"
          rounded="lg"
          shadow="lg"
          position="relative"
        >
          <Box p="6">
            <Box d="flex" alignItems="baseline">
              <Badge rounded="full" px="2" fontSize="0.8em" colorScheme="red">
                New
              </Badge>
            </Box>
            <Flex mt="1" justifyContent="space-between" alignContent="center">
              <Box
                fontSize="2xl"
                fontWeight="semibold"
                as="h4"
                lineHeight="tight"
                isTruncated
              >
                Vod Name #2
              </Box>
            </Flex>
          </Box>
        </Box>
        <Box
          marginLeft="2rem"
          maxW="sm"
          borderWidth="2px"
          rounded="lg"
          shadow="lg"
          position="relative"
        >
          <Box p="6">
            <Box d="flex" alignItems="baseline">
              <Badge rounded="full" px="2" fontSize="0.8em" colorScheme="red">
                New
              </Badge>
            </Box>
            <Flex mt="1" justifyContent="space-between" alignContent="center">
              <Box
                fontSize="2xl"
                fontWeight="semibold"
                as="h4"
                lineHeight="tight"
                isTruncated
              >
                Vod Name #3
              </Box>
            </Flex>
          </Box>
        </Box>
      </Flex>
    </QueryClientProvider>
  );
}
