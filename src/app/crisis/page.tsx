"use client";

import { useState } from "react";
import Link from "next/link";
import { 
    AlertTriangle, 
    TrendingDown, 
    CircleDollarSign, 
    LineChart, 
    ShieldAlert, 
    Star, 
    Landmark, 
    Shield,
    Info,
    ArrowRight
} from "lucide-react";

export default function CrisisPage() {
    // Dummy data similar to mobile app
    const market = {
        jci_change: -2.4,
        vix_index: 32.5,
        usd_idr: 16250,
        foreign_net_sell: 1.2
    };

    const strategies = [
        { name: 'XAU/IDR (Gold)', weight: '30%', risk: 'Low', yield: '+8.2%' },
        { name: 'Fixed Rate Bonds', weight: '50%', risk: 'Very Low', yield: '+6.5%' },
        { name: 'Money Market Funds', weight: '20%', risk: 'Safe Haven', yield: '+4.8%' },
    ];

    return (
        <div className="flex flex-col min-h-screen bg-background pb-20">
            {/* Header */}
            <header className="px-5 pt-10 pb-6 flex items-center bg-white dark:bg-surface border-b border-border/10">
                <div className="flex-1 text-center">
                    <h1 className="text-xl font-bold text-foreground">Crisis Playbook</h1>
                    <p className="text-[10px] text-foreground-muted mt-0.5 font-bold tracking-widest uppercase">Systemic Risk Mitigation</p>
                </div>
            </header>

            <div className="p-5 flex flex-col gap-6">
                {/* Crisis Mode Active Indicator */}
                <div className="flex justify-start">
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-900/30 rounded-full">
                        <div className="w-2 h-2 bg-red-600 rounded-full animate-pulse"></div>
                        <span className="text-[10px] font-black text-red-600 tracking-tighter uppercase">Crisis Mode Active</span>
                    </div>
                </div>

                {/* Volatility Score Gauge */}
                <div className="bg-white dark:bg-surface border border-border/50 rounded-3xl p-6 shadow-sm overflow-hidden relative">
                    <div className="absolute top-0 right-0 p-4 opacity-5 rotate-12">
                        <LineChart size={120} />
                    </div>
                    
                    <div className="flex items-center gap-6 relative z-10">
                        <div className="relative w-24 h-24 flex items-center justify-center shrink-0">
                            <svg className="w-full h-full transform -rotate-90">
                                <circle cx="48" cy="48" r="42" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-slate-100 dark:text-slate-800" />
                                <circle cx="48" cy="48" r="42" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-red-500" strokeDasharray="264" strokeDashoffset={264 - (264 * (market.vix_index / 100))} strokeLinecap="round" />
                            </svg>
                            <div className="absolute flex flex-col items-center">
                                <span className="text-[10px] font-bold text-slate-400 uppercase">VIX</span>
                                <span className="text-xl font-black text-red-500">{market.vix_index}</span>
                            </div>
                        </div>

                        <div className="flex-1">
                            <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200 mb-1">Real-time Volatility Score</h3>
                            <p className="text-xs text-slate-500 leading-relaxed">
                                Skor di atas 30 menunjukkan kepanikan pasar. Gunakan instrumen proteksi segera.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Market Volatility Feed Grid */}
                <section>
                    <h3 className="text-[10px] font-bold text-slate-450 uppercase tracking-[0.15em] mb-4 ml-1">Market Volatility Feed</h3>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-white dark:bg-surface border border-border/50 p-4 rounded-2xl shadow-sm relative overflow-hidden">
                            <TrendingDown className="absolute -right-2 -bottom-2 opacity-5 text-red-500" size={60} />
                            <p className="text-[10px] font-bold text-slate-400 mb-1">JCI Change</p>
                            <p className="text-xl font-black text-red-500">{market.jci_change}%</p>
                        </div>
                        <div className="bg-white dark:bg-surface border border-border/50 p-4 rounded-2xl shadow-sm relative overflow-hidden">
                            <AlertTriangle className="absolute -right-2 -bottom-2 opacity-5 text-amber-500" size={60} />
                            <p className="text-[10px] font-bold text-slate-400 mb-1">VIX Index</p>
                            <p className="text-xl font-black text-amber-500">{market.vix_index}</p>
                        </div>
                        <div className="bg-white dark:bg-surface border border-border/50 p-4 rounded-2xl shadow-sm relative overflow-hidden">
                            <CircleDollarSign className="absolute -right-2 -bottom-2 opacity-5 text-blue-500" size={60} />
                            <p className="text-[10px] font-bold text-slate-400 mb-1">USD/IDR</p>
                            <p className="text-xl font-black text-blue-600">Rp {market.usd_idr.toLocaleString()}</p>
                        </div>
                        <div className="bg-white dark:bg-surface border border-border/50 p-4 rounded-2xl shadow-sm relative overflow-hidden">
                            <ShieldAlert className="absolute -right-2 -bottom-2 opacity-5 text-red-500" size={60} />
                            <p className="text-[10px] font-bold text-slate-400 mb-1">Foreign Net</p>
                            <p className="text-xl font-black text-red-600">-{market.foreign_net_sell}T</p>
                        </div>
                    </div>
                </section>

                {/* Protection Strategies */}
                <section>
                    <h3 className="text-[10px] font-bold text-slate-450 uppercase tracking-[0.15em] mb-4 ml-1">Protection Strategies</h3>
                    <div className="flex flex-col gap-3">
                        {strategies.map((s, idx) => (
                            <div key={idx} className="bg-white dark:bg-surface border border-border/50 p-4 rounded-2xl shadow-sm flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-900/10 flex items-center justify-center text-blue-600">
                                        {idx === 0 ? <Star size={20} /> : idx === 1 ? <Landmark size={20} /> : <Shield size={20} />}
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200">{s.name}</h4>
                                        <p className="text-[10px] text-slate-400 font-medium">Risk level: {s.risk}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-[10px] text-slate-400 mb-0.5">Est. Yield</p>
                                    <p className="text-sm font-black text-blue-600">{s.yield}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Warning Footer */}
                <div className="mt-4 p-5 bg-blue-50 dark:bg-blue-900/10 rounded-2xl flex gap-3 border border-blue-100 dark:border-blue-900/20">
                    <Info className="text-blue-500 shrink-0" size={20} />
                    <p className="text-xs text-blue-700 dark:text-blue-400 leading-relaxed font-medium">
                        Strategi di atas dirancang untuk menjaga nilai aset selama periode volatilitas ekstrem. Konsultasikan dengan AI Co-Pilot untuk penyesuaian porsi portofolio Anda.
                    </p>
                </div>
                
                <Link href="/chat" className="w-full bg-slate-800 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 shadow-lg mb-4">
                    Tanya AI Co-Pilot <ArrowRight size={18} />
                </Link>
            </div>
        </div>
    );
}
