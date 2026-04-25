"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MessageSquare } from "lucide-react";

export default function FloatingChatButton() {
    const pathname = usePathname();

    // Hide if we are on journey page (because of the shorts tab)
    // Or you can make it more specific if you use searchParams
    if (pathname === "/journey") return null;
    if (pathname === "/chat") return null;
    if (pathname.includes("/truth")) return null;

    return (
        <Link
            href="/chat"
            className="fixed bottom-24 right-6 ml-auto mr-0 w-14 h-14 bg-primary text-white rounded-2xl shadow-xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all z-40"
            style={{
                right: 'max(1.5rem, calc((100vw - 448px) / 2 + 1.5rem))'
            }}
        >
            <MessageSquare size={28} fill="currentColor" />
        </Link>
    );
}
