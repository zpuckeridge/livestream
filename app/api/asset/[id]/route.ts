import { NextResponse, NextRequest } from "next/server";
import Mux from "@mux/mux-node";

const { Video } = new Mux();

export default async function GET(request: NextRequest) {
  const res = await request.json();

  try {
    const asset = await Video.Assets.get(res.id as string);

    if (asset.playback_ids)
      res.json({
        playback_id: asset.playback_ids[0].id,
        duration: asset.duration,
        status: asset.status,
      });
  } catch (error) {
    return NextResponse.json({ message: `Error getting asset.` });
  }

  return NextResponse.json({ message: `Asset retrieved.` });
}
