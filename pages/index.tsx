import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import MuxPlayer from "@mux/mux-player-react";
import { secondsToTime } from "../components/TimeConverter";
import { FiHeart } from "react-icons/fi";
import ClipViews from "../components/ClipViews";
import dateFormat from "dateformat";
import supabase from "../lib/supabase";
import "plyr-react/plyr.css";

const plyrProps = {
  source:
    "https://stream.mux.com/uMUIc7h4eYacNhlOdC4BB0000ySvS6nCPNBjn8G8C499w.m3u8", // https://github.com/sampotts/plyr#the-source-setter
  options: undefined, // https://github.com/sampotts/plyr#options
  // Direct props for inner video tag (mdn.io/video)
};

export async function getServerSideProps() {
  try {
    const response = await fetch(`${process.env.DEV_PAGE_URL}/api/asset`);
    const { asset } = await response.json();

    const { data, error } = await supabase.from("livestream").select("*");

    if (error) {
      throw new Error(error.message);
    }

    data?.forEach((data: any) => {
      data.timestamp = dateFormat(data.timestamp, "mmmm dS, yyyy");
    });

    return {
      props: {
        data: data
          ? data.map((item: any) => ({
              ...item,
              asset: asset.find((a: any) => a.id === item.asset_id),
            }))
          : [],
      },
    };
  } catch (error) {
    console.error(error);
    return {
      props: {
        data: [],
      },
    };
  }
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
      <div className="xl:max-w-6xl mx-auto my-10">
        <MuxPlayer
          streamType="on-demand"
          thumbnailTime={142}
          playbackId="nVyLXd02sO52jmR68LMYcwedQQaHd1CzkKuq1dmoQyWs"
          metadata={{
            video_title: "Glitterbeard's Cave",
          }}
          className={"w-full h-full aspect-video"}
        />
        <div className="my-4 justify-items-center grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 md:gap-4">
          {data.slice(0, 4).map((data: any) => (
            <div key={data.asset_id}>
              <Link href={`/clip/${data.asset_id}`} title={data.title}>
                <div className="transform hover:scale-[1.05] h-full w-full transition-all">
                  <div className="absolute top-2 left-2 rounded-md bg-black/75 p-1 text-xs font-semibold">
                    {data.tag}
                  </div>
                  <div className="absolute top-2 right-2 rounded-md bg-black/75 p-1 text-xs font-semibold">
                    {secondsToTime(data.asset.duration)}
                  </div>
                  <Image
                    src={`https://image.mux.com/${data.asset.playback_ids[0].id}/thumbnail.png`}
                    alt={data.title}
                    width={400}
                    height={400}
                    className="rounded-2xl aspect-video"
                    priority={true}
                  />
                  <div className="flex justify-between mt-1">
                    <div className="font-bold text-lg truncate w-56 text-white">
                      {data.title}
                    </div>
                    <div className="inline-flex my-auto">
                      {data.likes}
                      <FiHeart className="my-auto ml-2" />
                    </div>
                  </div>
                  <div className="flex justify-between text-sm text-[#888888] font-semibold">
                    <p>{data.timestamp}</p>
                    <ClipViews slug={data.asset_id} />
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
        {/* Live player should go here... Live chat too! Alternatively, have it detect if live and the display relevant stuff */}
        <div className="flex justify-end mt-6">
          <Link href="/clips" passHref>
            <button className="py-1 px-6 text-white rounded-lg flex items-center justify-center bg-white/5 border border-zinc-800/50 hover:ring-2 ring-gray-300 transition-all">
              View More →
            </button>
          </Link>
        </div>
      </div>
    </>
  );
}
