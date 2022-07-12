import { Stream } from "@cloudflare/stream-react";

export const Cloudflare = () => {
  const videoIdOrSignedUrl = "f077f9951270324416d117a6c1a93d52";
  return <Stream controls src={videoIdOrSignedUrl} />;
};
