import prisma from "@/lib/prisma";
import Link from "next/link";

export default async function Views() {
  const videos = await prisma.videos.findMany({
    take: 5,
    orderBy: {
      views: "desc",
    },
  });

  return (
    <div className="space-y-4">
      {videos.map((video) => (
        <Link
          href={`/clip/${video.asset_id}`}
          title={video.title}
          key={video.asset_id}
          className="flex justify-between">
          <div className="space-y-1">
            <div>
              <p className="font-medium leading-none">{video.title}</p>
            </div>
          </div>
          <div className="text-sm ml-auto font-medium">{video.views} views</div>
        </Link>
      ))}
    </div>
  );
}
