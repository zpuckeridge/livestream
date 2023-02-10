import type { NextApiRequest, NextApiResponse } from "next";
import Mux from "@mux/mux-node";
const { Video } = new Mux();

export default async function uploadHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const upload: any = await Video.Uploads.create({
      new_asset_settings: {
        playback_policy: "public",
        mp4_support: "standard",
      },
      cors_origin: "*",
    });
    res.json({
      id: upload.id,
      url: upload.url,
    });
  } catch (e) {
    console.error("Request error", e);
    res.status(500).json({ error: "Error creating upload" });
  }
}
