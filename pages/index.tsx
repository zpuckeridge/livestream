import CloudflareStream from "../lib/stream";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { secondsToTime } from "../components/time";
import dateFormat from "dateformat";

export async function getServerSideProps() {
  const res = await fetch(`${process.env.PAGE_URL}/api/stream`);
  const data = await res.json();

  return {
    props: { data },
  };
}

export default function Home({ data }: { data: any }) {
  return (
    <>
      <Head>
        <title>sdelta</title>
        <meta
          name="description"
          content="Personal Livestream and Clip Hosting for Video Games and related
          Media."
        />
      </Head>
      <div className="xl:max-w-6xl mx-auto mt-10 mb-20">
        <div className="m-4 border-4 rounded-md shadow-xl">
          <CloudflareStream videoIdOrSignedUrl="4d4f99dc7903820b7fcd0c821a4880cf" />
        </div>
        <div className="mt-10 justify-items-center grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 md:gap-4 m-4">
          {data.result.slice(0, 8).map((video: any) => (
            <div key={video.uid}>
              <Link
                href={{
                  pathname: `clip/[id]`,
                  query: {
                    id: `${video.uid}`,
                  },
                }}
              >
                <div className="transform hover:scale-[1.05] transition-all">
                  <Image
                    src={video.thumbnail}
                    alt={video.meta.name}
                    width={640}
                    height={360}
                    className="rounded-2xl"
                    priority
                  />
                  <p className="font-bold mt-2 text-lg truncate w-64">
                    {video.meta.name}
                  </p>
                  <div className="flex justify-between">
                    {dateFormat(video.uploaded, "dS mmm yy")}

                    <p className="text-sm">{secondsToTime(video.duration)}</p>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
        <div className="flex justify-end mr-4 mt-6">
          <Link href="/clip">
            <button className="px-4 py-1 text-sm font-semibold rounded-full border bg-gray-200 dark:bg-[#111111] border-gray-200 dark:border-gray-700 hover:ring-2 ring-gray-300 transition-all hover:dark:bg-[#1d1f22] hover:border-transparent focus:outline-none focus:ring-1 focus:ring-gray-300 focus:ring-offset-2">
              View More →
            </button>
          </Link>
        </div>
      </div>
    </>
  );
}
