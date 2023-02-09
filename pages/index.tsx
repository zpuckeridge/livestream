import CloudflareStream from "../lib/stream";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { secondsToTime } from "../components/TimeConverter";
import dateFormat from "dateformat";
import ClipViews from "../components/ClipViews";

export async function getServerSideProps() {
  // Make a request to your API to fetch the video data
  const res = await fetch(`${process.env.PAGE_URL}/api/stream`);
  const data = await res.json();

  // Convert time to readable format
  data.result.forEach((video: any) => {
    video.uploaded = dateFormat(video.uploaded, "mmmm dS, yyyy");
    video.duration = secondsToTime(video.duration);
  });

  // Pass the data as a prop to your component
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
      <div className="xl:max-w-6xl mx-auto mt-10 mb-20 text-white">
        <div className="m-4 border-4 rounded-md shadow-xl">
          <CloudflareStream videoIdOrSignedUrl="4d4f99dc7903820b7fcd0c821a4880cf" />
        </div>
        <div className="mt-10 justify-items-center grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 md:gap-4 m-4">
          {data.result.slice(0, 8).map((video: any) => (
            <div key={video.uid}>
              <Link href={`/clip/${video.uid}`}>
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
                    <p className="text-sm text-[#888888] font-semibold">
                      {video.uploaded}・ <ClipViews slug={video.uid} />
                    </p>
                    <p className="text-sm text-[#888888] font-semibold">
                      {video.duration}
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
        <div className="flex justify-end mr-4 mt-6">
          <Link href="/clip" passHref>
            <button className="px-6 py-1 rounded-lg flex items-center justify-center bg-white/5 border border-zinc-800/50 hover:ring-2 ring-gray-300 transition-all">
              View More →
            </button>
          </Link>
        </div>
      </div>
    </>
  );
}
