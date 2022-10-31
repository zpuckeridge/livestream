import { Key } from "react";
import CloudflareStream from "../../lib/stream";

export const getServerSideProps = (context: { query: { id: any } }) => {
  return {
    props: {
      id: context.query.id,
    },
  };
};

const Clip = (props: { id: Key | null | undefined }) => {
  return (
    <>
      <head>
        <meta property="og:type" content="video.other" />
        <meta
          property="og:image"
          content={`https://customer-ldcl3cff16n8d346.cloudflarestream.com/${props.id}/thumbnails/thumbnail.jpg`}
        />
        <meta property="og:image:type" content="image/jpeg" />
        <meta property="og:image:width" content="1280" />
        <meta property="og:image:height" content="720" />
        <meta
          property="og:url"
          content={`https://customer-ldcl3cff16n8d346.cloudflarestream.com/${props.id}/manifest/video.m3u8`}
        />
        <meta
          property="og:video"
          content={`https://customer-ldcl3cff16n8d346.cloudflarestream.com/${props.id}/manifest/video.m3u8`}
        />
        <meta
          property="og:video:url"
          content={`https://customer-ldcl3cff16n8d346.cloudflarestream.com/${props.id}/manifest/video.m3u8`}
        />
        <meta property="og:video:type" content="text/html" />
        <meta property="og:video:width" content="1920" />
        <meta property="og:video:height" content="1080" />
      </head>
      <div>
        <CloudflareStream videoIdOrSignedUrl={props.id} key={props.id} />
      </div>
    </>
  );
};

export default Clip;
