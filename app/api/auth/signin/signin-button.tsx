"use client";
import { Button } from "@/app/_ui/button";
import { signIn } from "next-auth/react"

export function SignInButton() {
    async function handleSignInWithSpotifyClick() {
        console.log("res", "handle");
        signIn("spotify", { callbackUrl: 'http://localhost:3000/challenges' });
        console.log("res");
    }

    return <Button onClick={handleSignInWithSpotifyClick}>Sign In With Spotify</Button >
}