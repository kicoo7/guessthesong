"use client";
import { clsx } from "clsx";

export function Button({ children, onClick = () => { }, className, disabled = false, variant="primary" }: { children: React.ReactNode, onClick?: () => void, className: string, disabled?: boolean, variant: "primary" | "secondary" }) {
    return (<button 
        onClick={onClick} 
        disabled={disabled} 
        className={clsx(["w-full font-semibold py-3.5 px-5 rounded-full", variant === "primary" && "bg-spotify-green text-black", variant === "secondary" && "border bg-black text-white"  ,className])}>
            {children}
    </button>);
}