import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "@/lib/prisma";
import type { NextAuthOptions } from "next-auth";
import StravaProvider from "@/lib/auth/strava-provider";

console.log("✅ NEXTAUTH_URL:", process.env.NEXTAUTH_URL);

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    StravaProvider({
      clientId: process.env.STRAVA_CLIENT_ID!,
      clientSecret: process.env.STRAVA_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async jwt({ token, account, user }) {
      if (account) {
        token.accessToken = account.access_token;
        token.refreshToken = account.refresh_token;
        token.expiresAt = account.expires_at;
        token.stravaId = account.providerAccountId;

        // ✅ Opslaan van refreshToken in je database
        if (user?.email?.endsWith("@strava.local") && account.refresh_token) {
          await prisma.user.update({
            where: { email: user.email },
            data: { refreshToken: account.refresh_token },
          });
        }
      }
      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.accessToken = token.accessToken as string;
        session.user.stravaId = token.stravaId as string;
      }
      return session;
    },
  },

  events: {
    async createUser({ user }) {
      if (user.email?.endsWith("@strava.local")) {
        const stravaId = user.email.split("@")[0];
        await prisma.user.update({
          where: { id: user.id },
          data: { stravaId },
        });
      }
    },
  },

  session: {
    strategy: "jwt",
  },
};

console.log("STRAVA_CLIENT_ID", process.env.STRAVA_CLIENT_ID);
