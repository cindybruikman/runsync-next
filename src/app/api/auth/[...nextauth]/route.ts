import NextAuth from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "@/lib/prisma";
import StravaProvider from "@/lib/auth/strava-provider";

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    StravaProvider({
      clientId: process.env.STRAVA_CLIENT_ID!,
      clientSecret: process.env.STRAVA_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token;
        token.refreshToken = account.refresh_token;
        token.expiresAt = account.expires_at;
        token.stravaId = account.providerAccountId;
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

  // ✅ HIER komt je events block:
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

const handler = NextAuth(authOptions);

// ✅ Zorg dat je DIT exporteert:
export { handler as GET, handler as POST };
