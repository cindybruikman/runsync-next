import { OAuthConfig } from "next-auth/providers";
import { Profile } from "next-auth";

interface StravaProfile extends Profile {
  id: number;
  firstname: string;
  lastname: string;
  profile: string;
}

const StravaProvider = (options: {
  clientId: string;
  clientSecret: string;
}): OAuthConfig<StravaProfile> => ({
  id: "strava",
  name: "Strava",
  type: "oauth",
  authorization: {
    url: "https://www.strava.com/oauth/authorize",
    params: {
      scope: "read,activity:read",
      response_type: "code",
      approval_prompt: "auto",
      redirect_uri: `${process.env.NEXTAUTH_URL}/api/auth/callback/strava`,
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
          code: params.code as string,
        }),
      });

      const data = await res.json();
      const { athlete: _ignored, ...tokens } = data;

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
  ...options,
});

export default StravaProvider;
