import dateFormat from "dateformat";
import Head from "next/head";
import { secondsToTime } from "../../components/time";
import CloudflareStream from "../../lib/stream";
import useSWR from "swr";
import { useState } from "react";

export const getServerSideProps = (context: {
  query: {
    id: string;
  };
}) => {
  return {
    props: {
      id: context.query.id,
    },
  };
};

const fetcher = (arg: any, ...args: any) =>
  fetch(arg, ...args).then((res) => {
    return res.json();
  });

export const Clip = (props: { id: string }) => {
  const [loading, setLoading] = useState(true);
  const { data, error } = useSWR("/api/videoDetails?id=" + props.id, fetcher);

  if (error) return <div>An error has occurred while loading!</div>;

  if (!data)
    return <div>Oops! Looks likes we are missing some data here...</div>;

  return (
    <>
      <Head>
        <meta property="og:title" content={`${data.result.meta.name}`} />
        <meta property="og:site_name" content="sdelta.xyz" />
        <meta property="og:type" content="video.other" />
        <meta
          property="og:image"
          content={`https://customer-ldcl3cff16n8d346.cloudflarestream.com/${props.id}/thumbnails/thumbnail.jpg`}
        />
        <meta property="og:image:type" content="image/jpeg" />
        <meta property="og:image:width" content="1920" />
        <meta property="og:image:height" content="1080" />
        <meta property="og:url" content={`https://sdelta.xyz`} />
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
        <div className="m-4">
          <h1 className="text-2xl font-bold mt-2">{data.result.meta.name}</h1>
          <div className="flex justify-between">
            <h1>
              {dateFormat(data.result.uploaded, "dS mmmm yyyy")} | 🤫 views
            </h1>
            <h1>{secondsToTime(data.result.duration)}</h1>
          </div>
        </div>
      </div>
    </>
  );
};

export default Clip;
