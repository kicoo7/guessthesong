import {
  Attempt,
  Challenge,
  getChallengeAttemptByEmail,
  getChallengeById,
} from "@/app/db";
import clsx from "clsx";
import Image from "next/image";
import StatusBar from "@/components/status-bar";
import { auth } from "@/auth";
import { SubmitButton } from "@/components/submit-button";
import { restartChallenge } from "@/app/actions";
import { CORRECT_ANSWER_POINTS, MAX_NUMBER_ROUNDS } from "@/app/utils";

export default async function Score({
  params: { challengeId },
}: {
  params: { challengeId: string };
}) {
  const session = await auth();
  const email = String(session?.user?.email);

  const { title, imageUrl } = (await getChallengeById(
    challengeId
  )) as Challenge;
  const { score } = (await getChallengeAttemptByEmail(
    challengeId,
    email
  )) as Attempt;

  const restartChallengeWithId = restartChallenge.bind(null, challengeId);
  const guessedCorrectly = score / CORRECT_ANSWER_POINTS;

  return (
    <>
      <div className="absolute top-0 left-0 right-0">
        <StatusBar title={title} />
      </div>
      <div className="w-full flex flex-col pt-16">
        <div>
          <Image
            priority
            src={imageUrl}
            draggable={false}
            width="160"
            height="160"
            style={{
              objectFit: "cover",
            }}
            className={clsx("z-50", "w-48", "h-48", "mx-auto")}
            alt="Album Cover"
          />
        </div>

        <div className="flex flex-col text-center p-6 pb-8 gap-2">
          <h3 className="text-2xl font-semibold text-slate-50 tracking-tight leading-7">
            Results
          </h3>
          <p className="font-mono font-semibold text-green-400">{score} points</p>
          <p className="font-mono font-semibold text-green-400">
            {guessedCorrectly}/{MAX_NUMBER_ROUNDS}
          </p>
        </div>

        <div className="px-6 flex flex-col gap-4">
          <form action={restartChallengeWithId}>
            <SubmitButton>Play again</SubmitButton>
          </form>
          <SubmitButton>Share</SubmitButton>
        </div>
      </div>
    </>
  );
}
