import prisma from "@/lib/prisma";
import CopyLink from "@/components/copy-link";
import { DateTime } from "luxon";
import { Button } from "@/components/ui/button";
import { MoveLeft } from "lucide-react";
import Link from "next/link";
import Likes from "@/components/likes";
import { redirect } from "next/navigation";
import Player from "@/components/player";
import type { Metadata, ResolvingMetadata } from "next";
import { siteConfig } from "@/config/site";

export const revalidate = 0;

async function retrieveVideo(id: string) {
  const data = await prisma.videos.findFirst({
    where: { asset_id: id },
  });

  if (!data) {
    redirect("/not-found");
  }

  return data;
}

export async function generateMetadata(
  { params }: any,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const id = params.id;

  const video = await retrieveVideo(id);

  const previousImages = (await parent).openGraph?.images || [];

  return {
    title: `${video.title}`,
    description: video.description,
    openGraph: {
      siteName: `sdelta.xyz`,
      title: `${video.title}`,
      description: video.description,
      url: `https://${siteConfig.url}/clip/${video.asset_id}`,
      countryName: "Australia",
      locale: "en_AU",
      videos: [
        {
          url: `https://stream.mux.com/${video.playback_id}/high.mp4`,
          width: 1920,
          height: 1080,
        },
      ],
      type: "video.other",
      images: [
        {
          url: `https://image.mux.com/${video.playback_id}/thumbnail.png`,
          width: 1920,
          height: 1080,
          alt: `${video.title} Thumbnail`,
        },
        ...previousImages,
      ],
    },
  };
}

export default async function Clip({ params }: any) {
  const { id } = params;

  const video = await retrieveVideo(id);

  if (!video) {
    redirect("/not-found");
  }

  // increment view count on page load
  await prisma.videos.update({
    where: { asset_id: id },
    data: { views: video.views + 1 },
  });

  return (
    <div className="max-w-7xl flex justify-center items-center min-h-screen min-w-screen mx-auto">
      <div className="space-y-2 p-8 w-full">
        <Player playbackId={video.playback_id} />
        <div>
          <div className="flex justify-between">
            <h1 className="text-xl font-semibold truncate">{video.title}</h1>
            <div className="inline-flex space-x-2 font-mono">
              <Likes assetId={video.asset_id} likes={video.likes ?? 0} />
              <CopyLink />
            </div>
          </div>
          <div className="flex justify-between text-muted-foreground text-sm font-mono">
            <div>{video.views + 1} views</div>
            <div>
              {DateTime.fromJSDate(video.date).toFormat("MMMM d, yyyy")}
            </div>
          </div>
        </div>
        <Link href="/clips">
          <Button className="mt-4" variant="secondary">
            <MoveLeft className="mr-1 h-4 w-4" /> Back to Clips
          </Button>
        </Link>
      </div>
    </div>
  );
}
