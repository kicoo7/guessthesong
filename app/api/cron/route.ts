import { createChallenge } from "@/app/db";
import { getSpotifyPlaylist } from "@/app/spotify";

// You can use this logic to automatically create challenges for users based on the spotify playlist you provide
// Add this to vercel.json to schedule the cron job
// {
//  "crons": [
//   {
//     "path": "/api/cron",

//     "schedule": "0 5 * * *"
//   }
// ]
// }
export async function GET() {
  const playlist = await getSpotifyPlaylist("37i9dQZF1DXcBWIGoYBM5M");

  // prepare challenge, pick random 10 songs, pick random 30 song names that are incorrect
  const challenge = await createChallenge(playlist);

  return Response.json({ message: "Challenge created" });
}
