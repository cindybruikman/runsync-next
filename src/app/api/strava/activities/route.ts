import { refreshStravaToken } from "@/lib/strava/refreshAccessToken";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route"; // pas pad aan indien nodig

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.stravaId) {
    return new Response("Not authenticated", { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { stravaId: session.user.stravaId },
  });

  if (!user) {
    return new Response("User not found", { status: 404 });
  }

  // Ververs access_token via refresh_token
  const tokens = await refreshStravaToken(user.id);

  // Haal activiteiten op met vernieuwd access_token
  const res = await fetch("https://www.strava.com/api/v3/athlete/activities", {
    headers: {
      Authorization: `Bearer ${tokens.accessToken}`,
    },
  });

  const data = await res.json();

  return Response.json(data);
}
