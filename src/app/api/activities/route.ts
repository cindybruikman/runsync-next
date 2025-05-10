import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.accessToken) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const res = await fetch("https://www.strava.com/api/v3/athlete/activities", {
    headers: {
      Authorization: `Bearer ${session.user.accessToken}`,
    },
  });

  if (!res.ok) {
    return NextResponse.json({ error: "Failed to fetch activities" }, { status: 500 });
  }

  const data = await res.json();
  return NextResponse.json(data);
}
