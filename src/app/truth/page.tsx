"use client";

import Link from "next/link";
import { ChevronRight, Brain, ClipboardCheck, QrCode } from "lucide-react";

export default function TruthHub() {
    return (
        <div className="flex flex-col min-h-screen bg-background pb-20">
            {/* Header */}
            <header className="px-5 pt-8 pb-4 flex justify-center">
                <h1 className="text-xl font-bold text-foreground">Truth Hub</h1>
            </header>

            <div className="p-6">
                <div className="mb-8">
                    <h2 className="text-3xl font-bold text-foreground tracking-tight mb-2">Market Intelligence</h2>
                    <p className="text-sm text-foreground-muted leading-relaxed">
                        Pilih alat analisis untuk mendeteksi bias dan kebenaran investasi.
                    </p>
                </div>

                <div className="flex flex-col gap-5">
                    {/* Sentiment AI Card */}
                    <Link href="/truth/sentiment" className="bg-white dark:bg-surface border border-border/50 rounded-3xl p-6 shadow-sm hover:shadow-md transition-all active:scale-[0.98]">
                        <div className="flex justify-between items-start mb-4">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-purple-600 dark:text-purple-400">
                                    <Brain size={24} />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-foreground">Sentiment AI</h3>
                                    <p className="text-sm text-foreground-muted">Deteksi emosi pasar (FOMO/Panic)</p>
                                </div>
                            </div>
                            <ChevronRight size={20} className="text-foreground-muted mt-1" />
                        </div>

                        {/* Market Sentiment Meter */}
                        <div className="mt-6">
                            <p className="text-xs font-bold text-foreground mb-3 tracking-wide">Market Sentiment Meter</p>
                            <div className="relative h-2.5 w-full bg-gradient-to-r from-orange-400 via-yellow-400 via-blue-400 to-purple-500 rounded-full mb-2">
                                {/* Pointer */}
                                <div className="absolute top-1/2 left-[35%] -translate-y-1/2 w-4 h-4 bg-white border-2 border-primary rounded-full shadow-md z-10 transition-all duration-1000"></div>
                            </div>
                            <div className="flex justify-between text-[10px] font-bold text-foreground-muted uppercase tracking-tighter">
                                <span>FOMO</span>
                                <span>Bullish</span>
                                <span>Neutral</span>
                                <span>Bearish</span>
                                <span>Panic</span>
                                </div>
                        </div>
                    </Link>

                    {/* Fact Checker Card */}
                    <Link href="/truth/fact-checker" className="bg-white dark:bg-surface border border-border/50 rounded-3xl p-6 shadow-sm hover:shadow-md transition-all active:scale-[0.98]">
                        <div className="flex justify-between items-center">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
                                    <ClipboardCheck size={24} />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-foreground">Fact Checker (Scanner)</h3>
                                    <p className="text-xs text-foreground-muted leading-relaxed max-w-[200px]">
                                        Scan red flags pada klaim influencer, berita, dan link mencurigakan.
                                    </p>
                                </div>
                            </div>
                            <ChevronRight size={20} className="text-foreground-muted" />
                        </div>
                    </Link>

                    {/* Scanner Truth Card */}
                    <Link href="/truth/scanner-truth" className="bg-white dark:bg-surface border border-border/50 rounded-3xl p-6 shadow-sm hover:shadow-md transition-all active:scale-[0.98]">
                        <div className="flex justify-between items-center">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                                    <QrCode size={24} />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-foreground">Scanner Truth</h3>
                                    <p className="text-xs text-foreground-muted leading-relaxed max-w-[200px]">
                                        AI Deep-scan untuk klaim influencer, berita, dan link mencurigakan.
                                    </p>
                                </div>
                            </div>
                            <ChevronRight size={20} className="text-foreground-muted" />
                        </div>
                    </Link>
                </div>

                <div className="mt-8 p-4 bg-surface-active rounded-2xl flex items-center gap-3">
                    <div className="text-xs text-foreground-muted flex-1">
                        Semua hasil deteksi didasarkan pada data real-time dan analisis AI. Gunakan sebagai pertimbangan tambahan.
                    </div>
                </div>
            </div>
        </div>
    );
}
