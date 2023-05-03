import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const id = req.query.id as string;

  await prisma.videos.updateMany({
    where: { asset_id: id },
    data: { likes: { increment: 1 } },
  });

  res.status(200).json({ message: "Likes updated" });
}

// THIS ROUTE NEEDS TO BE PROTECTED - ONLY LOGGED IN USERS SHOULD HAVE ACCESS
// ACCESS SHOULD BE LOGGED
