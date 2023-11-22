import { auth } from '@/auth';
import Image from 'next/image'
import Player from './ui/player';
import QuizQuestionAnswers from './ui/quizqa';
import RankList from './ui/rank';

export default async function Home() {

  var client_id = process.env.AUTH_SPOTIFY_ID;
  var client_secret = process.env.AUTH_SPOTIFY_SECRET;
  const authorizationToken = new Buffer.from(client_id + ':' + client_secret).toString('base64');
  console.log("client_id", client_id, client_secret, authorizationToken);

  const { access_token } = await fetch("https://accounts.spotify.com/api/token", {
    next: { revalidate: 3400 },
    headers: {
      'Authorization': 'Basic ' + authorizationToken,
      "Content-Type": 'application/x-www-form-urlencoded'
    },
    method: 'POST',
    body: new URLSearchParams({
      "grant_type": "client_credentials"
    })
  }).then(res => res.json());

  // Example: https://open.spotify.com/playlist/7lCdRaKVszpqw6e8pxfZm1
  const playlistId = "7lCdRaKVszpqw6e8pxfZm1";
  const apiUrl = new URL(`/v1/playlists/${playlistId}/tracks`, "https://api.spotify.com.");
  apiUrl.searchParams.set("market", "US");

  console.log("apiUrl", apiUrl);
  const result = await fetch(apiUrl, {
    headers: {
      "Authorization": `Bearer ${access_token}`
    }
  }).then(res => res.json()).catch(err => console.log("err fetching tracks", err));

  console.log("result", result);

  var mainTrack = "";
  var cover = "";
  var trackUri = "";
  result.items.forEach((item, index) => {
    if (index === 0) {
      console.log("track", item.track);
      // preview_url (30sec cann be nullable);
      mainTrack = item.track.external_urls.spotify;
      cover = item.track.album.images[0].url;
      trackUri = item.track.uri;
      console.log("mainTrack", mainTrack, item.track.name);
    }
  });


  const embedUrl = new URL("/oembed", "https://open.spotify.com");
  embedUrl.searchParams.set("url", mainTrack);
  const res = await fetch(embedUrl);
  // console.log("fetch", embedUrl);
  const song = await res.json();

  console.log("song", song);

  return (
    <main className="flex mx-auto min-h-screen flex-col items-center p-4 max-w-screen-md">
      <Player trackUri={trackUri} image={cover} />
      <QuizQuestionAnswers />
      <RankList />
    </main>
  )
}
