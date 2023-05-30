import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";
import { getAuth } from "@clerk/nextjs/server";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { userId } = getAuth(req);

  if (!userId) {
    return res.status(401).json({ message: "Unauthorized" });
  } else {
    const id = req.query.id as string;

    await prisma.videos.update({
      where: { asset_id: id },
      data: { likes: { increment: 1 } },
    });

    res.status(200).json({ message: "Likes updated" });
  }
}
