import Player from "@/app/_ui/player";
import { startChallenge } from "@/app/actions";
import { Song, getChallengeAttemptByEmail, getChallengeById } from "@/app/db";
import { auth } from "@/auth";
import GuessSongForm from "@/components/song-form";
import { StartChallengeButton } from "@/components/start-challenge-button";
import Image from "next/image";
import { notFound, redirect } from "next/navigation";

export default async function ChallengePage({
  params: { challengeId },
}: {
  params: { challengeId: string };
}) {
  const session = await auth();
  if (!session || !session.user?.email) {
    redirect("/");
  }

  const challenge = await getChallengeById(challengeId);
  if (!challenge) {
    notFound();
  }

  const { title, description, id, imageUrl, options, songs } = challenge;
  const attempt = await getChallengeAttemptByEmail(
    challengeId,
    session.user.email
  );

  if (!attempt) {
    return (
      <ChallengeDetails
        title={title}
        description={description}
        imageUrl={imageUrl}
        id={id}
      />
    );
  }

  if (attempt.finishedAt) {
    return <div>Challenge finished</div>;
  }

  const normalizedOptions = options
    .map((option) => option.name)
    .slice((attempt.round - 1) * 3, (attempt.round - 1) * 3 + 3);

  return (
    <GuessSong
      challengeId={challengeId}
      round={attempt.round}
      song={songs[attempt.round-1]}
      options={normalizedOptions}
    />
  );
}

function ChallengeDetails({
  title,
  description,
  id,
  imageUrl,
}: {
  title: string;
  description: string;
  id: string;
  imageUrl: string;
}) {
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
        {/* <div className="mt-2 flex flex-row items-center">
                            <Image src={challenge.ownerPhoto} alt="Profile photo" width="16" height="16" className="mr-1 w-4 h-4 shadow-md rounded-full" />
                            <p className="text-xs text-center tracking-tight">{challenge.ownerName}</p>
                        </div> */}
        <p className="mt-2 tracking-tight">{description}</p>
        <div className="mt-6 flex">
          <form action={startChallenge.bind(null, id)}>
            <StartChallengeButton />
          </form>
        </div>
        <p className="mt-2 text-xs text-center font-medium tracking-tight">
          {"Change me"}
        </p>
      </div>
    </div>
  );
}

async function GuessSong({
  challengeId,
  round,
  song,
  options,
}: {
  challengeId:string,
  round: number;
  song: Song;
  options: string[];
}) {
  const question = "Guess the song";
  const shuffledOptions = [...options, song.name].sort(
    () => Math.random() - 0.5
  );

  return (
    <div className="w-full">
      <div className="flex flex-col">
        <div className="mt-6">
          <Player trackUri={song.uri} blur={true} image={song.imageUrl} />
        </div>

        <div className="flex flex-col text-center mt-4">
          <h3 className="text-2xl font-semibold tracking-tight leading-7">
            {question}
          </h3>
          <p className="text-base text-center font-mono text-gray-400">
            {"description"}
          </p>
        </div>

        <div className="p-4">
          <GuessSongForm
            round={round}
            challengeId={challengeId}
            options={shuffledOptions}
          />
        </div>
      </div>
    </div>
  );
}
