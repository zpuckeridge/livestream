import { Stream } from "@cloudflare/stream-react";
import { Box } from "@chakra-ui/react";

export const Cloudflare = () => {
  const videoIdOrSignedUrl = "f077f9951270324416d117a6c1a93d52";
  return (
    <Box>
      <Stream controls src={videoIdOrSignedUrl} />
    </Box>
  );
};
