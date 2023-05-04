import prisma from "@/lib/prisma";
import Player from "@/components/Player";
import CopyLink from "@/components/CopyLink";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import Likes from "@/components/Likes";
import Script from "next/script";

export default async function Clip({ params }: any) {
  const { id } = params;

  const video = await prisma.videos.findUnique({
    where: { asset_id: decodeURIComponent(id) },
  });

  async function incrementViewCount(assetId: string) {
    await prisma.videos.updateMany({
      where: { asset_id: decodeURIComponent(assetId) },
      data: { views: { increment: 1 } },
    });
  }

  await incrementViewCount(id);

  return (
    <>
      <Script src="https://www.gstatic.com/cv/js/sender/v1/cast_sender.js?loadCastFramework=1" />
      <main>
        <div className="max-w-6xl p-4 mx-auto">
          <Player playbackId={video?.playback_id} />
          <div className="flex justify-between">
            <h1 className="text-2xl font-bold mt-2"> {video?.title}</h1>
            <div className="inline-flex space-x-2">
              <Likes assetId={video?.asset_id} likes={video?.likes} />
              <CopyLink />
            </div>
          </div>
          <div>{video?.views} views</div>
          <Link href="/clips">
            <Button className="mt-4" size="sm">
              <ArrowLeft /> Back to Clips
            </Button>
          </Link>
        </div>
      </main>
    </>
  );
}
