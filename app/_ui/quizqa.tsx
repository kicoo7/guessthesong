"use client";

import { useState } from "react";
import { answerQuestion, handleSubmitAnswerForm } from "../actions";
import { useFormState, useFormStatus } from "react-dom";


function OptionButton({ children, answerId, challengeId, questionId }: { children: React.ReactNode, answerId: string, challengeId: string, questionId: string }) {
    const [isSelected, setIsSelected] = useState(false);

    async function handleAnswerButtonClick() {
        setIsSelected(true);
        const res = await answerQuestion({ challengeId, questionId, answerId });
        setIsSelected(false);
    }

    return (
        <button onClick={handleAnswerButtonClick} name={"answer"} value={answerId} className="px-3 py-4 border-2 w-full rounded-full border-indigo-500">
            <span className="text-base tracking-tight leading-7">
                {children}
            </span>
        </button>
    );
}


// goes to server
export default function QuizQuestionAnswers({ question, questionId, challengeId, options }: { question: string, questionId: string, challengeId: string, options: string[], answerQuestion: (challengeId: string, questionId: string, answerId: string) => void }) {
    // i want to shuffle the options array
    const shuffledAnswersArray = options.sort(() => Math.random() - 0.5);

    return (
        <div className="flex flex-col w-full">
            <h3 className="text-xl text-center font-semibold tracking-tight leading-7 text-white">
                {question}
            </h3>

            <ul className="mt-8">
                {options.map((options, index) =>
                    <li key={index} className="mb-2">
                        <OptionButton questionId={questionId} challengeId={challengeId} answerId={String(index)}>{answer}</OptionButton>
                    </li>
                )}
            </ul>

        </div >
    );
}