import { auth } from "@/auth";
import PhoneFrame from "@/components/phone-frame";
import { SignInButton } from "@/components/signin-button";
import { redirect } from "next/navigation";

export default async function Home() {

  const session = await auth();
  if(session && session.user?.email && !session.error){
    redirect("/c/4377cd9b-bc13-4182-8277-db61895009b3")
  }

  return (
    <main className="w-full md:flex md:items-center md:justify-center md:p-8">
      <PhoneFrame>
          <div className="p-6 pb-8 absolute top-1/4">
            <h1 className="text-4xl font-mono font-semibold text-slate-50">
              Discover Your Next Anthem!
            </h1>
            <p className="mt-2 mb-6 font-mono tracking-tight text-gray-400">
              Test your music knowledge and discover new songs. Your next music
              obsession could be just a guess away. Ready to play?
            </p>
            <SignInButton />
          </div>
      </PhoneFrame>
    </main>
  );
}
