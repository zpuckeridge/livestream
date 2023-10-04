import { NextResponse, NextRequest } from "next/server";
import Mux from "@mux/mux-node";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export async function POST(request: NextRequest) {
  const res = await request.json();

  const { userId } = auth();

  if (userId !== process.env.ADMIN_ID) {
    redirect("/unauthorised");
  }

  const { Video } = new Mux();

  try {
    const upload = await Video.Uploads.get(res.id);

    return NextResponse.json({
      upload: {
        status: upload.status,
        asset_id: upload.asset_id,
      },
    });
  } catch (error) {
    console.error("Error getting upload:", error);
    return NextResponse.json({ message: `Error getting upload.` });
  }
}
