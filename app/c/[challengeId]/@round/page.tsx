import {
  Attempt,
  Challenge,
  getChallengeAttemptByEmail,
  getChallengeById,
} from "@/app/db";
import clsx from "clsx";
import Image from "next/image";
import GuessSongForm from "./_guess-song-form";
import StatusBar from "@/components/status-bar";
import { auth } from "@/auth";

export default async function Round({
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

  const { options, songs } = challenge;
  const { round } = attempt;

  const song = songs[round - 1];
  const normalizedOptions = options
    .map((option) => option.name)
    .slice((round - 1) * 3, (round - 1) * 3 + 3);

  const shuffledOptions = [...normalizedOptions, song.name].sort(
    () => Math.random() - 0.5
  );

  return (
    <>
      <div className="absolute top-0 left-0 right-0">
        <StatusBar title={challenge.title} />
      </div>
      <div className="w-full flex flex-col pt-16">
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
            className={clsx(
              "blur-md",
              "animate-pulse",
              "z-50",
              "w-42",
              "h-42",
              "mx-auto"
            )}
            alt="Album Cover"
          />
        </div>

        <div className="flex flex-col text-center p-6 pb-8 gap-2">
          <h3 className="text-xl font-semibold text-slate-50">
            Guess the song
          </h3>
          <p className="text-gray-400 font-light tracking-tight text-sm">
            {round}/10
          </p>
        </div>

        <div className="px-6">
          <GuessSongForm
            round={round}
            challengeId={challengeId}
            options={shuffledOptions}
          />
        </div>
      </div>
    </>
  );
}
