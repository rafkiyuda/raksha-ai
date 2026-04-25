import type { Metadata, Viewport } from "next";
import Link from "next/link";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import BottomNav from "@/components/BottomNav";
import FloatingChatButton from "@/components/FloatingChatButton";
import { ThemeProvider } from "@/components/ThemeProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "RAKSHA AI",
  description: "Risk Alert & Protective Recommendation System",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0f172a" },
  ],
};

import { MessageSquare } from "lucide-react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-zinc-100 dark:bg-black font-sans flex justify-center min-h-[100dvh]`}
      >
        <ThemeProvider attribute="class" defaultTheme="light">
          <div className="w-full max-w-md bg-background text-foreground min-h-[100dvh] relative shadow-2xl overflow-x-hidden border-x border-border">
            <main className="pb-24">
              {children}
            </main>

            <FloatingChatButton />

            <BottomNav />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
