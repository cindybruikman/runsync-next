import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.stravaId) {
    return NextResponse.json([], { status: 200 }); // Geen plan voor anonieme gebruiker
  }

  const user = await prisma.user.findUnique({
    where: { stravaId: session.user.stravaId },
  });

  return NextResponse.json(user?.plan || []);
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.stravaId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const newPlan = await req.json();

  await prisma.user.update({
    where: { stravaId: session.user.stravaId },
    data: {
      plan: newPlan,
    },
  });

  return NextResponse.json({ success: true });
}
