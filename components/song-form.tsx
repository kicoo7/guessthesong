"use client";

import { useFormStatus } from "react-dom";
import { Button } from "./ui/button";
import { answerQuestion } from "@/app/actions";

function OptionButton({ option }: { option: string }) {
  const { pending, data } = useFormStatus();
  return (
    <Button
      size={"lg"}
      variant={"outline"}
      className="rounded-full w-full"
      disabled={pending || Boolean(data)}
      value={String(option)}
    >
      {option}
    </Button>
  );
}

export default function GuessSongForm({
  questionId,
  challengeId,
  options,
}: {
  questionId: string;
  challengeId: string;
  options: string[];
}) {
  const shuffledOptions = options.sort(() => Math.random() - 0.5);

  // use formState to update the right/wrong question
  const answerQuestionWithChallengeIdAndQuestionId = answerQuestion.bind(
    null,
    challengeId,
    questionId
  );

  return (
    <form action={answerQuestionWithChallengeIdAndQuestionId}>
      <ul className="w-full">
        {shuffledOptions.map((option, index) => (
          <li key={index} className="mb-2">
            <OptionButton option={option}/>
          </li>
        ))}
      </ul>
    </form>
  );
}
