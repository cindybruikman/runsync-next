"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";

export function AuthButton({ className }: { className?: string }) {
  const sessionData = useSession();
  const session = sessionData?.data;
  const status = sessionData?.status;

  if (status === "loading") {
    return (
      <Button disabled className={className}>
        Load...
      </Button>
    );
  }

  if (session) {
    return (
      <div className="flex items-center gap-3">
        <p className="text-sm text-muted-foreground">
          Welcome, {session.user?.name || "Strava user"}
        </p>
        <Button
          onClick={() => signOut()}
          variant="outline"
          className={className}
        >
          Log out
        </Button>
      </div>
    );
  }

  return (
    <Button onClick={() => signIn("strava")} className={className}>
      Login with Strava
    </Button>
  );
}
