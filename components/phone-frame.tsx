import { ReactNode } from "react";

export default function PhoneFrame({ children }: { children: ReactNode }) {
  return (
    <div className="w-full min-h-screen md:max-w-[414px] md:h-[736px] md:max-h-[736px] overflow-hidden md:border-8 md:border-black md:rounded-3xl md:ring-offset-white">
      <div className="ring-slate-600 min-h-full w-full pb-12 relative">
        {children}
      </div>
    </div>
  );
}