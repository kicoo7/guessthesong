import { ReactNode } from "react";

export default function PhoneFrame({ children }: { children: ReactNode }) {
  return (
    <div className="w-[414px] max-w-[414px] h-[736px] max-h-[736px] overflow-hidden border rounded-3xl">
      <div className="border-8 rounded-3xl border-black ring-slate-600 min-h-full w-full">
        {children}
      </div>
    </div>
  );
}
