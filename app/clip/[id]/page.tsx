import CopyLink from "@/components/copy-link";
import Player from "@/components/player";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import prisma from "@/lib/prisma";
import { MoveLeft } from "lucide-react";
import { DateTime } from "luxon";
import type { Metadata, ResolvingMetadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";

async function retrieveVideo(id: string) {
  const data = await prisma.video.findFirst({
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

  return {
    title: `${video.title}`,
    description: video.description,
    openGraph: {
      type: "video.other",
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
          type: "video/mp4",
        },
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

  await prisma.video.update({
    where: { asset_id: id },
    data: { views: video.views + 1 },
  });

  return (
    <div className="max-w-7xl flex justify-center items-center min-h-screen min-w-screen mx-auto">
      <div className="space-y-2 p-8 w-full">
        <Player src={video.playback_id} />
        <div>
          <div className="flex justify-between">
            <h1 className="text-xl font-semibold truncate">{video.title}</h1>
            <div className="inline-flex space-x-2 font-mono">
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
