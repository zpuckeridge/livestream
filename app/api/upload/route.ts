import { NextResponse, NextRequest } from "next/server";
import Mux from "@mux/mux-node";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export async function POST() {
  const { userId } = auth();

  if (userId !== process.env.ADMIN_ID) {
    redirect("/unauthorised");
  }

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
