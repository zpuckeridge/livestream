import dateFormat from "dateformat";
import Head from "next/head";
import { secondsToTime } from "../../components/time";
import CloudflareStream from "../../lib/stream";

export async function fetchUID() {
  const res = await fetch(`${process.env.CLOUDFLARE_WORKER}`);
  const data = await res.json();
  const paths = data.result.map((data: { uid: any }) => ({
    params: { id: data.uid },
  }));

  return { paths, fallback: false };
}

export async function getServerSideProps({ params }: { params: any }) {
  const res = await fetch(`${process.env.CLOUDFLARE_WORKER}/${params.id}`);
  const data = await res.json();
  return { props: { data } };
}

function Clip({ data }: { data: any }) {
  return (
    <>
      <Head>
        <title>{`${data.result.meta.name}`}</title>
        <meta property="og:title" content={`${data.result.meta.name}`} />
        <meta property="og:site_name" content="sdelta.xyz" />
        <meta property="og:type" content="video.other" />
        <meta
          property="og:image"
          content={`https://customer-ldcl3cff16n8d346.cloudflarestream.com/${data.result.uid}/thumbnails/thumbnail.jpg`}
        />
        <meta property="og:image:type" content="image/jpeg" />
        <meta property="og:image:width" content="1280" />
        <meta property="og:image:height" content="720" />
        <meta
          property="og:url"
          content={`https://sdelta.xyz/clip/${data.result.uid}`}
        />
        <meta
          property="og:video"
          content={`https://customer-ldcl3cff16n8d346.cloudflarestream.com/${data.result.uid}/downloads/default.mp4`}
        />
        <meta
          property="og:video:url"
          content={`https://customer-ldcl3cff16n8d346.cloudflarestream.com/${data.result.uid}/downloads/default.mp4`}
        />
        <meta property="og:video:type" content="text/html" />
        <meta property="og:video:width" content="1280" />
        <meta property="og:video:height" content="720" />
        <meta
          property="og:video:release_date"
          content={`${data.result.uploaded}`}
        />
        <meta
          property="og:video:duration"
          content={`${data.result.duration}`}
        />
      </Head>
      <div className="xl:max-w-6xl mx-auto mt-10 mb-20">
        <div className="m-4 border-4 rounded-md shadow-xl">
          <CloudflareStream
            videoIdOrSignedUrl={data.result.uid}
            key={data.result.uid}
          />
        </div>
        <div className="m-4">
          <h1 className="text-2xl font-bold mt-2">{data.result.meta.name}</h1>
          <div className="flex justify-between">
            <h1>
              {dateFormat(data.result.uploaded, "dS mmmm yyyy")} ・ 🤫 views
            </h1>
            <h1>{secondsToTime(data.result.duration)}</h1>
          </div>
        </div>
      </div>
    </>
  );
}

export default Clip;
