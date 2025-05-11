// src/app/api/plan/route.ts

import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/authOptions";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user || !session.user.stravaId) {
    return NextResponse.json([], { status: 200 }); // Geen plan voor anonieme gebruiker
  }

  try {
    const user = await prisma.user.findUnique({
      where: { stravaId: session.user.stravaId },
    });

    return NextResponse.json(user?.plan ?? [], { status: 200 });
  } catch (err) {
    console.error("❌ Fout bij ophalen van plan:", err);
    return NextResponse.json({ error: "Failed to fetch plan" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user || !session.user.stravaId) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  try {
    const plan = await req.json();

    const updatedUser = await prisma.user.update({
      where: { stravaId: session.user.stravaId },
      data: { plan },
    });

    return NextResponse.json({ success: true, plan: updatedUser.plan });
  } catch (err) {
    console.error("❌ Fout bij opslaan van plan:", err);
    return NextResponse.json({ error: "Failed to save plan" }, { status: 500 });
  }
}
