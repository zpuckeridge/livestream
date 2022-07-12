import { supabase } from "../utils/supabaseClient";

import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Text,
  Input,
  Stack,
  useColorModeValue,
  Box,
  Label,
  Badge,
  HStack,
  AvatarBadge,
  Avatar,
  IconButton,
  Center,
} from "@chakra-ui/react";

export function Chat() {
  return (
    <Box padding="1rem">
      <Heading>Live Chat</Heading>
      <Box
        borderWidth="2px"
        marginTop="1rem"
        padding="1rem"
        boxShadow="md"
        rounded="1rem"
      >
        <HStack>
          <Avatar src="https://bit.ly/39qYq5Z" size="sm" />
          <Box>
            <Heading as="h6" size="sm">
              sdelta
              <Badge marginLeft="0.25rem" colorScheme="green">
                Moderator
              </Badge>
            </Heading>
            <Text>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </Text>
          </Box>
        </HStack>
      </Box>
      <Box
        borderWidth="2px"
        marginTop="1rem"
        padding="1rem"
        boxShadow="md"
        rounded="1rem"
      >
        <HStack>
          <Avatar src="https://bit.ly/39qYq5Z" size="sm" />
          <Box>
            <Heading as="h6" size="sm">
              jaitaiwan
              <Badge marginLeft="0.25rem" colorScheme="purple">
                New
              </Badge>
            </Heading>

            <Text>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </Text>
          </Box>
        </HStack>
      </Box>
      <Box marginTop="1rem">
        <FormControl>
          <HStack>
            <Input
              placeholder="Type a message..."
              size="md"
              borderWidth="2px"
              borderColor="gray.200"
              borderRadius="sm"
              boxShadow="md"
              rounded="1rem"
            />
            <Button size="md" boxShadow="md" rounded="1rem">
              Send
            </Button>
          </HStack>
        </FormControl>
      </Box>
    </Box>
  );
}
