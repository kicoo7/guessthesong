import { startChallenge } from "@/app/actions";
import Image from "next/image";
import { StartChallengeButton } from "./start-challenge-button";

export default function StartChallengePage({
  params: { challengeId },
}: {
  params: { challengeId: string };
}) {
  // const challenge = await getChallenge({ challengeId });

  const challenge = {
    id: challengeId,
    title: "Are you the ultimate Queen fan?",
    description: "22300 people have tried this challenge.",
    ownerPhoto:
      "https://i.scdn.co/image/ab67616d00001e02ff9ca10b55ce82ae553c8228",
    ownerName: "Peter Griffin",
  };

  return (
    <div className="flex flex-col h-full w-full py-10 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
      <div className="mx-auto">
        <Image
          alt="challenge photo"
          src="https://i.scdn.co/image/ab67616d00001e02ff9ca10b55ce82ae553c8228"
          width="300"
          height="300"
          className="w-64 h-64 mx-auto object-contain aspect-auto"
        />
      </div>
      <div className="p-4">
        <h1 className="text-3xl font-bold tracking-tight">
          {challenge?.title}
        </h1>
        {/* <div className="mt-2 flex flex-row items-center">
                            <Image src={challenge.ownerPhoto} alt="Profile photo" width="16" height="16" className="mr-1 w-4 h-4 shadow-md rounded-full" />
                            <p className="text-xs text-center tracking-tight">{challenge.ownerName}</p>
                        </div> */}
        <p className="mt-2 tracking-tight">
          Guess as many songs and artists from this 90s playlist.
        </p>
        <div className="mt-6 flex">
          <form action={startChallenge.bind(null, challengeId)}>
            <StartChallengeButton />
          </form>
        </div>
        <p className="mt-2 text-xs text-center font-medium tracking-tight">
          {challenge?.description}
        </p>
      </div>
    </div>
  );
}
