"use client";

import MuxPlayer from "@mux/mux-player-react/lazy";

interface Props {
  playbackId: string;
}

export default function Player({ playbackId }: Props) {
  return (
    <MuxPlayer
      thumbnailTime={5}
      playbackId={playbackId}
      accent-color="#292524"
      primary-color="#ffffff"
      autoPlay
      className="w-full h-full aspect-video"
    />
  );
}
