import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(request: NextRequest) {
  const res = await request.json();

  try {
    await prisma.videos.update({
      where: { asset_id: res.id },
      data: { likes: { increment: 1 } },
    });
  } catch (error) {
    return NextResponse.json({ message: `Error incrementing like count.` });
  }

  return NextResponse.json({ message: `Like count incremented.` });
}
