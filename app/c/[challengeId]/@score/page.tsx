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

  return (
    <div className="w-full flex flex-col">
      <StatusBar title={title} />
      <div className="mt-12">
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
          Your score
        </h3>
        <p className="font-mono font-semibold text-indigo-400">{score}</p>
      </div>

      <div className="px-6">
        <form action={restartChallengeWithId}>
          <SubmitButton>Play again</SubmitButton>
        </form>
      </div>
    </div>
  );
}
