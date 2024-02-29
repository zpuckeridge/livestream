import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export async function POST(request: NextRequest) {
  const user = await currentUser();

  if (!user) {
    redirect("/sign-in");
  }

  if (user.id !== process.env.ADMIN_ID) {
    redirect("/unauthorised");
  }

  const res = await request.json();

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

export async function DELETE(request: NextRequest) {
  const res = await request.json();

  try {
    await prisma.videos.delete({
      where: {
        asset_id: res.asset_id,
      },
    });
  } catch (error) {
    return NextResponse.json({ message: `Error deleting video.` });
  }

  return NextResponse.json({ message: `Video deleted.` });
}
