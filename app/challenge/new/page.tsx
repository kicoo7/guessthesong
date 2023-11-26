import { Button } from "@/app/_ui/button";

export default function NewChallengePage() {
    return (
        <div className="my-auto w-full">
            <h1 className="text-xl text-center font-semibold tracking-tight leading-7">New challenge</h1>
            <form className="mt-8 pb-24">
                <div>
                    <label htmlFor="title" className="ml-4 font-semibold text-sm text-white leading-7">Name</label>
                    <input type="text" name="title" minLength={6} placeholder="The Ultimate 90s Challenge" className="w-full text-black font-medium text-base py-3.5 pl-4 rounded-full" />
                    <p className="text-xs text-gray-400 ml-4 mt-2">Give your challenge a name. Make it descriptive.</p>
                </div>
                <div className="mt-4">
                    <label htmlFor="challengeName" className="ml-4 font-semibold text-sm text-white leading-7">Spotify playlist</label>
                    <input type="url" name="spotifyPlaylistUrl" placeholder="https://spotify.xyz/playlist" className="w-full text-black font-medium text-base py-3.5 pl-4 rounded-full" />
                    <p className="text-xs text-gray-400 ml-4 mt-2">The quiz will be created based on the playlist you share.</p>
                </div>
                <div className="mt-8">
                    <Button>Create new challenge</Button>
                </div>
            </form>
        </div>
    );
}