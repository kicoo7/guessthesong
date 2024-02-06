"use server";

import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { createChallengeAttempt, getChallengeAttemptByEmail, getChallengeById, updateChallengeAttempt } from "./db";
import { revalidatePath } from "next/cache";


const MAX_NUMBER_ROUNDS = 10;

export async function startChallenge(challengeId: string){
  const session = await auth();

  if(!session || !session.user?.email){
    throw new Error("Session is not valid.");
  }

  await createChallengeAttempt(challengeId, session.user.email);

  revalidatePath(`/c/${challengeId}`);
}

export async function guessSong(formData: FormData) {
  const session = await auth();
  if(!session || !session.user?.email){
    throw new Error("Session is not valid.");
  }
  // check if user has started this challengeId

  // getQuestion
  // check if user is legit
  const challengeId = formData.get("challenge-id");
  const round = formData.get("round");
  const selectedOption = formData.get("selected-option");

  if(!challengeId || !round || !selectedOption){
    throw new Error("Invalid form data");
  }
  // zod
  const attempt = await getChallengeAttemptByEmail(String(challengeId), session.user.email);

  if(!attempt){
    throw new Error("Attempt not found");
  }

  const challenge = await getChallengeById(String(challengeId));
  if(!challenge){
    throw new Error("Challenge not found");
  }

  const song = challenge.songs[Number(round)-1];
  const isCorrect = song.name === selectedOption;
  const newRound = Number(round) + 1;

  await updateChallengeAttempt(String(challengeId), session.user.email, {
    score: isCorrect ? attempt.score + 100 : attempt.score,
    round: newRound,
    finishedAt: newRound <= MAX_NUMBER_ROUNDS ? undefined : Date.now(),
  })
  
  revalidatePath(`c/${challengeId}`);
}

// not used
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
