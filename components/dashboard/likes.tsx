import prisma from "@/lib/prisma";
import Link from "next/link";

export default async function Likes() {
  const videos = await prisma.videos.findMany({
    take: 5,
    orderBy: {
      likes: "desc",
    },
  });

  return (
    <div className="space-y-4">
      {videos.map((video) => (
        <Link
          href={`/clip/${video.asset_id}`}
          title={video.title}
          key={video.asset_id}
          className="flex justify-between"
          prefetch={false}
        >
          <p>{video.title}</p>
          <div className="text-sm ml-auto">{video.likes} likes</div>
        </Link>
      ))}
    </div>
  );
}
