import { Stream } from "@cloudflare/stream-react";
import { Box } from "@chakra-ui/react";

export const Cloudflare = ({ videoIdOrSignedUrl }) => {
  return (
    <Box>
      <Stream controls src={videoIdOrSignedUrl} />
    </Box>
  );
};
