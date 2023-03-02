import React from "react";
import supabase from "../../lib/supabase";

export async function getServerSideProps(context: any) {
  const { id } = context.query;
  const response = await fetch(`http://localhost:3000/api/asset/${id}`);
  const asset = await response.json();

  const { data, error } = await supabase
    .from("livestream")
    .select("*")
    .eq("data", id)
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
  return (
    <div>
      <h1>Playback ID: {playbackId}</h1>
      <h1>Title: {data.title}</h1>
    </div>
  );
}
