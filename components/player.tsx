import "@vidstack/react/player/styles/default/layouts/video.css";
import "@vidstack/react/player/styles/default/theme.css";

import { MediaPlayer, MediaProvider } from "@vidstack/react";
import {
  DefaultVideoLayout,
  defaultLayoutIcons,
} from "@vidstack/react/player/layouts/default";

export default function Player({ src }: { src: any }) {
  return (
    <MediaPlayer
      src={`https://stream.mux.com/${src}.m3u8`}
      className="hover:shadow-2xl transition-all duration-300"
    >
      <MediaProvider />
      <DefaultVideoLayout noScrubGesture icons={defaultLayoutIcons} />
    </MediaPlayer>
  );
}
