// write a layout

import PhoneFrame from "@/components/phone-frame";
import { ReactNode } from "react";

export default async function ChallengeLayout({
  start,
  finish,
  song,
}: {
  start: ReactNode;
  finish: ReactNode;
  song: ReactNode;
}) {
  const getStatus = 0;

  return (
    <main className="min-h-screen w-full max-w-screen-lg flex flex-row items-center justify-center mx-auto md:p-8">
      <PhoneFrame>
        {getStatus === -1 && start}
        {getStatus === 1 && finish}
        {getStatus === 0 && song}
      </PhoneFrame>
    </main>
  );
}
