"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NotFound() {
  console.error("404 Error: User attempted to access non-existent route");

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 px-4">
      <div className="text-center max-w-md">
        <div className="flex justify-center mb-6">
          <img
            src="/img/logo-runsync-dark-horizontal.png"
            alt="RunSync Logo"
            className="h-16"
          />
        </div>
        <h1 className="text-6xl font-bold mb-4 text-primary dark:text-white">
          404
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 mb-6">
          Oops! We've run off course
        </p>
        <p className="text-gray-500 dark:text-gray-400 mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link href="/">
          <Button className="bg-accent text-accent-foreground hover:bg-accent/90">
            Back to Home
          </Button>
        </Link>
      </div>
    </div>
  );
}
