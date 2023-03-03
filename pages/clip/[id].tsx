import React from "react";
import supabase from "../../lib/supabase";
import MuxPlayer from "@mux/mux-player-react";
import { useRouter } from "next/router";
import Spinner from "../../components/Spinner";
import Head from "next/head";

export async function getServerSideProps(context: any) {
  const { id } = context.query;
  const response = await fetch(`${process.env.PAGE_URL}/api/asset/${id}`);
  const asset = await response.json();

  const { data, error } = await supabase
    .from("livestream")
    .select("*")
    .eq("asset_id", id)
    .single();

  return { props: { playbackId: asset.playback_id, data } };
}

export default function Clip({
  playbackId,
  data,
}: {
  playbackId: any;
  data: any;
}) {
  const router = useRouter();

  // If the page is still loading, display a spinner component
  if (router.isFallback) {
    return <Spinner />;
  }

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
      <div>
        <h1>Playback ID: {playbackId}</h1>
        <h1>Title: {data.title}</h1>
        <MuxPlayer
          streamType="on-demand"
          thumbnailTime={5}
          playbackId={playbackId}
          metadata={{
            video_title: data.title,
          }}
        />
      </div>
    </>
  );
}
