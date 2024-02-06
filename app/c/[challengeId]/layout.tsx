import PhoneFrame from "@/components/phone-frame";
import { ReactNode } from "react";

export default async function ChallengeLayout({
  children, 
}: {
  children: ReactNode;
}) {
  return (
    <main className="min-h-screen w-full max-w-screen-lg flex flex-row items-center justify-center mx-auto md:p-8">
      <PhoneFrame>
        {children}
      </PhoneFrame>
    </main>
  );
}
