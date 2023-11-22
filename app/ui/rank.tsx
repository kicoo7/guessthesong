import Image from "next/image";

export default function RankList() {
    return (
        <div className="w-full">
            <ul>
                <li className="mb-2 divide-y">
                    <div className="flex flex-row items-center">
                        <Image src={"https://i.scdn.co/image/ab67616d00001e02ce6d0eef0c1ce77e5f95bbbc"} alt="Profile photo" width="32" height="32" className="mr-2 rounded-full w-10 h-10 shadow-md" />
                        <div>
                            <h3 className="text-base text-center font-semibold tracking-tight text-white">John Dilbert the III</h3>
                            <p className="text-xs text-slate-200">240 points</p>
                        </div>
                        <div className="flex-1" />
                        <p className="text-2xl text-slate-200">#1</p>
                    </div>
                </li>
                <li>
                    <div className="flex flex-row items-center">
                        <Image src={"https://i.scdn.co/image/ab67616d00001e02ce6d0eef0c1ce77e5f95bbbc"} alt="Profile photo" width="32" height="32" className="mr-2 rounded-full w-10 h-10 shadow-md" />
                        <div>
                            <h3 className="text-base text-center font-semibold tracking-tight text-white">John Dilbert the III</h3>
                            <p className="text-xs text-slate-200">240 points</p>
                        </div>
                        <div className="flex-1" />
                        <p className="text-2xl text-slate-200">#1</p>
                    </div>
                </li>
            </ul>
        </div>
    );
}