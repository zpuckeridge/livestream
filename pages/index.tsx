import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import MuxPlayer from "@mux/mux-player-react/lazy";
import muxBlurHash from "@mux/blurhash";
import { secondsToTime } from "../components/TimeConverter";
import { FiHeart } from "react-icons/fi";
import dateFormat from "dateformat";
import supabase from "../lib/supabase";

export async function getStaticProps() {
  const { data, error } = await supabase
    .from("livestream")
    .select("*")
    .order("timestamp", { ascending: false })
    .range(0, 3); // Retrieves only the first 4 results, reducing page load

  if (error) {
    throw new Error(error.message);
  }

  data?.forEach((data: any) => {
    data.timestamp = dateFormat(data.timestamp, "mmmm dS, yyyy");
    data.duration = secondsToTime(data.duration);
  });

  // This generates a blurred placeholder
  const { blurHashBase64 } = await muxBlurHash(
    "16mLGoj2uixoYcy5oeQ7vzwGPAQvc1sbVqvt01uHnjS8"
  );

  return {
    props: {
      data: data,
      blurHashBase64,
    },
  };
}

export default function Home({
  data,
  blurHashBase64,
}: {
  data: any;
  blurHashBase64: any;
}) {
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
          playbackId="16mLGoj2uixoYcy5oeQ7vzwGPAQvc1sbVqvt01uHnjS8"
          metadata={{
            video_title: "Glitterbeard's Cave",
          }}
          placeholder={blurHashBase64}
          className={"w-full h-full aspect-video"}
        />
        <div className="my-10 justify-items-center grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-2 lg:gap-4">
          {data.slice(0, 4).map((data: any) => (
            <div key={data.asset_id}>
              <Link href={`/clip/${data.asset_id}`} title={data.title}>
                <div className="transform hover:scale-[1.05] transition-all">
                  <div className="absolute top-2 left-2 rounded-md bg-black/75 p-1 text-xs font-semibold">
                    {data.tag}
                  </div>
                  <div className="absolute top-2 right-2 rounded-md bg-black/75 p-1 text-xs font-semibold">
                    {data.duration}
                  </div>
                  <Image
                    src={`https://image.mux.com/${data.playback_id}/thumbnail.png`}
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
                    {data.views} views
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
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

// Live player should go here... Live chat too! Alternatively, have it detect if live and the display relevant stuff
