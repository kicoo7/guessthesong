"use server";

import { auth } from "@/auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function getSpotifyAccessToken() {
  const authorizationToken = Buffer.from(
    (
      process.env.AUTH_SPOTIFY_ID +
      ":" +
      process.env.AUTH_SPOTIFY_SECRET
    ).toString()
  );

  const { access_token } = await fetch(
    "https://accounts.spotify.com/api/token",
    {
      next: { revalidate: 3400 },
      headers: {
        Authorization: "Basic " + authorizationToken,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      method: "POST",
      body: new URLSearchParams({
        grant_type: "client_credentials",
      }),
    }
  ).then((res) => res.json());

  return access_token;
}

export async function getQuestion({ accessToken }: { accessToken: string }) {
  const playlistId = "7lCdRaKVszpqw6e8pxfZm1";
  const playlistUrl = new URL(
    `/v1/playlists/${playlistId}/tracks`,
    "https://api.spotify.com."
  );
  playlistUrl.searchParams.set("market", "US");

  const { items } = await fetch(playlistUrl, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
    .then((res) => res.json())
    .catch((err) => console.log("err fetching tracks", err));

  console.log("result", result);

  var mainTrack = "";
  var cover = "";
  var trackUri = "";
  items.forEach((item, index) => {
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
}

export async function handleSubmitAnswerForm(formData: FormData) {
  const answerId = formData.get("answer");
  const questionId = formData.get("question");

  console.log("answer", answerId, questionId);
  // save answer to db;

  // redirect to result page;
}

export async function answerQuestion(
  challengeId: string,
  questionId: string,
  formData: FormData
) {
  // save to db;

  const session = await auth();
  console.log(
    "session",
    session,
    challengeId,
    questionId,
    formData.get("optionId")
  );

  setTimeout(() => {}, 2000);
  // check if user is legit
  // check if user has started this challengeId

  // check if users

  // revalidatePath("challenge/");
}

export async function createNewChallenge(formData: FormData) {
  const name = formData.get("name");
  const spotifyPlaylistUri = formData.get("spotifyPlaylistUri");

  // const ChallengeSchema = z.object({
  //   name: z.string(),
  //   spotifyPlaylistUri: z.string(),
  // });
  // zod.parse(ChallengeSchema, { name, spotifyPlaylistUri });

  // save to db;

  // redirect to challenge page;
  redirect("/challenge/" + "123");
}

async function saveTrackForUser(id: string) {
  //https://api.spotify.com/v1/me/tracks

  const url = new URL("/v1/me/tracks", "https://api.spotify.com");
  url.searchParams.set("ids", id);
  await fetch(url, {
    method: "PUT",
    headers: {},
  });
}

async function removeTrackForUser(id: string) {
  //https://api.spotify.com/v1/me/tracks

  const url = new URL("/v1/me/tracks", "https://api.spotify.com");
  url.searchParams.set("ids", id);
  await fetch(url, {
    method: "DELETE",
    headers: {},
  });
}

async function checkIfTrackIsSavedForUser(id: string) {
  const url = new URL("/v1/me/tracks/contains", "https://api.spotify.com");
  url.searchParams.set("ids", id);

  const result = await fetch(url, {
    method: "GET",
    headers: {},
  });

  const body = await result.json();

  return body[0];
}
