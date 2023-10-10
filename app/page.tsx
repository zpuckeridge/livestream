import Image from "next/image";
import prisma from "@/lib/prisma";
import Link from "next/link";
import { ArrowRight, Heart } from "lucide-react";
import { DateTime } from "luxon";
import { Button } from "@/components/ui/button";
import Player from "@/components/player";

export default async function Home() {
  const videos = await prisma.videos.findMany({ orderBy: { date: "desc" } });

  const formatDuration = (duration: number) => {
    const minutes = Math.floor(duration / 60);
    const seconds = duration % 60;

    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <>
      <main className="max-w-6xl mx-auto">
        <Player playbackId="16mLGoj2uixoYcy5oeQ7vzwGPAQvc1sbVqvt01uHnjS8" />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-2">
          {videos.slice(0, 4).map((video) => (
            <div key={video.asset_id}>
              <Link href={`/clip/${video.asset_id}`} title={video.title}>
                <div className="transform hover:scale-[1.05] transition-all">
                  <div className="absolute top-2 left-2 rounded-md text-white bg-black/75 p-2 text-xs font-semibold">
                    {video.tag}
                  </div>
                  <div className="absolute top-2 right-2 rounded-md text-white bg-black/75 p-2 text-xs font-semibold">
                    {video.duration ? (
                      <span className="duration">
                        {formatDuration(video.duration)}
                      </span>
                    ) : (
                      <span className="duration">N/A</span>
                    )}
                  </div>

                  <Image
                    src={`https://image.mux.com/${video.playback_id}/thumbnail.png`}
                    alt={video.title}
                    width={600}
                    height={600}
                    className="rounded-md aspect-video"
                    priority={true}
                  />
                  <div className="flex justify-between mt-1">
                    <div className="font-bold text-lg truncate w-full">
                      {video.title}
                    </div>
                    <div className="inline-flex my-auto">
                      {video.likes}
                      <Heart className="my-auto ml-2" />
                    </div>
                  </div>
                  <div className="flex justify-between text-sm">
                    <p>
                      {DateTime.fromJSDate(video.date).toFormat("MMMM d, yyyy")}
                    </p>
                    {video.views} views
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
        <Link href="/clips">
          <Button className="mt-4" variant="secondary">
            View more
            <ArrowRight className="ml-1 h-4 w-4" />
          </Button>
        </Link>
      </main>
    </>
  );
}
