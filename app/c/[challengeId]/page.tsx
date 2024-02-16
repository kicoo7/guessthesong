import { Challenge, getChallengeById } from "@/app/db";
import { startChallenge } from "@/app/actions";
import Image from "next/image";
import { SubmitButton } from "@/components/submit-button";

export default async function ChallengePage({
  params: { challengeId },
}: {
  params: { challengeId: string };
}) {
  const challenge = await getChallengeById(challengeId) as Challenge; 
  const { title, description, id, imageUrl } = challenge;

  const startChallengeWithId = startChallenge.bind(null, id);

  return (
     <div className="flex flex-col h-full w-full py-10 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
      <div className="mx-auto">
        <Image
          alt="challenge image"
          src={imageUrl}
          width="300"
          height="300"
          className="w-64 h-64 mx-auto object-contain aspect-auto"
        />
      </div>
      <div className="p-4">
        <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
        <p className="mt-2 tracking-tight">{description}</p>
        <div className="mt-6 flex">
          <form action={startChallengeWithId}>
            <SubmitButton>Start Challenge</SubmitButton>
          </form>
        </div>
      </div>
    </div>
  );
}
