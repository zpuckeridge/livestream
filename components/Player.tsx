"use client";

import MuxPlayer from "@mux/mux-player-react/lazy";

interface Props {
  playbackId: string | undefined;
}

export default function Player({ playbackId }: Props) {
  return (
    <MuxPlayer
      thumbnailTime={5}
      playbackId={playbackId}
      className={"w-full h-full aspect-video"}
    />
  );
}
