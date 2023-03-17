import { memo, useCallback, useEffect, useState } from "react";
import supabase from "../../lib/supabase";
import MuxPlayer from "@mux/mux-player-react/lazy";
import muxBlurHash from "@mux/blurhash";
import Head from "next/head";
import CopyLink from "../../components/CopyLink";
import dateFormat from "dateformat";
import { secondsToTime } from "../../components/TimeConverter";
import Link from "next/link";
import { FiHeart } from "react-icons/fi";

export async function getServerSideProps(context: any) {
  const { id } = context.query;

  // Increment the view count for this asset
  await supabase.rpc("views", {
    quote_id: id,
    increment_num: 1,
  });

  // Fetch data for the page
  const { data, error } = await supabase
    .from("livestream")
    .select("*")
    .eq("asset_id", id)
    .single();

  // Returns a 404 is data cannot be found
  if (!data) {
    return {
      notFound: true,
    };
  }

  // This generates a blurred placeholder
  const { blurHashBase64 } = await muxBlurHash(data.playback_id);

  return {
    props: {
      data: data,
      blurHashBase64,
    },
  };
}

// This prevents re-render when the like button is pressed
const MemoizedMuxPlayer = memo(MuxPlayer, (prevProps, nextProps) => {
  // Only re-render if the playbackId changes
  return prevProps.playbackId === nextProps.playbackId;
});

export default function Clip({
  data,
  blurHashBase64,
}: {
  data: any;
  blurHashBase64: any;
}) {
  const [liked, setLiked] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);

  const handleClick = async () => {
    await supabase.rpc("likes", {
      quote_id: data.asset_id,
      increment_num: 1,
    });
    setLiked(true);
    setButtonDisabled(true);
  };

  return (
    <>
      <Head>
        <title>{`${data.title}`}</title>
        <meta name="description" content={`${data.title}`} />
        <meta property="og:title" content={`${data.title}`} />
        <meta property="og:site_name" content="sdelta.xyz" />
        <meta property="og:type" content="video.other" />
        <meta
          property="og:image"
          content={`https://image.mux.com/${data.playback_id}/thumbnail.png`}
        />
        <meta property="og:image:type" content="image/jpeg" />
        <meta property="og:image:width" content="1280" />
        <meta property="og:image:height" content="720" />
        <meta
          property="og:url"
          content={`https://sdelta.xyz/clip/${data.asset_id}`}
        />
        <meta
          property="og:video"
          content={`https://stream.mux.com/${data.playback_id}/medium.mp4`}
        />
        <meta
          property="og:video:url"
          content={`https://stream.mux.com/${data.playback_id}/medium.mp4`}
        />
        <meta property="og:video:type" content="text/html" />
        <meta property="og:video:width" content="1280" />
        <meta property="og:video:height" content="720" />
        <meta property="og:video:release_date" content={`${data.timestamp}`} />
        <meta property="og:video:duration" content={`${data.duration}`} />
      </Head>
      <div className="max-w-6xl mx-auto m-4">
        <MemoizedMuxPlayer
          streamType="on-demand"
          thumbnailTime={5}
          playbackId={data.playback_id}
          metadata={{
            video_title: data.title,
          }}
          placeholder={blurHashBase64}
          className={"w-full h-full aspect-video"}
        />
        <div>
          <div className="flex justify-between text-white">
            <h1 className="text-2xl font-bold mt-2">{data.title}</h1>
            <div className="inline-flex space-x-2">
              <button
                onClick={handleClick}
                title="Like"
                disabled={buttonDisabled}>
                {liked ? (
                  <div className="text-red-500 inline-flex">
                    {data.likes + 1}
                    <FiHeart className="my-auto ml-2" />
                  </div>
                ) : (
                  <div className="inline-flex space-x-2">
                    <div>{data.likes}</div>
                    <FiHeart className="my-auto hover:text-red-500 transition-all duration-200" />
                  </div>
                )}
              </button>
              <CopyLink />
            </div>
          </div>
          <div className="flex justify-between text-[#888888]">
            <p>
              {dateFormat(data.timestamp, "mmmm dS, yyyy")}・{data.views} views
            </p>
            <p>{secondsToTime(data.duration)}</p>
          </div>
        </div>
        <Link href="/clips">
          <button className="mt-4 py-1 px-6 text-white rounded-lg bg-white/5 border border-zinc-800/50 hover:ring-2 ring-gray-300 transition-all">
            ← Back to Clips
          </button>
        </Link>
      </div>
    </>
  );
}

// If user is signed in and has permissions, allow data editing here. Comments should go here as well.
