import { answerQuestion, getSpotifyAccessToken } from "@/app/actions";
import Player from "@/app/_ui/player";
import Image from "next/image";
import clsx from "clsx";
import PhoneFrame from "@/components/phone-frame";
import { Button } from "@/components/ui/button";

function QuestionWithOptions({
  question,
  questionId,
  challengeId,
  options,
  selectedOptionId,
  answerId,
}: {
  question: string;
  questionId: string;
  challengeId: string;
  options: string[];
  selectedOptionId?: string;
  answerId?: string;
}) {
  const shuffledOptions = options.sort(() => Math.random() - 0.5);
  const answerQuestionWithChallengeIdAndQuestionId = answerQuestion.bind(
    null,
    challengeId,
    questionId
  );

  const isAnswered = typeof selectedOptionId === "string";

  return (
    <form action={answerQuestionWithChallengeIdAndQuestionId}>
      <ul className="w-full">
        {shuffledOptions.map((option, index) => (
          <li key={index} className="mb-2">
            <Button
              size={"lg"}
              variant={"outline"}
              className="rounded-full w-full"
              disabled={isAnswered}
              answerId={answerId}
              optionId={String(index)}
            >
              {option}
            </Button>
          </li>
        ))}
      </ul>
    </form>
  );
}

function Result() {
  return (
    <div className="flex flex-col">
      <p className="text-sm uppercase font-medium tracking-normal text-center text-green-600">
        You guessed correctly
      </p>
      <p className="text-sm uppercase font-medium tracking-normal text-center text-red-600">
        You answered XYZ BZY BYSDASADSD asdadasd
      </p>
      <Button size={"lg"} className="mt-4 w-full rounded-full">
        Next Song
      </Button>
    </div>
  );
}

export default async function Page({
  params: { challengeId, questionId },
}: {
  params: { challengeId: string; questionId: string };
}) {
  const accessToken = await getSpotifyAccessToken();

  // const question = await getQuestion({ challengeId, questionId });
  // const isAnswered = await getUserAnswerByQuestionId({ questionId })

  const challengeName = "The ultimate 90s challenge";
  const isAnswered = true;
  const trackUri = "spotify:track:2xLMifQCjDGFmkHkpNLD9h";
  const cover =
    "https://i.scdn.co/image/ab67616d0000b273c5b2c6c8b0a7c9e6e4a3c5b2";

  const question = "Guess the song";

  // options
  const options = [
    "Answer 1, my heart will go onnnnn yess., The heart",
    "Answer 2",
    "Answer 3",
    "Answer 4",
  ];

  const title = isAnswered === true ? "Mercy" : "Guess the song";
  const description = isAnswered === true ? "Guns and Roses" : "00:30";

  return (
    <main className="min-h-screen w-full max-w-screen-lg flex flex-row items-center justify-center mx-auto md:p-8">
      <PhoneFrame>
        <div className="w-full">
          <div className="flex flex-col">
            <div className="mt-6">
              <Image
                src={
                  "https://i.scdn.co/image/ab67616d00001e02ce6d0eef0c1ce77e5f95bbbc"
                }
                width="120"
                height="120"
                className={"w-48 h-48 mx-auto blur-md animate-pulse"}
                alt="Album Cover"
              />
            </div>

            <div className="flex flex-col text-center mt-4">
              <h3 className="text-2xl font-semibold tracking-tight leading-7">
                {title}
              </h3>
              <p className="text-base text-center font-mono text-gray-400">
                {description}
              </p>
            </div>

            <div className="w-full p-4">
              {isAnswered === true ? (
                <Result />
              ) : (
                <QuestionWithOptions
                  questionId={questionId}
                  challengeId={challengeId}
                  question={question}
                  options={options}
                />
              )}
            </div>

            {/* <Player trackUri={trackUri} image={cover} blur={!isAnswered} /> */}
          </div>
        </div>
      </PhoneFrame>
    </main>
  );
}
