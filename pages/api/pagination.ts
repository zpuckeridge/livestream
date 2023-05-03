import prisma from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function paginateHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const page = parseInt(req.query.page as string, 10);
  const offset = (page - 1) * 6;

  const videos = await prisma.videos.findMany({
    take: 6,
    skip: offset,
    orderBy: { date: "desc" },
  });

  res.status(200).json(videos);
}

// TODO: Migrate away from bad pagination and use this instead. This will improve page load performance.
