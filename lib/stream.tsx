import { Stream } from "@cloudflare/stream-react";

const CloudflareStream = ({
  videoIdOrSignedUrl,
}: {
  videoIdOrSignedUrl: any;
}) => {
  return (
    <div>
      <Stream controls src={videoIdOrSignedUrl} />
    </div>
  );
};

export default CloudflareStream;
