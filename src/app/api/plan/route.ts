// src/app/api/plan/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/authOptions"; // Zorg ervoor dat je authOptions goed importeert
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user || !session.user.stravaId) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  try {
    const plan = await req.json();

    const updated = await prisma.user.update({
      where: { stravaId: session.user.stravaId },
      data: { plan },
    });

    return NextResponse.json({ success: true, user: updated });
  } catch (error) {
    console.error("❌ Error saving plan:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
