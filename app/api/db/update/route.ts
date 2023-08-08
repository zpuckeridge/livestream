import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs";

export default async function POST(request: NextRequest) {
  const res = await request.json();

  const { userId } = auth();

  if (!userId) {
    return new Response("Unauthorised", { status: 401 });
  }

  try {
    await prisma.videos.update({
      where: {
        asset_id: res.asset_id,
      },
      data: {
        title: res.title,
        description: res.description,
        tag: res.tag,
        public: res.visibility,
        date: res.date,
      },
    });
  } catch (error) {
    return NextResponse.json({ message: `Error updating video.` });
  }

  return NextResponse.json({ message: `Video updated.` });
}
