import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { asset_id, title, tag, description, visibility } = req.body;

    const asset = await prisma.videos.update({
      where: {
        asset_id: asset_id,
      },
      data: {
        title: title,
        tag: tag,
        description: description,
        public: visibility,
      },
    });

    res.json(asset);
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
