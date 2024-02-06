"use client";
import { useFormStatus, useFormState } from "react-dom";
import { Button } from "./ui/button";
import { guessSong } from "@/app/actions";
import clsx from "clsx";

function OptionButton({ option }: { option: string}) {
  const { pending, data } = useFormStatus();
  const selectedOption = data?.get("selected-option");
  const isSelected = option === selectedOption;

  return (
    <Button
      type="submit"
      size={"lg"}
      variant={"outline"}
      className={clsx([isSelected && "animate-pulse bg-orange-700", "rounded-full w-full", "text-ellipsis", "overflow-hidden"])}
      disabled={pending}
      name="selected-option"
      value={String(option)}
    >
      {option}
    </Button>
  );
}

export default function GuessSongForm({
  round,
  challengeId,
  options,
}: {
  round: number;
  challengeId: string;
  options: string[];
}) { 
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
