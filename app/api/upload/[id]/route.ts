import { NextResponse, NextRequest } from "next/server";
import Mux from "@mux/mux-node";

const { Video } = new Mux();

export default async function GET(request: NextRequest) {
  const res = await request.json();
  try {
    const upload = await Video.Uploads.get(res.id as string);

    res.json({
      upload: {
        status: upload.status,
        asset_id: upload.asset_id,
      },
    });
  } catch (error) {
    return NextResponse.json({ message: `Error getting upload.` });
  }

  return NextResponse.json({ message: `Upload retrieved.` });
}
