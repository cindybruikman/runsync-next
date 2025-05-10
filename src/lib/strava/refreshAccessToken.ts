import { prisma } from "@/lib/prisma";

export async function refreshStravaToken(stravaId: string) {
  const user = await prisma.user.findFirst({
    where: { stravaId },
  });

  if (!user || !user.refreshToken) {
    throw new Error("Geen refresh_token gevonden voor deze gebruiker");
  }

  const response = await fetch("https://www.strava.com/api/v3/oauth/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: process.env.STRAVA_CLIENT_ID!,
      client_secret: process.env.STRAVA_CLIENT_SECRET!,
      grant_type: "refresh_token",
      refresh_token: user.refreshToken,
    }),
  });

  if (!response.ok) {
    throw new Error("Strava token verversing mislukt");
  }

  const data = await response.json();

  // Sla nieuwe token + refreshToken op
  await prisma.user.update({
    where: { id: user.id },
    data: {
      refreshToken: data.refresh_token,
    },
  });

  return {
    accessToken: data.access_token,
    expiresAt: data.expires_at,
  };
}
