import "vidstack/styles/base.css";
import "vidstack/styles/ui/buttons.css";
import "vidstack/styles/ui/sliders.css";

import { MediaOutlet, MediaPlayer } from "@vidstack/react";

const CloudflareStream = ({
  videoIdOrSignedUrl,
}: {
  videoIdOrSignedUrl: any;
}) => {
  return (
    <div>
      {/* <iframe
        className="w-full h-full aspect-video rounded-2xl"
        title="Video Player"
        src={`https://customer-ldcl3cff16n8d346.cloudflarestream.com/${videoIdOrSignedUrl}/iframe`}
        allow="accelerometer; gyroscope; encrypted-media; picture-in-picture;"
        allowFullScreen={true}></iframe> */}
      <MediaPlayer
        src={`https://customer-ldcl3cff16n8d346.cloudflarestream.com/${videoIdOrSignedUrl}`}
        poster="https://media-files.vidstack.io/poster.png"
        controls>
        <MediaOutlet />
      </MediaPlayer>
    </div>
  );
};

export default CloudflareStream;
