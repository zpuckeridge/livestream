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
    const asset: any = (await Video.Assets.list(upload.id))[0];
    console.log(asset); // WOW THIS WORKS!!! Problem -- it's grabbing the playback ID of the previously uploaded asset
    // console.log(asset.playback_ids[0].id); // WOW THIS WORKS!!!
    res.json({
      id: upload.id,
      url: upload.url,
      playback_id: asset.playback_ids[0].id,
    });
  } catch (e) {
    console.error("Request error", e);
    res.status(500).json({ error: "Error creating upload" });
  }
}
