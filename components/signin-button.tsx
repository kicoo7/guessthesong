"use client";
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";

export function SignInButton() {
  async function handleSignInWithSpotifyClick() {
    signIn("spotify",{
      callbackUrl: process.env.NODE_ENV === "development" ? "http://localhost:3000/" : "https://guessthesong-three.vercel.app/",
    });
  }

  return (
    <div className="bg-indigo-900/90 pb-2 rounded-lg outline outline-indigo-400">
    <Button
      size={"lg"}
      onClick={handleSignInWithSpotifyClick}
      className="outline-none shadow-none border-2 border-indigo-500"
    >
      Sign in with Spotify
    </Button>
    </div>
  );
}
