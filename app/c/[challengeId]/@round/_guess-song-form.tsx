"use client";
import { guessSong } from "@/app/actions";
import { SubmitButton } from "@/components/submit-button";
import { Button } from "@/components/ui/button";
import clsx from "clsx";
import React from "react";
import { useFormStatus } from "react-dom";

export default function GuessSongForm({
  options,
  challengeId,
  round,
}: {
  options: string[];
  challengeId: string;
  round: number;
}) {
  async function guessSongWithIdAndRound(formData: FormData) {
    formData.append("challenge-id", challengeId);
    formData.append("round", String(round));

    // wait 2 seconds before sending the request
    await new Promise((resolve) => setTimeout(resolve, 2000));
    await guessSong(formData);
  }

  return (
    <form action={guessSongWithIdAndRound}>
      <input type="hidden" name="challenge-id" value={challengeId} />
      <input type="hidden" name="round" value={round} />
      <ul className="w-full">
        {options.map((option) => (
          <li
            key={option.toLowerCase().trim().replace(" ", "-")}
            className="mb-3"
          >
            <OptionButton option={option} />
          </li>
        ))}
      </ul>
    </form>
  );
}

function OptionButton({ option }: { option: string }) {
  const { pending, data } = useFormStatus();
  const isSelected = data?.get("selected-option") === option;

  return (
    <Button
      size={"lg"}
      type={"submit"}
      className={clsx([
        isSelected ? "bg-orange-400 hover:bg-orange-400 disabled:bg-orange-400" : "bg-none",
        "rounded-lg w-full text-sm font-mono shadow-3xl border border-[#313131]",
      ])}
      disabled={pending}
      name="selected-option"
      value={String(option)}
    >
      <span className="truncate">{option}</span>
    </Button>
  );
}
