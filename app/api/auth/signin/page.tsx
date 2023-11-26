import Player from "@/app/_ui/player";
import { SignInButton } from "./signin-button";

export default function Page() {
    // play random songs

    return (
        <div className="text-center w-full my-auto pb-20">
            <Player className="mx-auto w-72 h-72" />
            <h1 className="text-6xl text-slate-50 font-bold tracking-tight">Guess the Song</h1>
            <p className="mt-4 mb-8 text-base text-white/90 font-medium">How many songs and artist can you guess?</p>
            <SignInButton />
            <p className="mt-2 text-xs text-white/90 pb-24">Powered by Spotify. Made by @kkicoo.</p>
        </div>
    );
}