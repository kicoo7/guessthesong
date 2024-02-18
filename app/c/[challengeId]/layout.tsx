import { getChallengeAttemptByEmail, getChallengeById } from "@/app/db";
import { getSessionOrFail } from "@/app/utils";
import PhoneFrame from "@/components/phone-frame";
import { notFound } from "next/navigation";
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
  const session = await getSessionOrFail();
  const { email } = session.user;
  let componentToRender = children;

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
  }

  return (
    <main className="md:flex md:justify-center md:items-center md:h-full bg-gray-950 md:bg-none">
      <PhoneFrame>{componentToRender}</PhoneFrame>
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

  return NOT_STARTED;
}
