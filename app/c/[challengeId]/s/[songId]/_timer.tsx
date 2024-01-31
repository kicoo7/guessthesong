"use client";
import { useEffect, useState } from "react";

function formatTime(seconds: number) {
    const minutesLeft = Math.floor(seconds / 60);
    const remainderSeconds = seconds % 60;
    return `${minutesLeft < 10 ? `0${minutesLeft}` : minutesLeft}:${seconds % 60 === 0 ? "00" : remainderSeconds < 10 ? `0${remainderSeconds}` : remainderSeconds}`;
}

export function Timer({ seconds }: { seconds: number }) {
    const [secondsLeft, setSecondsLeft] = useState(seconds);

    useEffect(() => {
        const timer = setTimeout(() => {
            if (secondsLeft === 0) {
                return;
            }
            setSecondsLeft(secondsLeft - 1);
        }, 1000);
        return () => clearTimeout(timer);
    });

    return (<p className="text-xs font-mono leading-7 w-12 text-center">{formatTime(secondsLeft)}</p>)
}