import { getChallengeAttemptByEmail, getChallengeById } from "@/app/db";
import { auth } from "@/auth";
import PhoneFrame from "@/components/phone-frame";
import { notFound, redirect } from "next/navigation";
import { ReactNode } from "react";

const [NOT_STARTED, IN_PROGRESS, COMPLETED, NEXT_ROUND] = [
  "NOT_STARTED",
  "IN_PROGRESS",
  "COMPLETED",
  "NEXT_ROUND",
];

export default async function ChallengeLayout({
  children,
  next,
  round,
  score,
  params: { challengeId },
}: {
  children: ReactNode;
  round: ReactNode;
  next: ReactNode;
  score: ReactNode;
  params: {
    challengeId: string;
  };
}) {
  const session = await auth();
  const email = String(session?.user?.email);
  let componentToRender = children;

  if (!session || !email) {
    redirect("/");
  }

  const challengePromise = getChallengeById(challengeId);
  const attemptPromise = getChallengeAttemptByEmail(challengeId, email);

  const challenge = await challengePromise;

  if (!challenge) {
    notFound();
  }

  const attempt = await attemptPromise;

  const status = getStatus(attempt);

  switch (status) {
    case NOT_STARTED:
      componentToRender = children;
      break;
    case IN_PROGRESS:
      componentToRender = round;
      break;
    case NEXT_ROUND:
      componentToRender = next;
      break;
    case COMPLETED:
      componentToRender = score;
      break;
    // default:
    //   redirect("/");
  }

  return (
    <main className="max-w-screen-lg mx-auto md:p-8">
      <div className="mx-auto w-fit">
        <PhoneFrame>{componentToRender}</PhoneFrame>
      </div>
    </main>
  );
}

function getStatus(attempt: any) {
  if (!attempt) {
    return NOT_STARTED;
  }

  if (attempt.finishedAt && attempt.lastAnswer === null) {
    return COMPLETED;
  }

  if (attempt.lastAnswer) {
    return NEXT_ROUND;
  }

  if (attempt.lastAnswer === null) {
    return IN_PROGRESS;
  }

  return null;
}
