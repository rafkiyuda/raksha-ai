"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Trophy, User, BarChart2, AlertTriangle } from "lucide-react";

export default function BottomNav() {
    const pathname = usePathname();

    const navItems = [
        { name: "Home", href: "/", icon: Home },
        { name: "Journey", href: "/journey", icon: Trophy },
        { name: "Truth", href: "/truth", icon: BarChart2, isCenter: true },
        { name: "Crisis", href: "/crisis", icon: AlertTriangle },
        { name: "Profile", href: "/profile", icon: User },
    ];

    return (
        <nav className="fixed bottom-0 w-full max-w-md bg-white dark:bg-surface border-t border-border z-50">
            <div className="flex justify-around items-end px-2 pb-2 h-16 relative">
                {navItems.map((item) => {
                    const isActive = pathname === item.href;
                    const Icon = item.icon;

                    if (item.isCenter) {
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className="relative flex flex-col items-center -top-6 z-10 w-20"
                            >
                                <div className="relative flex items-center justify-center mb-1">
                                    {/* Circular Background Cutout Effect */}
                                    <div className="absolute w-[70px] h-[70px] bg-white dark:bg-background rounded-full shadow-lg -z-10" />
                                    
                                    <div
                                        className={`flex items-center justify-center w-14 h-14 rounded-full shadow-lg transition-transform hover:scale-105 active:scale-95 bg-primary text-white`}
                                    >
                                        <Icon size={28} strokeWidth={2.5} />
                                    </div>
                                </div>
                                <span className={`text-[10px] font-bold ${isActive ? "text-primary" : "text-foreground-muted"}`}>
                                    {item.name}
                                </span>
                            </Link>
                        );
                    }

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className="flex flex-col items-center gap-1 w-16 pb-1"
                        >
                            <div
                                className={`flex items-center justify-center w-10 h-10 rounded-full transition-colors ${isActive ? "text-primary dark:text-primary" : "text-foreground-muted hover:bg-surface-hover"
                                    }`}
                            >
                                <Icon
                                    size={isActive ? 24 : 22}
                                    strokeWidth={isActive ? 2.5 : 1.5}
                                />
                            </div>
                            <span className={`text-[10px] font-medium tracking-wide ${isActive ? "text-primary font-bold" : "text-foreground-muted"}`}>
                                {item.name}
                            </span>
                        </Link>
                    );
                })}
            </div>
        </nav>
    );
}
