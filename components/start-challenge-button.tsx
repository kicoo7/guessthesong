"use client";
import { Button } from "@/components/ui/button";
import { useFormStatus } from "react-dom";

export function StartChallengeButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" size={"lg"} className="rounded-full w-full" disabled={pending}>
      Start Challenge
    </Button>
  );
}
