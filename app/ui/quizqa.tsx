"use client";

import { useState } from "react";

export default function QuizQuestionAnswers() {
    const [selectedAnswerId, setSelectedAnswerId] = useState(null);
    const question = "What's the name of the song and which album is it from?"
    const answers = ["Answer 1, The heart of the meadows (1994)", "Answer 2", "Answer 3", "Answer 4"];

    function onClick() {
        setSelectedAnswerId("1");
        // answer the question; check the answer;
    }

    return (
        <div className="flex flex-col w-full">
            <h3 className="text-xl text-center font-semibold tracking-tight leading-7 text-white">
                {question}
            </h3>
            <ul className="mt-8">
                {answers.map((answer, index) =>
                    <li key={index} className="mb-2">
                        <button className="px-3 py-4 border-2 w-full rounded-full border-indigo-500" onClick={onClick}>
                            <span className="text-base tracking-tight leading-7">
                                {answer}
                            </span>
                        </button>
                    </li>
                )}
            </ul>
        </div>
    );
}