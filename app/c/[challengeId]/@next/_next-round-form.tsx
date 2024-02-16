"use client";
import { startNextRound } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useFormStatus } from "react-dom";

export default function NextRoundForm({
  challengeId,
  round,
}: {
  challengeId: string;
  round: number;
}) {
  const startNextRoundWithChallengeId = startNextRound.bind(null, challengeId);

  return (
    <form action={startNextRoundWithChallengeId}>
      {round <= 9 ? <StartNextRoundButton /> : <SeeResultsButton />}
    </form>
  );
}

function StartNextRoundButton() {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      size="lg"
      variant="outline"
      className="rounded-full w-full mt-2"
      disabled={pending}
    >
      {pending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      Next Song
    </Button>
  );
}

function SeeResultsButton() {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      size="lg"
      variant="outline"
      className="rounded-full w-full mt-2"
      disabled={pending}
    >
      {pending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      See results
    </Button>
  );
}
