const CloudflareStream = ({
  videoIdOrSignedUrl,
}: {
  videoIdOrSignedUrl: any;
}) => {
  return (
    <div>
      <iframe
        className="w-full h-full aspect-video"
        title="Video Player"
        src={`https://customer-ldcl3cff16n8d346.cloudflarestream.com/${videoIdOrSignedUrl}/iframe`}
        allow="accelerometer; gyroscope; encrypted-media; picture-in-picture;"
        allowFullScreen={true}
      ></iframe>
    </div>
  );
};

export default CloudflareStream;
