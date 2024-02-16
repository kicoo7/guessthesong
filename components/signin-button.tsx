"use client";
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";

export function SignInButton() {
  async function handleSignInWithSpotifyClick() {
    signIn("spotify", {
      callbackUrl: process.env.NEXT_PUBLIC_VERCEL_URL,
    });
  }

  return (
    <Button onClick={handleSignInWithSpotifyClick} className="w-full rounded-full">Sign In With Spotify</Button>
  );
}
