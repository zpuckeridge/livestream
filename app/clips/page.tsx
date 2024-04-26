import Videos from "@/components/clips/videos";
import prisma from "@/lib/prisma";

export default async function Clips() {
  const videos = await prisma.video.findMany({
    orderBy: { date: "desc" },
  });

  const tags = await prisma.video.findMany({
    select: { tag: true },
  });

  return (
    <>
      <div className="max-w-7xl flex justify-center items-center min-h-screen min-w-screen mx-auto">
        <div className="space-y-4 py-8 px-4">
          <Videos videos={videos} tags={tags} itemsPerPage={12} />
        </div>
      </div>
    </>
  );
}
