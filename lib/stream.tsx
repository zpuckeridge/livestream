import { Stream } from "@cloudflare/stream-react";

const CloudflareStream = ({
  videoIdOrSignedUrl,
}: {
  videoIdOrSignedUrl: any;
}) => {
  return (
    <div>
      <iframe
        title="Video Player"
        src={`https://customer-ldcl3cff16n8d346.cloudflarestream.com/${videoIdOrSignedUrl}/iframe`}
        height="720"
        width="100%"
        allow="accelerometer; gyroscope; encrypted-media; picture-in-picture;"
      ></iframe>
    </div>
  );
};

export default CloudflareStream;
