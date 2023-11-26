import { answerQuestion, getSpotifyAccessToken } from "@/app/actions";
import Player from "@/app/_ui/player";
import { OptionButton } from "@/app/_ui/option-button";

function QuestionWithOptions({ question, questionId, challengeId, options, selectedOptionId, answerId }: { question: string, questionId: string, challengeId: string, options: string[], selectedOptionId?: string, answerId?: string }) {
    // i want to shuffle the options array
    const shuffledOptions = options.sort(() => Math.random() - 0.5);
    const answerQuestionWithChallengeIdAndQuestionId = answerQuestion.bind(null, challengeId, questionId);

    const isAnswered = typeof selectedOptionId === "string";

    return (
        <div className="flex flex-col w-full">
            <div>
                <div className="flex flex-row">
                    <p className="text-xs font-mono leading-7 mr-auto">Question 1/3</p>
                    <p className="text-xs font-mono leading-7">00:59</p>
                </div>
            </div>
            <h3 className="mt-2 text-xl text-center font-semibold tracking-tight leading-7 text-white">
                {question}
            </h3>

            <form action={answerQuestionWithChallengeIdAndQuestionId}>
                <ul className="mt-12">
                    {shuffledOptions.map((option, index) =>
                        <li key={index} className="mb-2">
                            <OptionButton disabled={isAnswered} answerId={answerId} optionId={String(index)}>{option}</OptionButton>
                        </li>
                    )}
                </ul>
            </form>
        </div >
    );
}

export default async function Page({ params: { challengeId, questionId } }: { params: { challengeId: string, questionId: string } }) {
    const accessToken = await getSpotifyAccessToken();

    // const question = await getQuestion({ challengeId, questionId });
    // const isAnswered = await getUserAnswerByQuestionId({ questionId })

    const isAnswered = true;
    const selectedOptionId = 1;
    const trackUri = "spotify:track:2xLMifQCjDGFmkHkpNLD9h";
    const cover = "https://i.scdn.co/image/ab67616d0000b273c5b2c6c8b0a7c9e6e4a3c5b2";

    const question = "What's the name of the song and which album is it from?"

    // options
    const options = ["Answer 1, The heart of the meadows (1994)", "Answer 2", "Answer 3", "Answer 4"];

    return (
        <div className="flex flex-col mt-auto mb-auto">
            {/* <Player trackUri={trackUri} image={cover} blur={!isAnswered} /> */}
            <QuestionWithOptions questionId={questionId} challengeId={challengeId} question={question} options={options} />
        </div>
    );
};