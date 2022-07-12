import { useState, useEffect } from "react";
import { supabase } from "../utils/supabaseClient";
import Avatar from "../components/avatar";

import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  useColorModeValue,
  Box,
  HStack,
  AvatarBadge,
  IconButton,
  Center,
} from "@chakra-ui/react";

import { SmallCloseIcon } from "@chakra-ui/icons";

export default function Account({ session }) {
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState(null);
  const [website, setWebsite] = useState(null);
  const [avatar_url, setAvatarUrl] = useState(null);

  useEffect(() => {
    getProfile();
  }, [session]);

  async function getProfile() {
    try {
      setLoading(true);
      const user = supabase.auth.user();

      let { data, error, status } = await supabase
        .from("profiles")
        .select(`username, website, avatar_url`)
        .eq("id", user.id)
        .single();

      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        setUsername(data.username);
        setWebsite(data.website);
        setAvatarUrl(data.avatar_url);
      }
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  }

  async function updateProfile({ username, website, avatar_url }) {
    try {
      setLoading(true);
      const user = supabase.auth.user();

      const updates = {
        id: user.id,
        username,
        website,
        avatar_url,
        updated_at: new Date(),
      };

      let { error } = await supabase.from("profiles").upsert(updates, {
        returning: "minimal", // Don't return the value after inserting
      });

      if (error) {
        throw error;
      }
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Box>
      <Flex
        minH={"100vh"}
        align={"center"}
        justify={"center"}
        bg={useColorModeValue("gray.50", "gray.800")}
      >
        <Stack
          spacing={4}
          w={"full"}
          maxW={"md"}
          bg={useColorModeValue("white", "gray.700")}
          rounded={"xl"}
          boxShadow={"lg"}
          p={6}
          my={12}
        >
          <Heading lineHeight={1.1} fontSize={{ base: "2xl", sm: "3xl" }}>
            Edit Profile
          </Heading>
          <FormControl id="userName">
            <Stack direction={["column", "row"]} spacing={6}>
              <Center>
                <Avatar
                  url={avatar_url}
                  onUpload={(url) => {
                    setAvatarUrl(url);
                    updateProfile({ username, website, avatar_url: url });
                  }}
                />
              </Center>
              <Center w="full">
                <Button w="full">Change Avatar</Button>
              </Center>
            </Stack>
          </FormControl>
          <FormControl id="userName" isRequired>
            <FormLabel>Username:</FormLabel>
            <Input
              placeholder="Username"
              _placeholder={{ color: "gray.500" }}
              id="username"
              type="text"
              value={username || ""}
              onChange={(e) => setUsername(e.target.value)}
            />
          </FormControl>
          <FormControl id="email" isRequired>
            <FormLabel>Email:</FormLabel>
            <Input
              placeholder="your-email@example.com"
              _placeholder={{ color: "gray.500" }}
              id="email"
              type="text"
              value={session.user.email}
            />
          </FormControl>

          <Stack spacing={6} direction={["column", "row"]}>
            <Button
              bg={"red.400"}
              color={"white"}
              w="full"
              _hover={{
                bg: "red.500",
              }}
              onClick={() => supabase.auth.signOut()}
            >
              Sign Out
            </Button>
            <Button
              bg={"blue.400"}
              color={"white"}
              w="full"
              _hover={{
                bg: "blue.500",
              }}
              onClick={() => updateProfile({ username, website, avatar_url })}
              disabled={loading}
            >
              {loading ? "Loading ..." : "Update"}
            </Button>
          </Stack>
        </Stack>
      </Flex>
    </Box>
  );
}

//     <Box className="form-widget">
//       <Box>
//         <label htmlFor="email">Email</label>
//         <input id="email" type="text" value={session.user.email} disabled />
//       </Box>
//       <Box>
//         <label htmlFor="username">Name</label>
//         <input
//           id="username"
//           type="text"
//           value={username || ""}
//           onChange={(e) => setUsername(e.target.value)}
//         />
//       </Box>

//       <Box>
//         <button
//           className="button block primary"
//           onClick={() => updateProfile({ username, website, avatar_url })}
//           disabled={loading}
//         >
//           {loading ? "Loading ..." : "Update"}
//         </button>
//       </Box>

//       <Box>
//         <button
//           className="button block"
//           onClick={() => supabase.auth.signOut()}
//         >
//           Sign Out
//         </button>
//       </Box>
//     </Box>
//   );
// }
