"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, MessageSquare, ShieldAlert, Trophy, User, BarChart2 } from "lucide-react";

export default function BottomNav() {
    const pathname = usePathname();

    const navItems = [
        { name: "Home", href: "/", icon: Home },
        { name: "Truth", href: "/truth", icon: BarChart2 },
        { name: "Scanner", href: "/scanner", icon: ShieldAlert },
        { name: "Chat", href: "/chat", icon: MessageSquare },
        { name: "Journey", href: "/journey", icon: Trophy },
        { name: "Profile", href: "/profile", icon: User },
    ];

    return (
        <nav className="fixed bottom-0 w-full max-w-md bg-surface border-t border-border z-50">
            <div className="flex justify-around items-center px-2 py-3">
                {navItems.map((item) => {
                    const isActive = pathname === item.href;
                    const Icon = item.icon;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className="relative flex flex-col items-center gap-1 w-16"
                        >
                            <div
                                className={`flex items-center justify-center w-10 h-10 rounded-full transition-colors ${isActive ? "bg-primary-light/50 text-primary-dark dark:bg-primary-light/20 dark:text-primary" : "text-foreground-muted hover:bg-surface-hover"
                                    }`}
                            >
                                <Icon
                                    size={20}
                                    strokeWidth={isActive ? 2.5 : 2}
                                />
                            </div>
                            <span className={`text-[10px] font-medium tracking-wide ${isActive ? "text-primary-dark dark:text-primary font-bold" : "text-foreground-muted"}`}>
                                {item.name}
                            </span>
                        </Link>
                    );
                })}
            </div>
        </nav>
    );
}
