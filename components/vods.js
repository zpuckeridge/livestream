import { Stream } from "@cloudflare/stream-react";

import { useState } from "react";

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

export function Vods() {
  const [vods, setVods] = useState([]);

  const fetchVods = async () => {
    const response = await fetch("/api/cloudflare");
    const data = await response.json();
    setVods(data);
  };
  return (
    <Flex p={50} w="full" alignItems="center" justifyContent="center">
      <Box>
        <Button onClick={fetchVods}>Load Vods</Button>
        {vods.map((vod) => {
          return (
            <Box key={vod.id}>
              <Stream src={vod.signed_url} />
            </Box>
          );
        })}
      </Box>
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
              <Stream controls src={"6b6319ba0c25b1307f7788b13b16cb52"} />
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
  );
}
