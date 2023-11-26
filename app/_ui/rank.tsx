import Image from "next/image";



const rankList = [
    {
        name: "Dwight Schrute",
        points: 641,
        rank: 1,
        photo: "https://i.scdn.co/image/ab67616d00001e02ce6d0eef0c1ce77e5f95bbbc"
    },
    {
        name: "Jim Halpert",
        points: 640,
        rank: 2,
        photo: "https://i.scdn.co/image/ab67616d00001e02ce6d0eef0c1ce77e5f95bbbc"
    },
    {
        name: "Pam Beesly",
        points: 440,
        rank: 3,
        photo: "https://i.scdn.co/image/ab67616d00001e02ce6d0eef0c1ce77e5f95bbbc"
    },
    {
        name: "Creed Bratton",
        points: 240,
        rank: 4,
        photo: "https://i.scdn.co/image/ab67616d00001e02ce6d0eef0c1ce77e5f95bbbc"
    },
    {
        name: "Michael Scott",
        points: 200,
        rank: 5,
        photo: "https://i.scdn.co/image/ab67616d00001e02ce6d0eef0c1ce77e5f95bbbc"
    },
]

export default function RankList() {
    return (
        <div className="w-full">
            <h2 className="text-base font-semibold tracking-tight text-white mb-4">Rank</h2>
            <ul>
                {rankList.map((user, index) => (
                    <li className="mb-2" key={index}>
                        <div className="flex flex-row items-center">
                            <p className="text-xs font-semibold text-white mr-4">{user.rank}</p>
                            <Image src={user.photo} alt="Profile photo" width="32" height="32" className="mr-2 w-10 h-10 shadow-md" />
                            <div>
                                <h3 className="text-sm text-center font-semibold tracking-tight text-white">{user.name}</h3>
                                <p className="text-xs text-slate-200">{user.points} points</p>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div >
    );
}