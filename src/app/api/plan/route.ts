// src/app/api/plan/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/authOptions"; // Zorg ervoor dat je authOptions goed importeert
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);

  // Controleer of de sessie en de gebruiker correct zijn ingesteld
  if (!session || !session.user || !session.user.stravaId) {
    return NextResponse.json([], { status: 200 }); // Geen plan voor anonieme gebruiker
  }

  // Voer je logica uit met de sessie als de gebruiker is ingelogd
  const userPlan = await prisma.user.findUnique({
    where: { stravaId: session.user.stravaId },
  });

  if (!userPlan) {
    return NextResponse.json([], { status: 200 }); // Geen plan gevonden voor deze gebruiker
  }

  return NextResponse.json(userPlan.plan, { status: 200 });
}
