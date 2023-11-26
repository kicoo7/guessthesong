"use client";

export function Button({ children, onClick = () => { }, }: { children: React.ReactNode, onClick?: () => void }) {
    return (<button onClick={onClick} className="bg-[#1ED760] w-full text-black font-semibold py-3.5 px-5 rounded-full">{children}</button>);
}