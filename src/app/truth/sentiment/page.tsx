"use client";

import Link from "next/link";
import { ChevronLeft, MessageSquare, Users, Activity, AlertTriangle, ChevronUp, ChevronDown, TrendingUp, TrendingDown, Share2, Twitter, MessageCircle, ShieldCheck, MessageSquarePlus } from "lucide-react";
import { useState } from "react";

export default function SentimentAI() {
    const [expandedStock, setExpandedStock] = useState<string | null>("GOTO");

    return (
        <div className="flex flex-col min-h-screen bg-background pb-20">
            {/* Header */}
            <header className="px-5 pt-10 pb-6 flex items-center bg-white dark:bg-surface border-b border-border/10">
                <Link href="/truth" className="p-2 -ml-2 text-foreground-muted hover:text-foreground">
                    <ChevronLeft size={24} />
                </Link>
                <div className="flex-1 text-center pr-8">
                    <h1 className="text-xl font-bold text-foreground">Sentiment AI</h1>
                    <p className="text-xs text-foreground-muted mt-0.5 font-medium">IndoBERT-powered bias detection</p>
                </div>
            </header>

            <div className="p-5 flex flex-col gap-6">
                {/* Market Sentiment Meter Card */}
                <div className="bg-white dark:bg-surface border border-border/50 rounded-3xl p-6 shadow-sm">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-base font-bold text-slate-800 dark:text-slate-200">Market Sentiment Meter</h2>
                        <span className="bg-red-50 text-red-600 px-3 py-1 rounded-full text-[10px] font-bold border border-red-100 flex items-center gap-1">
                            <AlertTriangle size={10} /> 2 FOMO Alerts
                        </span>
                    </div>

                    <div className="relative mb-8">
                        <div className="h-2.5 w-full bg-gradient-to-r from-orange-400 via-yellow-400 via-blue-500 to-purple-600 rounded-full"></div>
                        {/* Pointer / Line */}
                        <div className="absolute top-[12px] left-[15%] w-0.5 h-4 bg-slate-400 -translate-x-full"></div>
                        <div className="flex justify-between mt-3 text-[10px] font-bold text-slate-500 uppercase tracking-tighter">
                            <span>FOMO</span>
                            <span>Bullish</span>
                            <span>Neutral</span>
                            <span>Bearish</span>
                            <span>Panic</span>
                        </div>
                    </div>

                    <div className="bg-amber-50/50 dark:bg-amber-900/10 border border-amber-100 dark:border-amber-900/30 p-4 rounded-2xl flex gap-3">
                        <AlertTriangle className="text-amber-500 shrink-0 mt-0.5" size={16} />
                        <p className="text-xs text-amber-700 dark:text-amber-400 leading-relaxed font-medium">
                            Elevated emotional trading detected across IDX. Exercise caution with trending stocks.
                        </p>
                    </div>
                </div>

                {/* Stock Sentiment Feed Section */}
                <div>
                    <h3 className="text-xs font-bold text-slate-500 uppercase tracking-[0.1em] mb-4 ml-1">Stock Sentiment Feed</h3>
                    
                    <div className="flex flex-col gap-4">
                        {/* GOTO Card */}
                        <div className={`bg-white dark:bg-surface border ${expandedStock === 'GOTO' ? 'border-primary/30 shadow-md' : 'border-border/50 shadow-sm'} rounded-3xl transition-all overflow-hidden`}>
                            <div 
                                className="p-5 cursor-pointer"
                                onClick={() => setExpandedStock(expandedStock === 'GOTO' ? null : 'GOTO')}
                            >
                                <div className="flex justify-between items-center">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-2xl bg-white dark:bg-slate-800 flex items-center justify-center border border-border/50 shrink-0 overflow-hidden shadow-sm">
                                            <img src="/images/logos/goto.png" alt="GOTO" className="w-full h-full object-contain p-2" />
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-2 mb-0.5">
                                                <h4 className="font-bold text-base text-foreground">GOTO</h4>
                                                <span className="bg-red-50 text-red-600 px-2 py-0.5 rounded-md text-[9px] font-bold border border-red-100">Extreme FOMO</span>
                                            </div>
                                            <p className="text-xs text-foreground-muted">GoTo Gojek Tokopedia</p>
                                        </div>
                                    </div>
                                    <div className="text-right flex items-center gap-2">
                                        <div className="flex flex-col items-end">
                                            <span className="text-blue-600 font-bold text-sm flex items-center gap-0.5">
                                                +12.5% <ChevronUp size={14} />
                                            </span>
                                        </div>
                                        <ChevronDown size={20} className={`text-slate-400 transition-transform ${expandedStock === 'GOTO' ? 'rotate-180' : ''}`} />
                                    </div>
                                </div>
                            </div>

                            {expandedStock === 'GOTO' && (
                                <div className="px-5 pb-6 animate-in fade-in slide-in-from-top-2 duration-300">
                                    <div className="border-t border-border/30 pt-5 mb-5 grid grid-cols-3 gap-2">
                                        <div className="flex flex-col items-center">
                                            <div className="flex items-center gap-1.5 text-slate-400 mb-1.5">
                                                <MessageSquare size={14} />
                                                <span className="text-[10px] font-medium">Mentions</span>
                                            </div>
                                            <span className="text-sm font-black text-slate-800 dark:text-slate-200">12.4K</span>
                                        </div>
                                        <div className="flex flex-col items-center">
                                            <div className="flex items-center gap-1.5 text-slate-400 mb-1.5">
                                                <Users size={14} />
                                                <span className="text-[10px] font-medium">Herding</span>
                                            </div>
                                            <span className="text-sm font-black text-red-500">88%</span>
                                        </div>
                                        <div className="flex flex-col items-center">
                                            <div className="flex items-center gap-1.5 text-slate-400 mb-1.5">
                                                <Activity size={14} />
                                                <span className="text-[10px] font-medium">Fundamental</span>
                                            </div>
                                            <span className="text-sm font-black text-slate-800 dark:text-slate-200">32</span>
                                        </div>
                                    </div>

                                    <div className="mb-6 px-1">
                                        <div className="flex justify-between text-[10px] font-bold text-slate-400 mb-2 uppercase tracking-wider">
                                            <span>Social Hype</span>
                                            <span>Fundamentals</span>
                                        </div>
                                        <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                                            <div className="h-full bg-red-500 rounded-full" style={{ width: '80%' }}></div>
                                        </div>
                                    </div>

                                    <div className="mb-6">
                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-4">Source Distribution</p>
                                        <div className="grid grid-cols-3 gap-4">
                                            <div>
                                                <p className="text-[10px] text-slate-500 mb-1 flex items-center gap-1"><Twitter size={10} /> Twitter</p>
                                                <p className="text-sm font-bold text-slate-800 dark:text-slate-200">65%</p>
                                            </div>
                                            <div>
                                                <p className="text-[10px] text-slate-500 mb-1 flex items-center gap-1"><Share2 size={10} /> TikTok</p>
                                                <p className="text-sm font-bold text-slate-800 dark:text-slate-200">25%</p>
                                            </div>
                                            <div>
                                                <p className="text-[10px] text-slate-500 mb-1 flex items-center gap-1"><TrendingUp size={10} /> Stockbit</p>
                                                <p className="text-sm font-bold text-slate-800 dark:text-slate-200">10%</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex flex-wrap gap-2 mb-6">
                                        <span className="bg-slate-50 dark:bg-slate-800 text-[10px] text-slate-600 px-3 py-1.5 rounded-lg border border-border/50">GOTO to the moon</span>
                                        <span className="bg-slate-50 dark:bg-slate-800 text-[10px] text-slate-600 px-3 py-1.5 rounded-lg border border-border/50">GOTO rally continues</span>
                                    </div>

                                    <div className="bg-orange-50/50 dark:bg-orange-900/10 border border-orange-100 dark:border-orange-900/30 p-4 rounded-2xl flex gap-3">
                                        <AlertTriangle className="text-orange-500 shrink-0 mt-0.5" size={16} />
                                        <p className="text-xs text-orange-700 dark:text-orange-400 font-bold">
                                            Extreme social media hype detected.
                                        </p>
                                    </div>

                                    {/* AI Insight Section */}
                                    <div className="mt-6 bg-slate-50 dark:bg-slate-900/50 rounded-2xl p-4 border border-border/50">
                                        <p className="text-[11px] leading-relaxed text-foreground">
                                            <span className="font-bold">AI Insight:</span> GOTO menunjukkan volatilitas sangat tinggi dalam 24 jam terakhir. Sentimen sosial dipenuhi hype yang tidak wajar, sementara rasio profitabilitas menurut laporan keuangan belum sejalan dengan ekspektasi. Pembelian agresif sangat tidak disarankan.
                                        </p>
                                        <button className="w-full mt-4 py-3 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 font-bold rounded-xl border border-emerald-100 dark:border-emerald-800/50 flex items-center justify-center gap-2 hover:bg-emerald-100 transition-colors">
                                            <MessageSquarePlus size={18} /> Tanya AI Detailnya
                                        </button>
                                    </div>
                                </div>
                            )}
                            <div className="p-3 bg-red-50 dark:bg-red-950/20 border-t border-red-100 dark:border-red-900/30 flex items-center justify-center gap-2">
                                <AlertTriangle size={14} className="text-red-500" />
                                <span className="text-[10px] font-bold text-red-600 dark:text-red-400 uppercase tracking-wider">Risk Alert: Protective Recommendation Active</span>
                            </div>
                        </div>

                        <div 
                            className={`bg-white dark:bg-surface border ${expandedStock === 'BBCA' ? 'border-primary/30 shadow-md' : 'border-border/50 shadow-sm'} rounded-3xl transition-all overflow-hidden`}
                        >
                            <div 
                                className="p-5 cursor-pointer hover:bg-slate-50 transition-colors"
                                onClick={() => setExpandedStock(expandedStock === 'BBCA' ? null : 'BBCA')}
                            >
                                <div className="flex justify-between items-center">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-2xl bg-white dark:bg-slate-800 flex items-center justify-center border border-border/50 shrink-0 overflow-hidden shadow-sm">
                                            <img src="/images/logos/bbca.png" alt="BBCA" className="w-full h-full object-contain p-2" />
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-2 mb-0.5">
                                                <h4 className="font-bold text-base text-foreground">BBCA</h4>
                                                <span className="bg-slate-50 text-slate-600 px-2 py-0.5 rounded-md text-[9px] font-bold border border-slate-200">Neutral</span>
                                                <span className="bg-slate-50 text-slate-600 px-2 py-0.5 rounded-md text-[9px] font-bold border border-slate-200">Finfluence</span>
                                            </div>
                                            <p className="text-xs text-foreground-muted">Bank Central Asia</p>
                                        </div>
                                    </div>
                                    <div className="text-right flex items-center gap-2">
                                        <div className="flex flex-col items-end">
                                            <span className="text-blue-600 font-bold text-sm flex items-center gap-0.5">
                                                +0.8% <ChevronDown size={14} className={expandedStock === 'BBCA' ? 'rotate-180' : ''} />
                                            </span>
                                        </div>
                                        <ChevronDown size={20} className={`text-slate-400 transition-transform ${expandedStock === 'BBCA' ? 'rotate-180' : ''}`} />
                                    </div>
                                </div>
                            </div>

                            {expandedStock === 'BBCA' && (
                                <div className="px-5 pb-6 animate-in fade-in slide-in-from-top-2 duration-300">
                                    <div className="border-t border-border/30 pt-5 mb-5 grid grid-cols-3 gap-2">
                                        <div className="flex flex-col items-center">
                                            <div className="flex items-center gap-1.5 text-slate-400 mb-1.5">
                                                <MessageSquare size={14} />
                                                <span className="text-[10px] font-medium">Mentions</span>
                                            </div>
                                            <span className="text-sm font-black text-slate-800 dark:text-slate-200">2.1K</span>
                                        </div>
                                        <div className="flex flex-col items-center">
                                            <div className="flex items-center gap-1.5 text-slate-400 mb-1.5">
                                                <Users size={14} />
                                                <span className="text-[10px] font-medium">Herding</span>
                                            </div>
                                            <span className="text-sm font-black text-primary">12%</span>
                                        </div>
                                        <div className="flex flex-col items-center">
                                            <div className="flex items-center gap-1.5 text-slate-400 mb-1.5">
                                                <Activity size={14} />
                                                <span className="text-[10px] font-medium">Fundamental</span>
                                            </div>
                                            <span className="text-sm font-black text-slate-800 dark:text-slate-200">92</span>
                                        </div>
                                    </div>

                                    <div className="mb-6 px-1">
                                        <div className="flex justify-between text-[10px] font-bold text-slate-400 mb-2 uppercase tracking-wider">
                                            <span>Social Hype</span>
                                            <span>Fundamentals</span>
                                        </div>
                                        <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                                            <div className="h-full bg-primary rounded-full" style={{ width: '20%' }}></div>
                                        </div>
                                    </div>

                                    <div className="bg-primary/5 dark:bg-primary/10 border border-primary/20 p-4 rounded-2xl flex gap-3 mb-6">
                                        <ShieldCheck className="text-primary shrink-0 mt-0.5" size={16} />
                                        <p className="text-xs text-primary font-bold">
                                            Stable sentiment. High fundamental alignment.
                                        </p>
                                    </div>

                                    {/* AI Insight Section */}
                                    <div className="mt-0 bg-slate-50 dark:bg-slate-900/50 rounded-2xl p-4 border border-border/50">
                                        <p className="text-[11px] leading-relaxed text-foreground">
                                            <span className="font-bold">AI Insight:</span> BBCA terus menunjukkan kekuatan fundamental yang solid di tengah fluktuasi pasar. Sentimen institusional sangat positif dengan akumulasi bertahap. Layak dipertahankan sebagai jangkar portofolio jangka panjang.
                                        </p>
                                        <button className="w-full mt-4 py-3 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 font-bold rounded-xl border border-emerald-100 dark:border-emerald-800/50 flex items-center justify-center gap-2 hover:bg-emerald-100 transition-colors">
                                            <MessageSquarePlus size={18} /> Tanya AI Detailnya
                                        </button>
                                    </div>
                                </div>
                            )}
                            <div className="p-3 bg-emerald-50 dark:bg-emerald-950/20 border-t border-emerald-100 dark:border-emerald-900/30 flex items-center justify-center gap-2">
                                <ShieldCheck size={14} className="text-emerald-600" />
                                <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">Safety Alert: Strong Buy Recommendation</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
