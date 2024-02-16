"use client";
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";

export function SignInButton() {
  async function handleSignInWithSpotifyClick() {
    signIn("spotify", {
      callbackUrl: new URL("/", `https://guessthesong-three.vercel.app/`).href,
    });
  }

  return (
    <Button
      onClick={handleSignInWithSpotifyClick}
      className="w-full rounded-full"
    >
      Sign In With Spotify
    </Button>
  );
}
