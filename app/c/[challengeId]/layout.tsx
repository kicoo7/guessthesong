// write a layout

import PhoneFrame from "@/components/phone-frame";
import { ReactNode } from "react";

export default async function SongLayout({ song }: {song: ReactNode}) {
  
  const getStatus = 0;

  return (
    <main className="min-h-screen w-full max-w-screen-lg flex flex-row items-center justify-center mx-auto md:p-8">
      <PhoneFrame>
        {song}
      </PhoneFrame>
    </main>
  );
}
