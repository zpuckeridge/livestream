import { NextResponse } from "next/server";
import Mux from "@mux/mux-node";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export async function POST() {
  const user = await currentUser();

  if (!user) {
    redirect("/sign-in");
  }

  if (user.id !== process.env.ADMIN_ID) {
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
