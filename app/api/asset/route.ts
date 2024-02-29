import { NextResponse, NextRequest } from "next/server";
import Mux from "@mux/mux-node";

const { Video } = new Mux();

export async function GET(request: NextRequest) {
  const res = await request.json();

  try {
    const params = {};
    const asset = await Video.Assets.list(params);

    res.json({
      asset,
    });
  } catch (error) {
    return NextResponse.json({ message: `Error retrieving asset.` });
  }

  return NextResponse.json({ message: `Asset retrieved.` });
}
