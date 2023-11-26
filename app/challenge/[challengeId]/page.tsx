import RankList from "@/app/_ui/rank";
import { ChevronLeftCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function ChallengePage({ params: { challengeId } }: { params: { challengeId: string } }) {
    // const challenge = await getChallenge({ challengeId });

    const challenge = {
        id: challengeId,
        title: "Are you the ultimate Queen fan?",
        description: "22300 people have tried this challenge.",
        ownerPhoto: "https://i.scdn.co/image/ab67616d00001e02ff9ca10b55ce82ae553c8228",
        ownerName: "Peter Griffin",
    }

    return (
        <div className="mt-auto mb-auto flex flex-col w-full">
            <Link href="/">
                <ChevronLeftCircle className="w-6 h-6 absolute left-4 top-4" />
            </Link>
            <div>
                <Image alt="challenge photo" src="https://i.scdn.co/image/ab67616d00001e02ff9ca10b55ce82ae553c8228" width="300" height="300" className="mx-auto mb-8 w-64 h-64 object-contain aspect-auto" />
            </div>
            <h1 className="text-4xl font-bold tracking-tight">{challenge?.title}</h1>
            <div className="mt-2 flex flex-row items-center">
                <Image src={challenge.ownerPhoto} alt="Profile photo" width="16" height="16" className="mr-1 w-4 h-4 shadow-md rounded-full" />
                <p className="text-xs text-center font-semibold tracking-tight text-white/90">{challenge.ownerName}</p>
            </div>
            <button className="max-w-sm mt-6 py-4 px-8 bg-lime-600 rounded-full text-black" name="challengeId" value={challengeId} type="submit">
                <span className="text-base font-semibold tracking-tight leading-7">Start Challenge</span>
            </button>
            <p className="mt-2 mb-12 text-xs text-center font-medium tracking-tight text-white/90">{challenge?.description}</p>
            <RankList />
        </div>
    );
}