import PhoneFrame from "@/components/phone-frame";
import { SignInButton } from "@/components/signin-button";

export default async function Home() {
  return (
    <main className="max-w-screen-lg mx-auto md:p-8">
      <div className="mx-auto w-fit">
        <PhoneFrame>
          <div className="p-6">
            <h1 className="text-3xl font-mono font-bold tracking-tighter leading-10 text-slate-50">
              Welcome to Guess The Song!
            </h1>
            <p className="mt-2 mb-6 font-mono tracking-tight text-gray-400">
              Sign in with Spotify to get started
            </p>
            <SignInButton />
          </div>
        </PhoneFrame>
      </div>
    </main>
  );
}
