import Image from "next/image";
import Link from "next/link";
import { Plus as PlusIcon } from 'lucide-react';


function Challenge({ id, title, description, photo, }: { id: string, title: string, description: string, photo: string }) {
  return (
    <Link href={`/challenge/${id}`}>
      <div className="flex flex-row items-center">
        {photo && <Image src={photo} width={200} height={200} className="mr-2 w-14 h-14" alt="Challenge image" />}
        <div className="flex flex-col gap-1">
          <h3 className="text-sm font-semibold text-white leading-normal">{title}</h3>
          <p className="text-xs text-white/90">{description}</p>
        </div>
      </div>
    </Link>
  );
}

function CreateNewChallenge() {
  return (
    <Link href={`/challenge/new`}>
      <div className="flex flex-row items-center">
        <div className="mr-2 w-14 h-14 bg-slate-900">
          <PlusIcon className="w-7 h-full mx-auto" />
        </div>
        <div className="flex flex-col gap-1">
          <h3 className="text-sm font-semibold text-white leading-normal">New challenge</h3>
          <h3 className="text-xs text-white/90">Challenge your friends.</h3>
        </div>
      </div>
    </Link >
  );
}


function Badge({ children }: { children: string }) {
  // create a badge component
  return (
    <button className="bg-slate-900 rounded-full px-4 py-1">
      <span className="text-xs tracking-tight font-semibold">{children}</span>
    </button>
  );
}

export default async function Home() {

  // fetch user
  const user = {
    name: "Michael Scott",
    points: 200,
    rank: 5,
    photo: "https://i.scdn.co/image/ab67616d00001e02ce6d0eef0c1ce77e5f95bbbc"
  };

  const challenges = [
    { id: "1", numChallengers: 23201, title: "How many 90s songs can you get?", photo: "https://i.scdn.co/image/ab67616d00001e02ce6d0eef0c1ce77e5f95bbbc" },
    { id: "2", numChallengers: 2021, title: "The ultimate Queen fan!", photo: "https://i.scdn.co/image/ab67616d00001e02ce6d0eef0c1ce77e5f95bbbc" },
    { id: "3", numChallengers: 21, title: "Challenge 3", photo: "https://i.scdn.co/image/ab67616d00001e02ce6d0eef0c1ce77e5f95bbbc" },
    { id: "4", numChallengers: 321, title: "Challenge 4", photo: "https://i.scdn.co/image/ab67616d00001e02ce6d0eef0c1ce77e5f95bbbc" },
  ]

  return (
    <div className="flex flex-col w-full gap-4">
      <div className="bg-[#121212] absolute left-0 right-0 top-0 h-36">
        <div className="mx-auto max-w-screen-md flex flex-col px-4 pt-8">
          <div className="flex flex-row mb-6 items-center">
            <Image alt={user.name} src={user.photo} width={200} height={200} className="mr-2 w-12 h-12 rounded-full shadow-sm shadow-white" />
            <div className="flex flex-col mr-auto">
              <h1 className="text-xl font-semibold tracking-tight">Peter Griffin</h1>
              <p className="text-sm text-white/90 font-mono">240 points</p>
            </div>
            <Link href="/challenge/new">
              <PlusIcon className="w-7 h-7" />
            </Link>
          </div>

          <div className="flex flex-row gap-2">
            <Badge>
              Hottest
            </Badge>
            <Badge>
              Made by me
            </Badge>
          </div>
        </div>
      </div>

      <div className="mt-36">
        <ul className="mt-4">
          {challenges.map((challenge) => (
            <li className="mb-4" key={challenge.id}>
              <Challenge id={challenge.id} title={challenge.title} description={`${challenge.numChallengers} challengers`} photo={challenge.photo} />
            </li>
          )
          )}
          <li className="mb-4" >
            <CreateNewChallenge />
          </li>
        </ul>
      </div>
    </div >
  )
}
