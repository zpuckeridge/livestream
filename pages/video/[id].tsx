import dateFormat from "dateformat";
import Head from "next/head";
import { secondsToTime } from "../../components/time";
import CloudflareStream from "../../lib/stream";

export const getServerSideProps = (context: {
  query: {
    uploaded: any;
    duration: any;
    id: any;
    name: any;
  };
}) => {
  return {
    props: {
      id: context.query.id,
      name: context.query.name,
      uploaded: context.query.uploaded,
      duration: context.query.duration,
    },
  };
};

const Clip = (props: {
  id: string;
  name: string | null | undefined;
  uploaded: string | number | Date | undefined;
  duration: number;
}) => {
  return (
    <>
      <Head>
        <meta property="og:title" content={`${props.name}`} />
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
          <h1 className="text-2xl font-bold mt-2">{props.name}</h1>
          <div className="flex justify-between">
            <h1>{dateFormat(props.uploaded, "dS mmmm yyyy")} | 🤫 views</h1>
            <h1>{secondsToTime(props.duration)}</h1>
          </div>
        </div>
      </div>
    </>
  );
};

export default Clip;
