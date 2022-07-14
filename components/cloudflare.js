import { Stream } from "@cloudflare/stream-react";
import { Box } from "@chakra-ui/react";

export const Cloudflare = () => {
  const videoIdOrSignedUrl = "30024a5d915ecb3d30a8aa11c9e236fc";
  return (
    <Box>
      <Stream controls src={videoIdOrSignedUrl} />
    </Box>
  );
};
