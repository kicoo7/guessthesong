"use server";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import {
  createChallengeAttempt,
  deleteChallengeAttempt,
  getChallengeAttemptByEmail,
  getChallengeById,
  updateChallengeAttempt,
} from "./db";
import { revalidateTag } from "next/cache";
import { z } from "zod";

const MAX_NUMBER_ROUNDS = 10;
const CORRECT_ANSWER_POINTS = 100;
const WRONG_ANSWER_POINTS = 0;

export async function getSessionOrFail() {
  const session = await auth();

  if (!session || session.error === "RefreshAccessTokenError") {
    throw new Error("Session is not valid.");
  }

  const SessionSchema = z.object({
    user: z.object({
      name: z.string(),
      email: z.string().email(),
    }),
    access_token: z.string(),
    refresh_token: z.string(),
  });

  // validate session
  SessionSchema.parse(session);

  return session;
}

export async function startChallenge(challengeId: string) {
  try {
    const session = await getSessionOrFail();
    const email = String(session?.user?.email);
    await createChallengeAttempt(challengeId, email);
  } catch (e) {
    console.error("Error in startChallenge(): ", e);
    redirect("/");
  }

  revalidateTag("attempt");
}

export async function restartChallenge(challengeId: string) {
  const session = await getSessionOrFail();
  const email = String(session?.user?.email);

  await deleteChallengeAttempt(challengeId, email);

  revalidateTag("attempt");
}

export async function guessSong(formData: FormData) {
  const session = await getSessionOrFail();
  const email = String(session?.user?.email);

  const GuessSongSchema = z.object({
    challengeId: z.string().uuid(),
    round: z.number().int().positive().min(1).max(MAX_NUMBER_ROUNDS),
    selectedOption: z.string().min(1),
  });

  const { challengeId, round, selectedOption } = GuessSongSchema.parse({
    challengeId: String(formData.get("challenge-id")),
    round: Number(formData.get("round")),
    selectedOption: String(formData.get("selected-option")),
  });

  const attemptPromise = getChallengeAttemptByEmail(challengeId, email);
  const challengePromise = getChallengeById(challengeId);

  const attempt = await attemptPromise;
  if (!attempt) {
    throw new Error("Error in guessSong(): Attempt not found");
  }

  const challenge = await challengePromise;
  if (!challenge) {
    throw new Error("Error in guessSong(): Challenge not found");
  }

  const song = challenge.songs[round - 1];
  const isCorrect = song.name === selectedOption;
  const nextRound = Number(round) + 1;

  await updateChallengeAttempt(challengeId, email, {
    score: isCorrect ? CORRECT_ANSWER_POINTS : WRONG_ANSWER_POINTS,
    round: round,
    lastAnswer: selectedOption,
    finishedAt: nextRound <= MAX_NUMBER_ROUNDS ? undefined : Date.now(),
  });

  revalidateTag("attempt");
}

export async function startNextRound(challengeId: string) {
  const session = await getSessionOrFail();
  const email = String(session?.user?.email);

  const attempt = await getChallengeAttemptByEmail(challengeId, email);
  if (!attempt) {
    throw new Error("Error in startNextRound(): Attempt not found");
  }

  const nextRound = attempt.round + 1;
  await updateChallengeAttempt(challengeId, email, {
    score: 0,
    round: nextRound,
    lastAnswer: null, // reset last answer
    finishedAt: nextRound <= MAX_NUMBER_ROUNDS ? undefined : Date.now(),
  });

  revalidateTag("attempt");
}

export async function saveTrackForUser(trackId: string) {
  if (!trackId) {
    throw new Error("Error in saveTrackForUser(): Invalid track id");
  }

  const session = await getSessionOrFail();

  const url = new URL("/v1/me/tracks", "https://api.spotify.com");
  url.searchParams.set("ids", trackId);

  const response = await fetch(url, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${session?.access_token}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`Error in saveTrackForUser(): ${response.statusText}`);
  }

  revalidateTag("saved-track");
}

export async function removeSavedTrackForUser(trackId: string) {
  if (!trackId) {
    throw new Error("Error in removeSavedTrackForUser(): Invalid track id");
  }

  const session = await getSessionOrFail();

  const url = new URL("/v1/me/tracks", "https://api.spotify.com");
  url.searchParams.set("ids", trackId);

  const response = await fetch(url, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${session.access_token}`,
    },
  });

  if (!response.ok) {
    throw new Error(
      `Error in removeSavedTrackForUser(): ${response.statusText}`
    );
  }

  revalidateTag("saved-track");
}
