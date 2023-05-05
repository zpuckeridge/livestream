import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const {
      asset_id,
      playback_id,
      duration,
      title,
      description,
      tag,
      visibility,
    } = req.body;

    const asset = await prisma.videos.create({
      data: {
        title: title,
        tag: tag,
        description: description,
        asset_id: asset_id,
        playback_id: playback_id,
        duration: duration,
        date: new Date(),
        likes: 0,
        views: 0,
        public: visibility,
      },
    });

    res.json(asset);
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
