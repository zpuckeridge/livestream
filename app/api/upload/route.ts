import { NextResponse, NextRequest } from "next/server";
import Mux from "@mux/mux-node";

export async function POST() {
  const { Video } = new Mux();

  try {
    const upload = await Video.Uploads.create({
      new_asset_settings: {
        playback_policy: "public",
        mp4_support: "standard",
      },
      cors_origin: "*",
    });

    return NextResponse.json({ id: upload.id, url: upload.url });
  } catch (e) {
    return NextResponse.json({ message: `Error creating upload.` });
  }
}
