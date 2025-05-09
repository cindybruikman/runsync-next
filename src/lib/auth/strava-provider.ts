import type { OAuthConfig, OAuthUserConfig } from "next-auth";

interface StravaProfile {
  id: number;
  firstname: string;
  lastname: string;
  profile: string;
}

export default function StravaProvider(
  options: OAuthUserConfig<StravaProfile>
): OAuthConfig<StravaProfile> {
  return {
    id: "strava",
    name: "Strava",
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
      async request({ params }: { params: { code: string } }) {
        const res = await fetch("https://www.strava.com/oauth/token", {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: new URLSearchParams({
            client_id: String(options.clientId),
            client_secret: String(options.clientSecret),
            grant_type: "authorization_code",
            code: params.code,
          }),
        });

        const data = await res.json();
        const { athlete, ...tokens } = data;
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
