"use server";

import { auth } from "@/auth";
import { revalidatePath } from "next/cache";

export async function getSpotifyAccessToken() {
  const authorizationToken = Buffer.from(
    (
      process.env.AUTH_SPOTIFY_ID +
      ":" +
      process.env.AUTH_SPOTIFY_SECRET
    ).toString("base64")
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
