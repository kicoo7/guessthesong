"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from 'next/navigation'

function classNames(classes: string[]) {
    return classes.filter(Boolean).join(' ')
}

function NavbarLink({ href, isActive = false, children }: { href: string, isActive?: boolean, children: React.ReactNode }) {
    return (
        <Link href={href}>
            <div className={classNames(["flex flex-col h-full px-3 py-2 rounded-sm shadow-sm flex-1", isActive ? "border-b-2 border-white" : ""])}>
                <p className={classNames(["text-sm h-full tracking-normal font-medium leading-6 shadow-sm text-gray-400", isActive ? "text-white" : ""])} >{children}</p>
            </div>
        </Link>
    );
}

export function Navbar() {
    const pathname = usePathname();

    return (
        <div className="h-12 fixed top-0 left-0 right-0 bg-black text-white">
            <div className="h-12 mx-auto max-w-4xl flex flex-row gap-2 items-center">
                <NavbarLink href="/" isActive={"/" === pathname}>Daily Challenge By Kicofy (3/8)</NavbarLink>
                <div className="flex flex-1" />
                <Link href="/me">
                    <Image src="https://i.scdn.co/image/ab67616d00001e02d55149748dca0e5a1f40778e" alt="Logo" width={24} height={24} className="w-8 h-8 mr-2 rounded-full border border-indigo-500" />
                </Link>
            </div>
        </div>
    );
}