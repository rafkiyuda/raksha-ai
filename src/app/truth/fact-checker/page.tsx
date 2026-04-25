"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronDown, ChevronRight, TrendingUp, TrendingDown, ArrowDownUp, FileText, AlertOctagon, Sparkles, MessageSquarePlus } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const DUMMY_STOCKS = [
    {
        ticker: "BBCA",
        name: "Bank Central Asia",
        score: 92,
        grade: "A",
        netProfit: "Rp 48.2T",
        cashFlow: "Rp 45.8T",
        alignment: 95,
        status: "No anomalies detected in financial statements",
        riskLevel: "safe"
    },
    {
        ticker: "TLKM",
        name: "Telkom Indonesia",
        score: 85,
        grade: "A",
        netProfit: "Rp 24.5T",
        cashFlow: "Rp 22.1T",
        alignment: 90,
        status: "Consistent revenue, minor debt fluctuations",
        riskLevel: "safe"
    },
    {
        ticker: "GOTO",
        name: "GoTo Gojek Tokopedia",
        score: 42,
        grade: "C",
        netProfit: "-Rp 12.4T",
        cashFlow: "Rp 1.2T",
        alignment: 45,
        status: "Negative profit margins, rapid cash burn",
        riskLevel: "warning"
    }
];

export default function FundamentalPage() {
    const [expandedCard, setExpandedCard] = useState<string>("BBCA");
    const [sortOrder, setSortOrder] = useState<"high" | "low">("high");
    const [insights, setInsights] = useState<Record<string, string>>({});
    const [loadingInsights, setLoadingInsights] = useState<Record<string, boolean>>({});

    const generateInsight = async (stock: typeof DUMMY_STOCKS[0]) => {
        if (insights[stock.ticker] || loadingInsights[stock.ticker]) return;
        setLoadingInsights(prev => ({ ...prev, [stock.ticker]: true }));
        try {
            const prompt = `Berikan ringkasan singkat fundamental saham ${stock.ticker} (${stock.name})...`;
            const response = await fetch("/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ messages: [{ role: "user", content: prompt }], mode: "copilot" })
            });
            const data = await response.json();
            setInsights(prev => ({ ...prev, [stock.ticker]: data.content }));
        } catch (error) {
            setInsights(prev => ({ ...prev, [stock.ticker]: "*Gagal memuat insight.*" }));
        } finally {
            setLoadingInsights(prev => ({ ...prev, [stock.ticker]: false }));
        }
    };

    const toggleCard = (ticker: string) => {
        setExpandedCard(expandedCard === ticker ? "" : ticker);
    };

    return (
        <div className="flex flex-col min-h-screen bg-background pb-24">
            <header className="px-5 pt-10 pb-4 flex items-center border-b border-border/10 bg-surface">
                <Link href="/truth" className="p-2 -ml-2 text-foreground-muted hover:text-foreground transition-colors">
                    <ChevronLeft size={24} />
                </Link>
                <div className="flex-1 text-center pr-8">
                    <h1 className="text-xl font-bold text-foreground">Fact Checker</h1>
                    <p className="text-[10px] text-foreground-muted mt-0.5 tracking-wider uppercase">Fundamental Analysis</p>
                </div>
            </header>

            <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                <div className="flex flex-col items-center justify-center pt-8">
                    <div className="relative mt-2 mb-6 flex items-center justify-center">
                        <svg className="w-40 h-40 transform -rotate-90">
                            <circle cx="80" cy="80" r="70" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-surface-active" />
                            <circle cx="80" cy="80" r="70" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-primary" strokeDasharray="440" strokeDashoffset={440 - (440 * 0.73)} />
                        </svg>
                        <div className="absolute flex flex-col items-center justify-center">
                            <span className="text-4xl font-bold text-foreground tracking-tight">73</span>
                            <span className="text-[10px] text-foreground-muted font-semibold mt-1">Avg Score</span>
                        </div>
                    </div>
                </div>

                <div className="p-5 flex flex-col gap-4">
                    <div className="flex items-center justify-between mb-1 px-1">
                        <h3 className="text-sm font-bold text-foreground-muted tracking-wide uppercase">Stock Integrity</h3>
                        <button onClick={() => setSortOrder(prev => prev === "high" ? "low" : "high")} className="text-[10px] bg-surface-active px-3 py-1.5 rounded-lg font-bold">
                            Score {sortOrder === "high" ? "High ↓" : "Low ↑"}
                        </button>
                    </div>

                    {[...DUMMY_STOCKS].sort((a, b) => sortOrder === "high" ? b.score - a.score : a.score - b.score).map((stock) => {
                        const isOpen = expandedCard === stock.ticker;
                        const isWarning = stock.riskLevel === "warning";
                        return (
                            <div key={stock.ticker} className={`bg-surface rounded-2xl border ${isWarning ? 'border-warning/20' : 'border-border/50'} p-4 transition-all`} onClick={() => toggleCard(stock.ticker)}>
                                <div className="flex justify-between items-center">
                                    <div className="flex items-center gap-3">
                                        <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${isWarning ? 'bg-warning/10 text-warning' : 'bg-primary/10 text-primary'}`}>
                                            {stock.score}
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-foreground">{stock.ticker}</h4>
                                            <p className="text-[10px] text-foreground-muted">{stock.name}</p>
                                        </div>
                                    </div>
                                    {isOpen ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
                                </div>
                                {isOpen && (
                                    <div className="mt-4 pt-4 border-t border-border/10 animate-in fade-in duration-300">
                                        <div className="grid grid-cols-2 gap-3 mb-4">
                                            <div className="bg-background p-3 rounded-xl border border-border/50">
                                                <p className="text-[9px] text-foreground-muted mb-1 uppercase font-bold">Profit</p>
                                                <p className="text-sm font-bold">{stock.netProfit}</p>
                                            </div>
                                            <div className="bg-background p-3 rounded-xl border border-border/50">
                                                <p className="text-[9px] text-foreground-muted mb-1 uppercase font-bold">Cash Flow</p>
                                                <p className="text-sm font-bold">{stock.cashFlow}</p>
                                            </div>
                                        </div>
                                        <button 
                                            onClick={(e) => { e.stopPropagation(); generateInsight(stock); }}
                                            className="w-full bg-primary/10 text-primary py-3 rounded-xl text-xs font-bold border border-primary/20 flex items-center justify-center gap-2"
                                        >
                                            <Sparkles size={14} /> {loadingInsights[stock.ticker] ? "Menganalisis..." : "AI Insight Fundamental"}
                                        </button>
                                        {insights[stock.ticker] && (
                                            <div className="mt-4 text-xs text-foreground leading-relaxed prose prose-invert prose-sm">
                                                <ReactMarkdown remarkPlugins={[remarkGfm]}>{insights[stock.ticker]}</ReactMarkdown>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
