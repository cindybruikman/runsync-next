import { prisma } from "@/lib/prisma";

export async function refreshStravaToken(userId: string) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user || !user.refreshToken) {
    throw new Error("Geen refresh_token gevonden voor deze gebruiker");
  }

  const response = await fetch("https://www.strava.com/api/v3/oauth/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      client_id: process.env.STRAVA_CLIENT_ID,
      client_secret: process.env.STRAVA_CLIENT_SECRET,
      grant_type: "refresh_token",
      refresh_token: user.refreshToken,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(`Strava token refresh failed: ${data.message}`);
  }

  // Sla nieuwe tokens op
  await prisma.user.update({
    where: { id: userId },
    data: {
      accessToken: data.access_token,
      refreshToken: data.refresh_token,
    },
  });

  return {
    accessToken: data.access_token,
    refreshToken: data.refresh_token,
    expiresAt: data.expires_at,
  };
}
