"use client";
import { useState } from "react";
import { useFormStatus } from 'react-dom'
import clsx from "clsx";
import { Button } from "./button";

export function OptionButton({ children, optionId, disabled = false, isCorrect }: { children: React.ReactNode, optionId: string, disabled?: boolean, isCorrect?: boolean }) {
    const [isSelected, setIsSelected] = useState(false);
    const { pending } = useFormStatus();

    async function handleOptionButtonClick() {
        setIsSelected(true);
    }

    return (
        // <button type="submit" disabled={pending || disabled} name="optionId" value={optionId} onClick={handleOptionButtonClick}
        //     className={clsx("px-3 py-4 border-2 w-full rounded-full border-indigo-500", isSelected === true && "bg-orange-500")}>
        //     <p className="text-base font-medium tracking-tight leading-7 truncate text-ellipsis">
        //         {children}
        //     </p>
        // </button>

        <Button variant="secondary">{children}</Button>
    );
}