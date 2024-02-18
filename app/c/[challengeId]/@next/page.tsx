import {
  Attempt,
  Challenge,
  getChallengeAttemptByEmail,
  getChallengeById,
} from "@/app/db";
import { clsx } from "clsx";
import Image from "next/image";
import { auth } from "@/auth";
import StatusBar from "@/components/status-bar";
import { SubmitButton } from "@/components/submit-button";
import { getIsTrackSavedForUser } from "@/app/spotify";
import {
  removeSavedTrackForUser,
  saveTrackForUser,
  startNextRound,
} from "@/app/actions";
import { Heart, HeartOff, Trash } from "lucide-react";
import { CORRECT_ANSWER_POINTS, WRONG_ANSWER_POINTS } from "@/app/utils";

const CORRECT_ANSWER_TITLE = "You guessed correctly!";
const WRONG_ANSWER_TITLE = "You guessed wrong!";

export default async function RoundResult({
  params: { challengeId },
}: {
  params: { challengeId: string };
}) {
  const session = await auth();
  const email = String(session?.user?.email);

  const challenge = (await getChallengeById(challengeId)) as Challenge;
  const attempt = (await getChallengeAttemptByEmail(
    challengeId,
    email
  )) as Attempt;

  const { round, lastAnswer } = attempt;

  const song = challenge.songs[round - 1];

  const isTrackSaved = await getIsTrackSavedForUser(song.id);
  const saveTrackForUserWithId = saveTrackForUser.bind(null, song.id);
  const removeSavedTrackForUserWithId = removeSavedTrackForUser.bind(
    null,
    song.id
  );
  const startNextRoundWithChallengeId = startNextRound.bind(null, challengeId);

  return (
    <>
      <div className="absolute top-0 left-0 right-0">
        <StatusBar title={challenge.title} />
      </div>
      <div className="flex flex-col pt-16">
        <div>
          <Image
            priority
            src={song.imageUrl}
            draggable={false}
            width="160"
            height="160"
            style={{
              objectFit: "cover",
            }}
            className="z-50 w-42 h-42 mx-auto"
            alt="Album Cover"
          />
        </div>

        <div className="flex flex-col text-center gap-1 pt-6 px-8 pb-8">
          <h3 className="text-xl font-semibold tracking-tight text-pretty text-slate-50">
            {song.name}
          </h3>
          <p className="text-sm text-gray-400 font-light">
            {song.artists.map((artist: string) => artist).join(", ")}
          </p>
          <GuessResult
            songName={song.name}
            selectedOption={String(lastAnswer)}
          />
        </div>
        <div className="flex flex-col px-6 gap-4">
          <form action={startNextRoundWithChallengeId}>
            <SubmitButton>
              {round <= 9 ? "Next song" : "See results"}
            </SubmitButton>
          </form>
          {isTrackSaved === false ? (
            <form action={saveTrackForUserWithId}>
              <SubmitButton>
                <Heart className="h-4 w-4 mr-2" /> Save track
              </SubmitButton>
            </form>
          ) : (
            <form action={removeSavedTrackForUserWithId}>
              <SubmitButton>
                <Trash className="h-4 w-4 mr-2" /> Remove track
              </SubmitButton>
            </form>
          )}
        </div>
      </div>
    </>
  );
}

function GuessResult({
  songName,
  selectedOption,
}: {
  songName: string;
  selectedOption: string;
}) {
  const isCorrect = songName === selectedOption;
  const title = isCorrect ? CORRECT_ANSWER_TITLE : WRONG_ANSWER_TITLE;
  const points = isCorrect ? CORRECT_ANSWER_POINTS : WRONG_ANSWER_POINTS;

  return (
    <div
      className={clsx(
        "mt-4 py-2.5 rounded-full",
        isCorrect ? "bg-green-700" : "bg-red-700"
      )}
    >
      <p className={"text-slate-50 font-semibold text-center text-sm"}>
        {title}
      </p>
      <p className="mt-1 text-xs font-medium text-slate-50">{points} points</p>
    </div>
  );
}
