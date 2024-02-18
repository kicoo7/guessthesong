import { Challenge, getChallengeById } from "@/app/db";
import { startChallenge } from "@/app/actions";
import Image from "next/image";
import { SubmitButton } from "@/components/submit-button";

export default async function ChallengePage({
  params: { challengeId },
}: {
  params: { challengeId: string };
}) {
  const challenge = (await getChallengeById(challengeId)) as Challenge;
  const { title, id, songs, imageUrl } = challenge;

  const startChallengeWithId = startChallenge.bind(null, id);
  const artists = songs
    .slice(0, 5)
    .map((s) => s.artists.join(", "))
    .join(", ");

  return (
    <>
      <div className="w-full bg-gradient-to-b from-gray-800 to-gray-950 pt-12 pb-4">
        <Image
          alt="challenge image"
          src={imageUrl}
          width="300"
          height="300"
          className="w-64 h-64 mx-auto object-contain aspect-auto"
        />
      </div>
      <div className="p-6">
        <h1 className="text-2xl font-semibold tracking-tight text-slate-50">
          {title}
        </h1>
        <p className="mt-2 text-sm text-indigo-400">
          <span className="text-gray-400">
            Discover songs from these artists:
          </span>{" "}
          {artists}, and more
        </p>
        <form action={startChallengeWithId} className="mt-6">
          <SubmitButton>Start Challenge</SubmitButton>
        </form>
      </div>
    </>
  );
}
