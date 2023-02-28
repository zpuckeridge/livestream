import type { NextApiRequest, NextApiResponse } from "next";
import Mux from "@mux/mux-node";
const { Video } = new Mux();

export default async function assetHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  switch (method) {
    case "GET":
      try {
        const asset = await Video.Assets.get(req.query.id as string);
        res.json({
          asset: {
            id: asset.id,
            status: asset.status,
            errors: asset.errors,
            playback_id: asset.playback_ids![0].id,
          },
        });
      } catch (e) {
        console.error("Request error", e);
        res.status(500).json({ error: "Error getting upload/asset" });
      }
      break;
    default:
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}

// This file queries the Mux API grabbing the asset id, asset status, errors and importantly, the playback_id.
// It is using req.query.id to grab the asset id from the url as specified in /pages/dashboard/upload.tsx.
