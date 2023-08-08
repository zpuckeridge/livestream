import { NextResponse, NextRequest } from "next/server";
import Mux from "@mux/mux-node";
const { Video } = new Mux();

export default async function POST(request: NextRequest) {
  const res = await request.json();

  try {
    const upload = await Video.Uploads.create({
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
    return NextResponse.json({ message: `Error creating upload.` });
  }

  return NextResponse.json({ message: `Upload created.` });
}
