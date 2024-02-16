import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";

const rankList = [
  {
    name: "Dwight Schrute",
    points: 641,
    rank: 1,
    photo: "https://i.scdn.co/image/ab67616d00001e02ce6d0eef0c1ce77e5f95bbbc",
  },
  {
    name: "Jim Halpert",
    points: 640,
    rank: 2,
    photo: "https://i.scdn.co/image/ab67616d00001e02ce6d0eef0c1ce77e5f95bbbc",
  },
  {
    name: "Pam Beesly",
    points: 440,
    rank: 3,
    photo: "https://i.scdn.co/image/ab67616d00001e02ce6d0eef0c1ce77e5f95bbbc",
  },
  {
    name: "Creed Bratton",
    points: 240,
    rank: 4,
    photo: "https://i.scdn.co/image/ab67616d00001e02ce6d0eef0c1ce77e5f95bbbc",
  },
  {
    name: "Michael Scott",
    points: 200,
    rank: 5,
    photo: "https://i.scdn.co/image/ab67616d00001e02ce6d0eef0c1ce77e5f95bbbc",
  },
];

export default function RankList() {
  return (
    <div className="w-full">
      <h2 className="text-base font-semibold tracking-tight mb-4">
        Rank
      </h2>
      <ul>
        {rankList.map((user, index) => (
          <li className="mb-2" key={index}>
            <div className="flex flex-row items-center">
              <p className="text-sm font-mono font-semibold mr-4">
                {user.rank}
              </p>
              <Avatar>
                <AvatarImage src={user.photo} />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div className="ml-2">
                <h3 className="text-center font-semibold tracking-tight">
                  {user.name}
                </h3>
                <p className="font-mono text-sm">{user.points} points</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
