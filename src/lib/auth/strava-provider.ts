import type { OAuthConfig } from "next-auth/providers";

interface StravaProfile {
  id: number;
  firstname: string;
  lastname: string;
  profile: string;
}

export default function StravaProvider(options: {
  clientId: string;
  clientSecret: string;
}): OAuthConfig<StravaProfile> {
  return {
    id: "strava",
    name: "Strava",
    type: "oauth",
    authorization: {
      url: "https://www.strava.com/oauth/authorize",
      params: {
        scope: "read,activity:read",
        response_type: "code",
        approval_prompt: "auto",
      },
    },
    token: {
      url: "https://www.strava.com/oauth/token",
      async request({ params }) {
        const res = await fetch("https://www.strava.com/oauth/token", {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: new URLSearchParams({
            client_id: options.clientId,
            client_secret: options.clientSecret,
            grant_type: "authorization_code",
            code: String(params.code), // ✅ geforceerd naar string
          }),
        });

        const data = await res.json();

        const { athlete, ...tokens } = data; // strip athlete if Prisma complains

        return { tokens };
      },
    },
    userinfo: "https://www.strava.com/api/v3/athlete",
    profile(profile) {
      return {
        id: profile.id.toString(),
        name: `${profile.firstname} ${profile.lastname}`,
        email: `${profile.id}@strava.local`,
        image: profile.profile,
      };
    },
  };
}
