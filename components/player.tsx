"use client";

import "@vidstack/react/player/styles/default/theme.css";
import "@vidstack/react/player/styles/default/layouts/video.css";

import { MediaPlayer, MediaProvider } from "@vidstack/react";
import {
  defaultLayoutIcons,
  DefaultVideoLayout,
  // @ts-ignore
} from "@vidstack/react/player/layouts/default";

interface Props {
  playbackId: string | undefined;
}

export default function Player({ playbackId }: Props) {
  return (
    <MediaPlayer src={`https://stream.mux.com/${playbackId}.m3u8`}>
      <MediaProvider />
      <DefaultVideoLayout
        thumbnails={`https://image.mux.com/${playbackId}/thumbnail.png`}
        icons={defaultLayoutIcons}
      />
    </MediaPlayer>
  );
}
