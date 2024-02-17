"use client";
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";

export function SignInButton() {
  async function handleSignInWithSpotifyClick() {
    signIn("spotify", {
      callbackUrl: "https://guessthesong-three.vercel.app/",
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
