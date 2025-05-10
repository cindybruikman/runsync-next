import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { refreshStravaToken } from "@/lib/strava/refreshAccessToken";

export async function GET() {
  const session = await getServerSession(authOptions);
  const stravaId = session?.user?.stravaId;

  if (!stravaId) {
    return new Response("Unauthorized", { status: 401 });
  }

  const { accessToken } = await refreshStravaToken(stravaId);

  const res = await fetch("https://www.strava.com/api/v3/athlete/activities", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const data = await res.json();
  return Response.json(data);
}
