import { NextResponse, NextRequest } from "next/server";
import Mux from "@mux/mux-node";

const { Video } = new Mux();

export async function POST(request: NextRequest) {
  const res = await request.json();

  try {
    const data = await Video.Assets.get(res.id as string);

    return NextResponse.json({
      playback_id: data.playback_ids?.[0].id,
      status: data.status,
      duration: data.duration,
    });
  } catch (error) {
    return NextResponse.json({ message: `Error getting asset.` });
  }
}
