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
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  PopoverAnchor,
  AvatarBadge,
  Avatar,
  IconButton,
  Center,
  background,
} from "@chakra-ui/react";

import { Profile } from "../components/profile";

export function Chat() {
  return (
    <>
      <Box padding="1rem">
        <Box
          padding="0.5rem"
          borderRadius="lg"
          _hover={{
            backgroundColor: useColorModeValue("white", "gray.800"),
          }}
        >
          <HStack>
            <Avatar src="https://bit.ly/39qYq5Z" size="sm" />
            <Box>
              <Popover>
                <PopoverTrigger>
                  <Button variant="link" colorScheme="black">
                    <Heading as="h6" size="sm">
                      sdelta
                      <Badge marginLeft="0.25rem" colorScheme="green">
                        Moderator
                      </Badge>
                    </Heading>
                  </Button>
                </PopoverTrigger>
                <PopoverContent>
                  <Profile />
                </PopoverContent>
              </Popover>
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
    </>
  );
}
