import React, { useEffect, useState } from "react";
import supabase from "../../lib/supabase";
import MuxPlayer from "@mux/mux-player-react";
import { useRouter } from "next/router";
import Spinner from "../../components/Spinner";
import Head from "next/head";
import CopyLink from "../../components/CopyLink";
import dateFormat from "dateformat";
import { secondsToTime } from "../../components/TimeConverter";
import Link from "next/link";
import ClipViews from "../../components/ClipViews";
import { FiHeart } from "react-icons/fi";

export async function getServerSideProps(context: any) {
  const { id } = context.query;
  const response = await fetch(`${process.env.DEV_PAGE_URL}/api/asset/${id}`);
  const asset = await response.json();

  const { data, error } = await supabase
    .from("livestream")
    .select("*")
    .eq("asset_id", id)
    .single();

  return {
    props: { playbackId: asset.playback_id, duration: asset.duration, data },
  };
}

export default function Clip({
  playbackId,
  duration,
  data,
}: {
  playbackId: any;
  duration: any;
  data: any;
}) {
  const [liked, setLiked] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);

  // Add one to view count
  useEffect(() => {
    fetch(`/api/views/${data.asset_id}`, {
      method: "POST",
    });
  }, [data.asset_id]);

  const router = useRouter();
  if (router.isFallback) {
    return <Spinner />;
  }

  // Like button logic
  const handleClick = async () => {
    await supabase.rpc("vote", {
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
        <meta property="og:title" content={`${data.title}`} />
        <meta property="og:site_name" content="sdelta.xyz" />
        <meta property="og:type" content="video.other" />
        <meta
          property="og:image"
          content={`https://image.mux.com/${playbackId}/thumbnail.png`}
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
          content={`https://stream.mux.com/${playbackId}/medium.mp4`}
        />
        <meta
          property="og:video:url"
          content={`https://stream.mux.com/${playbackId}/medium.mp4`}
        />
        <meta property="og:video:type" content="text/html" />
        <meta property="og:video:width" content="1280" />
        <meta property="og:video:height" content="720" />
        <meta property="og:video:release_date" content={`${data.timestamp}`} />
        <meta property="og:video:duration" content={`${data.duration}`} />
      </Head>
      <div className="max-w-6xl mx-auto m-4">
        <MuxPlayer
          streamType="on-demand"
          thumbnailTime={5}
          playbackId={playbackId}
          metadata={{
            video_title: data.title,
          }}
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
              {dateFormat(data.timestamp, "mmmm dS, yyyy")}・
              <ClipViews slug={data.asset_id} />
            </p>
            <p>{secondsToTime(duration)}</p>
          </div>
        </div>
        <Link href="/clip">
          <button className="mt-4 py-1 px-6 text-white rounded-lg bg-white/5 border border-zinc-800/50 hover:ring-2 ring-gray-300 transition-all">
            ← Back to Clips
          </button>
        </Link>
      </div>
    </>
  );
}
