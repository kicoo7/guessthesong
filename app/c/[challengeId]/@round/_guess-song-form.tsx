"use client";
import { guessSong } from "@/app/actions";
import { Button } from "@/components/ui/button";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { useFormStatus } from "react-dom";

export default function GuessSongForm({
  round,
  challengeId,
  options,
  uri,
}: {
  round: number;
  challengeId: string;
  options: string[];
  uri: string;
}) {
  useEffect(() => {
    window.EmbedController?.loadUri(uri);
    window.EmbedController?.seek(15);
    window.EmbedController?.play();
  }, [uri]);

  return (
    <form action={guessSong}>
      <input type="hidden" name="challenge-id" value={challengeId} />
      <input type="hidden" name="round" value={round} />
      <ul className="w-full">
        {options.map((option, index) => (
          <li key={index} className="mb-2">
            <OptionButton option={option} />
          </li>
        ))}
      </ul>
    </form>
  );
}

function OptionButton({ option }: { option: string }) {
  const { pending } = useFormStatus();
  const [isSelected, setIsSelected] = useState(false);
  
  function onClick(){
    setIsSelected(true);
  }

  return (
    <div className={clsx([isSelected ? "border border-orange-400 rounded-full animate-in" : "border-none"])}>
      <Button
        onClick = {onClick}
        type="submit"
        size={"lg"}
        variant={"outline"}
        className={clsx([
          isSelected && "bg-orange-600",
          isSelected && "text-slate-50",
          "rounded-full w-full",
          "text-ellipsis",
          "overflow-hidden",
        ])}
        disabled={pending && isSelected === false}
        name="selected-option"
        value={String(option)}
      >
        {option}
      </Button>
    </div>
  );
}
