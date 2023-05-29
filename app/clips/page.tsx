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
      <main className="max-w-6xl mx-auto p-4">
        <Videos videos={videos} tags={tags} itemsPerPage={12} />
      </main>
    </>
  );
}
