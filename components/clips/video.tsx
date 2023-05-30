"use client";

import Player from "@/components/player";
import CopyLink from "@/components/copy-link";
import { DateTime } from "luxon";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import Likes from "@/components/likes";
import Script from "next/script";
import { useEffect } from "react";

interface Video {
  asset_id: string;
  playback_id: string;
  title: string;
  duration: number;
  tag: string;
  likes: number;
  views: number;
  date: Date;
}

export default async function Video({ video }: { video: Video }) {
  useEffect(() => {
    fetch(`/api/increment/views/${video.asset_id}`, {
      method: "POST",
    });
  }, [video.asset_id]);

  return (
    <>
      <Script src="https://www.gstatic.com/cv/js/sender/v1/cast_sender.js?loadCastFramework=1" />
      <main>
        <div className="max-w-6xl p-4 mx-auto">
          <Player playbackId={video.playback_id} />
          <div className="flex justify-between">
            <h1 className="text-2xl font-bold mt-2">{video.title}</h1>
            <div className="inline-flex space-x-2">
              <Likes assetId={video.asset_id} likes={video.likes ?? 0} />
              <CopyLink />
            </div>
          </div>
          <div className="flex justify-between">
            <div>{video.views} views</div>
            <div>
              {DateTime.fromJSDate(video.date).toFormat("MMMM d, yyyy")}
            </div>
          </div>
          <Link href="/clips">
            <Button className="mt-4" size="sm" variant="secondary">
              <ArrowLeft className="mr-1 h-4 w-4" /> Back to Clips
            </Button>
          </Link>
        </div>
      </main>
    </>
  );
}
