import { Attempt, Challenge, getChallengeAttemptByEmail, getChallengeById } from "@/app/db";
import { clsx } from "clsx";
import Image from "next/image";
import NextRoundForm from "./_next-round-form";
import { auth } from "@/auth";
import StatusBar from "@/components/status-bar";
import { SubmitButton } from "@/components/submit-button";
import { getIsTrackSavedForUser } from "@/app/spotify";
import { removeSavedTrackForUser, saveTrackForUser } from "@/app/actions";

const CORRECT_ANSWER_TITLE = "Correct";
const WRONG_ANSWER_TITLE = "You guessed wrong!";

export default async function RoundResult({
  params: { challengeId },
}: {
  params: { challengeId: string };
}) {
  const session = await auth();
  const email = String(session?.user?.email);

  const challenge = await getChallengeById(challengeId) as Challenge;
  const attempt = await getChallengeAttemptByEmail(challengeId, email) as Attempt;

  const { round, lastAnswer } = attempt;
  
  const song = challenge.songs[round - 1];
  const isCorrect = lastAnswer === song.name;

  const isTrackSaved = await getIsTrackSavedForUser(song.id);
  const saveTrackForUserWithId = saveTrackForUser.bind(null, song.id);
  const removeSavedTrackForUserWithId = removeSavedTrackForUser.bind(
    null,
    song.id
  );

  return (
    <div className="w-full flex flex-col">
      <StatusBar title={challenge.title} />
      <div className="mt-10">
        <Image
          priority
          src={song.imageUrl}
          draggable={false}
          width="160"
          height="160"
          style={{
            objectFit: "cover",
          }}
          className="z-50 w-48 h-48 mx-auto"
          alt="Album Cover"
        />
      </div>

      <div className="flex flex-col text-center gap-2 p-6 pb-8">
        <h3 className="text-2xl font-semibold text-slate-50 tracking-tight leading-7">
          {song.name}
        </h3>
        <p className="font-mono text-gray-400 font-light text-sm">
          {song.artists.map((artist: string) => artist).join(", ")}
        </p>
      </div>

      <div className="flex flex-col px-6 gap-4">
        <p
          className={clsx([
            isCorrect ? "text-green-600" : "text-slate-50",
            "w-full font-mono font-semibold text-center text-lg tracking-tight leading-7",
          ])}
        >
          {isCorrect ? CORRECT_ANSWER_TITLE : WRONG_ANSWER_TITLE}
        </p>
        <NextRoundForm challengeId={challengeId} round={round} />
        {isTrackSaved === false ? (
          <form action={saveTrackForUserWithId}>
            <SubmitButton>Save track</SubmitButton>
          </form>
        ) : (
          <form action={removeSavedTrackForUserWithId}>
            <SubmitButton>Remove track</SubmitButton>
          </form>
        )}
      </div>
    </div>
  );
}
