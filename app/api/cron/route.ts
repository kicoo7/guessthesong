import { createChallenge, getChallengeById } from "@/app/db";
import {  SpotifyPlaylist, getSpotifyPlaylist } from "@/app/spotify";

export async function GET() { 
    const playlist = await getSpotifyPlaylist("37i9dQZF1DXcBWIGoYBM5M");
    
    // prepare challenge, pick random 10 songs, pick random 30 song names that are incorrect 
    const challenge = await createChallenge(playlist);

    return Response.json({ message: "Challenge created", id: challenge.id });
}