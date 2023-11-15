import Videos from "@/components/clips/videos";
import prisma from "@/lib/prisma";

export default async function Clips() {
  const videos = await prisma.videos.findMany({
    orderBy: { date: "desc" },
  });

  const tags = await prisma.videos.findMany({
    select: { tag: true },
  });

  return (
    <>
      <div className="max-w-7xl flex justify-center items-center min-h-screen min-w-screen mx-auto">
        <div className="space-y-8 p-8">
          <Videos videos={videos} tags={tags} itemsPerPage={12} />
        </div>
      </div>
    </>
  );
}
