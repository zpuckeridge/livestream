import Head from "next/head";
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
      <Head>
        <meta property="og:title" content="sdelta.xyz" />
        <meta property="og:type" content="video.other" />
        <meta
          property="og:image"
          content={`https://customer-ldcl3cff16n8d346.cloudflarestream.com/${props.id}/thumbnails/thumbnail.jpg`}
        />
        <meta property="og:image:type" content="image/jpeg" />
        <meta property="og:image:width" content="1920" />
        <meta property="og:image:height" content="1080" />
        <meta
          property="og:url"
          content={`https://sdelta.xyz`}
        />
        <meta
          property="og:video"
          content={`https://customer-ldcl3cff16n8d346.cloudflarestream.com/${props.id}/downloads/default.mp4`}
        />
        <meta
          property="og:video:url"
          content={`https://customer-ldcl3cff16n8d346.cloudflarestream.com/${props.id}/downloads/default.mp4`}
        />
        <meta property="og:video:type" content="text/html" />
        <meta property="og:video:width" content="1920" />
        <meta property="og:video:height" content="1080" />
      </Head>
      <div className="xl:max-w-6xl mx-auto mt-10 mb-20">
        <div className="m-4 border-4 rounded-md shadow-xl">
          <CloudflareStream videoIdOrSignedUrl={props.id} key={props.id} />
        </div>
      </div>
    </>
  );
};

export default Clip;
