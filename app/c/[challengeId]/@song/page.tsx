import GuessSongForm from "@/components/song-form";
import Image from "next/image";


export default async function GuessSongPage({
  params:{ challengeId }
}: {
  params:{ challengeId: string }
}) {
 
  console.log("challengeId", challengeId);
  // based on the user id and ddd fetch
  const challengeName = "The ultimate 90s challenge";
  const isAnswered = false;
  const trackUri = "spotify:track:2xLMifQCjDGFmkHkpNLD9h";
  const cover =
    "https://i.scdn.co/image/ab67616d0000b273c5b2c6c8b0a7c9e6e4a3c5b2";

  const question = "Guess the song";
  const questionId = "123";

  // options
  const options = [
    "Answer 1, my heart will go onnnnn yess., The heart",
    "Answer 2",
    "Answer 3",
    "Answer 4",
  ];


  return (
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
            {question}
          </h3>
          <p className="text-base text-center font-mono text-gray-400">
            {"description"}
          </p>
        </div>

        <div className="p-4">
            <GuessSongForm questionId={questionId} challengeId={challengeId} options={options}/> 
        </div>
      </div>
    </div>
  );
}
