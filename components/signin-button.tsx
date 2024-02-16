"use client";
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";

export function SignInButton() {
  async function handleSignInWithSpotifyClick() {
    signIn("spotify", {
      callbackUrl: new URL("http://localhost:3000/").pathname,
    });
  }

  return (
    <Button onClick={handleSignInWithSpotifyClick}>Sign In With Spotify</Button>
  );
}
