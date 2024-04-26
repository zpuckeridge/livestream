import Player from "@/components/player";
import { buttonVariants } from "@/components/ui/button";
import prisma from "@/lib/prisma";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {
  const videos = await prisma.video.findMany({
    orderBy: { date: "desc" },
    take: 4,
  });

  const formatDuration = (duration: number) => {
    const minutes = Math.floor(duration / 60);
    const seconds = duration % 60;

    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <>
      <div className="max-w-7xl flex justify-center items-center min-h-screen min-w-screen mx-auto">
        <div className="space-y-4 py-8 px-4">
          <Player src="16mLGoj2uixoYcy5oeQ7vzwGPAQvc1sbVqvt01uHnjS8" />
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {videos.map((video) => (
              <div key={video.asset_id}>
                <Link href={`/clip/${video.asset_id}`} title={video.title}>
                  <div className="transform group hover:scale-[1.05] transition-all duration-300">
                    <div className="absolute top-2 left-2 rounded-md text-white bg-black/75 p-1 text-xs font-semibold font-mono">
                      {video.tag}
                    </div>
                    <div className="absolute top-2 right-2 rounded-md text-white bg-black/75 p-1 text-xs font-semibold font-mono">
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
                      className="rounded-md aspect-video group-hover:shadow-2xl transition-all duration-300"
                      priority={true}
                    />
                    <div className="flex justify-between mt-1">
                      <div className="font-semibold truncate w-[85%]">
                        {video.title}
                      </div>
                    </div>
                    <div className="flex justify-between text-sm leading-none text-muted-foreground">
                      <p>
                        {new Date(video.date).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </p>
                      {video.views} views
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
          <Link
            href="/clips"
            className={`flex gap-2 ${buttonVariants({ variant: "secondary" })}`}
          >
            View more <ArrowRightIcon className="w-5 h-5 my-auto" />
          </Link>
        </div>
      </div>
    </>
  );
}
