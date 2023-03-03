import Head from "next/head";
import Link from "next/link";
import MuxPlayer from "@mux/mux-player-react";

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
        <MuxPlayer
          streamType="on-demand"
          thumbnailTime={142}
          playbackId="nVyLXd02sO52jmR68LMYcwedQQaHd1CzkKuq1dmoQyWs"
          metadata={{
            video_title: "Glitterbeard's Cave",
          }}
        />
        <div className="flex justify-end mr-4 mt-6">
          <Link href="/clip" passHref>
            <button className="py-1 px-6 text-white rounded-lg flex items-center justify-center bg-white/5 border border-zinc-800/50 hover:ring-2 ring-gray-300 transition-all">
              View More →
            </button>
          </Link>
        </div>
      </div>
    </>
  );
}
