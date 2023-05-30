import Video from "@/components/clips/video";
import prisma from "@/lib/prisma";

import { redirect } from "next/navigation";

export async function generateMetadata({ params }: any) {
  const { id } = params;

  const video = await prisma.videos.findUnique({
    where: { asset_id: decodeURIComponent(id) },
  });

  return {
    title: video?.title,
    description: video?.description,
    openGraph: {
      title: video?.title,
      description: video?.description,
      url: `https://sdelta.xyz/clip/${video?.asset_id}`,
      siteName: "sdelta.xyz",
      images: [
        {
          url: `https://image.mux.com/${video?.playback_id}/thumbnail.png`,
          width: 800,
          height: 600,
        },
        {
          url: `https://image.mux.com/${video?.playback_id}/thumbnail.png`,
          width: 1800,
          height: 1600,
        },
      ],
      videos: {
        url: `https://stream.mux.com/${video?.playback_id}/medium.mp4`,
        width: 1280,
        height: 720,
      },
      locale: "en-US",
      type: "video.other",
    },
  };
}

export default async function Clip({ params }: any) {
  const { id } = params;

  const video = await prisma.videos.findFirst({
    where: { asset_id: decodeURIComponent(id) },
  });

  if (!video) {
    redirect("/404");
  }

  return (
    <>
      {/* @ts-expect-error Server Component */}
      <Video video={video} />
    </>
  );
}
