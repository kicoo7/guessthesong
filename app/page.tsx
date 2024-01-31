import { SignInButton } from "@/components/signin-button";
import { Button } from "@/components/ui/button";

export default async function Home() {
  return (
     <main className="min-h-screen w-full max-w-screen-lg flex flex-row items-center justify-between mx-auto p-8">
        <div className="flex flex-col">
          <h1 className="text-7xl font-extrabold tracking-tight">Guess the song</h1>
          <p className="mt-4 text-gray-400 text-lg font-normal tracking-normal">Guess as many songs as you can.</p>
          <div className="mt-6">
            <SignInButton/>
          </div>
        </div>

        <div className="w-[365px] h-[650px] border-2 border-white rounded-3xl p-2">
          <div className="border-4 rounded-3xl border-black min-h-full w-full bg-red-400"/>
        </div>
    </main>
  )
}
