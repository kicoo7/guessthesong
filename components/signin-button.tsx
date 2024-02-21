"use client";
import { signIn } from "next-auth/react";
import { SubmitButton } from "./submit-button";

export function SignInButton() {
  async function handleSignInWithSpotifyClick() {
    signIn("spotify", {
      callbackUrl:
        process.env.NODE_ENV === "development"
          ? "http://localhost:3000/"
          : "https://guessthesong-three.vercel.app/",
    });
  }

  return (
    <SubmitButton onClick={handleSignInWithSpotifyClick}>
      Sign in with Spotify
    </SubmitButton>
  );
}
