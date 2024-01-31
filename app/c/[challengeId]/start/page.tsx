import PhoneFrame from "@/components/phone-frame";
import { Button } from "@/components/ui/button";
import Image from "next/image";


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
        <main className="min-h-screen w-full max-w-screen-lg flex flex-row items-center justify-center mx-auto md:p-8">
            <PhoneFrame>
                <div className="mt-auto mb-auto flex flex-col w-full">
                    <div className="rounded-3xl">
                        <Image alt="challenge photo" src="https://i.scdn.co/image/ab67616d00001e02ff9ca10b55ce82ae553c8228" width="300" height="300" className="w-full h-auto object-contain aspect-auto" />
                    </div>
                    <div className="p-4">
                        <h1 className="text-3xl font-bold tracking-tight">{challenge?.title}</h1>
                        {/* <div className="mt-2 flex flex-row items-center">
                            <Image src={challenge.ownerPhoto} alt="Profile photo" width="16" height="16" className="mr-1 w-4 h-4 shadow-md rounded-full" />
                            <p className="text-xs text-center tracking-tight">{challenge.ownerName}</p>
                        </div> */}
                        <p className="mt-2 tracking-tight">Guess as many songs and artists from this 90s playlist.</p>
                        <div className="mt-6 flex">
                            <Button size={"lg"} className="rounded-full w-full">Start Challenge</Button>
                        </div>
                        <p className="mt-2 text-xs text-center font-medium tracking-tight">{challenge?.description}</p>
                    </div>
                </div>
            </PhoneFrame>
        </main>
    );
}