// next-auth.d.ts

import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      name?: string | null;
      email?: string | null;
      image?: string | null;
      stravaId?: string | null;  // Voeg de stravaId hier toe
      accessToken?: string | null;
    };
  }

  interface JWT {
    stravaId?: string;
    accessToken?: string;
  }
}
