import { ReactNode } from "react";

export default function PhoneFrame({ children }: { children: ReactNode }) {
  return (
    <div className="w-[414px] max-w-[414px] h-[736px] max-h-[736px] bg-gray-950 overflow-hidden md:border-8 border-black md:rounded-3xl md:ring-offset-white">
      <div className="ring-slate-600 min-h-full w-full">
        {children}
      </div>
    </div>
  );
}
