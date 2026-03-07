"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, ChevronRight, TrendingUp, TrendingDown, ArrowDownUp, FileText, Search, ShieldAlert, AlertOctagon, CheckCircle2, ShieldQuestion, MessageSquarePlus, Sparkles } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

type ScanResult = {
    riskLevel: "Low" | "Moderate" | "High";
    truthScore: number;
    analysis: string;
};

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

export default function TruthScorePage() {
    const [activeTab, setActiveTab] = useState<"analysis" | "scanner">("analysis");
    const [expandedCard, setExpandedCard] = useState<string>("BBCA");
    const [sortOrder, setSortOrder] = useState<"high" | "low">("high");

    // --- SCANNER STATE ---
    const [inputType, setInputType] = useState<"text" | "link">("text");
    const [inputValue, setInputValue] = useState("");
    const [isScanning, setIsScanning] = useState(false);
    const [result, setResult] = useState<ScanResult | null>(null);

    const handleScan = async () => {
        if (!inputValue.trim()) return;

        setIsScanning(true);
        setResult(null);

        try {
            const response = await fetch("/api/scan", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ input: inputValue, type: inputType }),
            });
            const data = await response.json();
            setResult(data);
        } catch (error) {
            console.error("Error scanning:", error);
            setResult({
                riskLevel: "Moderate",
                truthScore: 50,
                analysis: "Terjadi kesalahan saat menghubungi server AI. Coba lagi nanti.",
            });
        } finally {
            setIsScanning(false);
        }
    };

    const handlePaste = async () => {
        try {
            const text = await navigator.clipboard.readText();
            setInputValue(text);
        } catch (err) {
            console.error('Failed to read clipboard contents: ', err);
        }
    };

    const toggleCard = (ticker: string) => {
        if (expandedCard === ticker) {
            setExpandedCard("");
            // Optional: keep insight cached or clear it
        } else {
            setExpandedCard(ticker);
        }
    };

    // --- INLINE INSIGHT STATE ---
    const [insights, setInsights] = useState<Record<string, string>>({});
    const [loadingInsights, setLoadingInsights] = useState<Record<string, boolean>>({});

    const generateInsight = async (stock: typeof DUMMY_STOCKS[0]) => {
        if (insights[stock.ticker] || loadingInsights[stock.ticker]) return;

        setLoadingInsights(prev => ({ ...prev, [stock.ticker]: true }));
        try {
            const prompt = `Berikan ringkasan singkat (maksimal 3 paragraf) mengenai fundamental saham ${stock.ticker} (${stock.name}) berdasarkan data berikut: Truth Score ${stock.score}/100, Net Profit ${stock.netProfit}, Cash Flow ${stock.cashFlow}, Status Laporan Keuangan: ${stock.status}. Tolong berikan markdown formatting tebal/miring seperlunya.`;

            const response = await fetch("/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    messages: [{ role: "user", content: prompt }],
                    mode: "copilot"
                })
            });

            const data = await response.json();
            if (data.error) throw new Error(data.error);

            setInsights(prev => ({ ...prev, [stock.ticker]: data.content }));
        } catch (error) {
            console.error("Failed to generate insight:", error);
            setInsights(prev => ({ ...prev, [stock.ticker]: "*Gagal memuat insight dari AI. Silakan coba lagi nanti.*" }));
        } finally {
            setLoadingInsights(prev => ({ ...prev, [stock.ticker]: false }));
        }
    };

    return (
        <div className="flex flex-col min-h-screen bg-background pb-24">
            {/* Dynamic Header */}
            <header className="px-5 pt-10 pb-4 flex flex-col items-center justify-center border-b border-border/10 bg-surface">
                <h1 className="text-xl font-bold text-foreground">Truth Hub</h1>
                <p className="text-xs text-foreground-muted mt-1 text-center max-w-[250px] leading-relaxed">
                    {activeTab === "analysis" ? "AI-powered financial statement integrity" : "Deep-scan influencer claims and links"}
                </p>

                {/* Top Navigation Tabs */}
                <div className="flex bg-surface-active p-1 rounded-xl w-full mt-6 mb-2 mx-auto gap-1">
                    <button
                        className={`flex-1 py-2 text-xs font-bold rounded-lg transition-colors ${activeTab === 'analysis' ? 'bg-primary text-white shadow-sm' : 'text-foreground-muted hover:text-foreground'}`}
                        onClick={() => setActiveTab('analysis')}
                    >
                        Dashboard
                    </button>
                    <button
                        className={`flex-1 py-2 text-xs font-bold rounded-lg transition-colors ${activeTab === 'scanner' ? 'bg-primary text-white shadow-sm' : 'text-foreground-muted hover:text-foreground'}`}
                        onClick={() => setActiveTab('scanner')}
                    >
                        Scanner
                    </button>
                </div>
            </header>

            {/* ===================== TAB: ANALYSIS ===================== */}
            {activeTab === "analysis" && (
                <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                    <div className="flex flex-col items-center justify-center pt-4">
                        {/* Circular Progress */}
                        <div className="relative mt-2 mb-6 flex items-center justify-center">
                            <svg className="w-40 h-40 transform -rotate-90">
                                {/* Background Track */}
                                <circle cx="80" cy="80" r="70" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-surface-active" />

                                {/* Safe / Primary Path */}
                                <circle cx="80" cy="80" r="70" stroke="currentColor" strokeWidth="8" fill="transparent"
                                    className="text-primary"
                                    strokeDasharray="440"
                                    strokeDashoffset={440 - (440 * 0.1)}
                                />
                                {/* Warning Path */}
                                <circle cx="80" cy="80" r="70" stroke="currentColor" strokeWidth="8" fill="transparent"
                                    className="text-warning"
                                    strokeDasharray="440"
                                    strokeDashoffset={440 - (440 * 0.51)}
                                    transform="rotate(36 80 80)"
                                />
                            </svg>
                            <div className="absolute flex flex-col items-center justify-center">
                                <span className="text-4xl font-bold text-foreground tracking-tight">73</span>
                                <span className="text-[10px] text-foreground-muted font-semibold mt-1">Avg Score</span>
                            </div>
                        </div>

                        {/* Legend */}
                        <div className="flex items-center justify-center gap-4 text-[10px] font-medium text-foreground-muted pb-4">
                            <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-primary"></div> 70-100 Safe</div>
                            <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-warning"></div> 40-69 Caution</div>
                            <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-danger"></div> 0-39 Danger</div>
                        </div>
                    </div>

                    {/* Stock Analysis List */}
                    <div className="p-5 flex flex-col gap-4">
                        <div className="flex items-center justify-between mb-1 px-1">
                            <h3 className="text-sm font-bold text-foreground-muted tracking-wide uppercase">Stock Analysis</h3>
                            <button
                                onClick={() => setSortOrder(prev => prev === "high" ? "low" : "high")}
                                className="flex items-center gap-1 px-2.5 py-1.5 bg-surface-active hover:bg-surface-hover rounded-md text-[10px] font-semibold text-foreground transition-colors"
                            >
                                <ArrowDownUp size={12} /> Score {sortOrder === "high" ? "High ↓" : "Low ↑"}
                            </button>
                        </div>

                        {[...DUMMY_STOCKS].sort((a, b) => sortOrder === "high" ? b.score - a.score : a.score - b.score).map((stock) => {
                            const isOpen = expandedCard === stock.ticker;
                            const isWarning = stock.riskLevel === "warning";
                            const strokeOffset = 132 - (132 * (stock.score / 100));

                            return (
                                <div
                                    key={stock.ticker}
                                    className={`bg-surface rounded-2xl border ${isWarning ? 'border-warning/20' : (isOpen ? 'border-primary/30' : 'border-border/50')} p-4 shadow-sm relative overflow-hidden transition-all duration-300 ${!isOpen && 'cursor-pointer hover:bg-surface-hover'}`}
                                    onClick={() => !isOpen && toggleCard(stock.ticker)}
                                >
                                    {/* Subtle glow effect when open */}
                                    {isOpen && !isWarning && <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>}
                                    {isOpen && isWarning && <div className="absolute top-0 right-0 w-32 h-32 bg-warning/10 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>}

                                    {/* Card Header (Always Visible) */}
                                    <div className={`flex justify-between items-center relative z-10 ${isOpen ? 'mb-5' : ''}`}>
                                        <div className="flex items-center gap-3">
                                            <div className="relative w-12 h-12 flex items-center justify-center">
                                                <svg className="w-full h-full transform -rotate-90 absolute">
                                                    <circle cx="24" cy="24" r="21" stroke="currentColor" strokeWidth="3" fill="transparent" className="text-surface-active" />
                                                    <circle cx="24" cy="24" r="21" stroke="currentColor" strokeWidth="3" fill="transparent" className={isWarning ? 'text-warning' : 'text-primary'} strokeDasharray="132" strokeDashoffset={strokeOffset} />
                                                </svg>
                                                <span className={`text-sm font-bold ${isWarning ? 'text-warning' : 'text-primary'}`}>{stock.score}</span>
                                            </div>
                                            <div>
                                                <div className="flex items-center gap-2 mb-0.5">
                                                    <h4 className="font-bold text-base text-foreground">{stock.ticker}</h4>
                                                    <span className="text-[9px] font-bold px-1.5 py-0.5 bg-surface-active text-foreground rounded flex items-center justify-center w-5 h-5">{stock.grade}</span>
                                                </div>
                                                <p className="text-xs text-foreground-muted">{stock.name}</p>
                                            </div>
                                        </div>
                                        {isOpen ? (
                                            <ChevronDown size={18} className="text-foreground-muted cursor-pointer" onClick={(e) => { e.stopPropagation(); toggleCard(stock.ticker); }} />
                                        ) : (
                                            <ChevronRight size={18} className="text-foreground-muted" />
                                        )}
                                    </div>

                                    {/* Expanded Content */}
                                    {isOpen && (
                                        <div className="animate-in fade-in slide-in-from-top-2 duration-300">
                                            <div className="grid grid-cols-2 gap-3 mb-5 relative z-10">
                                                <div className="bg-background rounded-xl p-3 border border-border/50">
                                                    <span className="flex items-center gap-1 text-[10px] text-foreground-muted mb-1"><TrendingUp size={10} /> Net Profit</span>
                                                    <p className="text-sm font-bold text-foreground">{stock.netProfit}</p>
                                                </div>
                                                <div className="bg-background rounded-xl p-3 border border-border/50">
                                                    <span className="flex items-center gap-1 text-[10px] text-foreground-muted mb-1"><TrendingDown size={10} /> Cash Flow</span>
                                                    <p className="text-sm font-bold text-foreground">{stock.cashFlow}</p>
                                                </div>
                                            </div>

                                            <div className="mb-4 relative z-10">
                                                <div className="flex justify-between text-[10px] mb-2">
                                                    <span className="text-foreground-muted font-medium">Profit-Cash Alignment</span>
                                                    <span className={`font-bold ${isWarning ? 'text-warning' : 'text-primary'}`}>{stock.alignment}%</span>
                                                </div>
                                                <div className="h-1.5 w-full bg-surface-active rounded-full overflow-hidden">
                                                    <div className={`h-full rounded-full ${isWarning ? 'bg-warning' : 'bg-primary'}`} style={{ width: `${stock.alignment}%` }}></div>
                                                </div>
                                            </div>

                                            <div className={`border p-3 rounded-lg flex items-center gap-2 relative z-10 mb-4 ${isWarning ? 'bg-[#2a1818] border-[#8a1e1e]/30' : 'bg-[#0c182a] border-[#1e3a8a]/30'}`}>
                                                {isWarning ? <AlertOctagon size={14} className="text-red-400 shrink-0" /> : <FileText size={14} className="text-blue-400 shrink-0" />}
                                                <p className={`text-xs font-medium ${isWarning ? 'text-red-400' : 'text-blue-400'}`}>{stock.status}</p>
                                            </div>

                                            <div className="flex gap-2 w-full mt-4 flex-col sm:flex-row">
                                                <button
                                                    onClick={(e) => { e.stopPropagation(); generateInsight(stock); }}
                                                    disabled={loadingInsights[stock.ticker]}
                                                    className="flex-1 flex items-center justify-center gap-2 bg-primary/10 hover:bg-primary/20 text-primary border border-primary/20 py-3 rounded-xl text-xs font-bold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                                >
                                                    {loadingInsights[stock.ticker] ? (
                                                        <><span className="animate-spin text-lg leading-none">⟳</span> Menganalisis...</>
                                                    ) : (
                                                        <><Sparkles size={16} /> Insight Cepat (AI)</>
                                                    )}
                                                </button>

                                                <Link
                                                    href={`/chat?context=stock&ticker=${stock.ticker}&name=${encodeURIComponent(stock.name)}&score=${stock.score}`}
                                                    onClick={(e) => e.stopPropagation()}
                                                    className="flex-1 flex items-center justify-center gap-2 bg-surface-active hover:bg-border text-foreground py-3 rounded-xl text-xs font-bold transition-colors"
                                                >
                                                    <MessageSquarePlus size={16} /> Chat AI Detailnya
                                                </Link>
                                            </div>

                                            {/* Render Inline Insight */}
                                            {insights[stock.ticker] && (
                                                <div className="mt-4 pt-4 border-t border-border/50 animate-in fade-in slide-in-from-top-2 duration-500">
                                                    <div className="flex items-center gap-2 text-primary font-bold text-[10px] uppercase tracking-wider mb-2">
                                                        <Sparkles size={14} /> AI Fundamental Insight
                                                    </div>
                                                    <div className="prose prose-sm max-w-none text-foreground prose-p:leading-relaxed prose-p:my-1.5 prose-ul:my-1.5 prose-li:my-0.5 prose-ul:list-outside prose-ul:ml-4 prose-li:marker:text-primary prose-headings:my-2 dark:prose-invert">
                                                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                                            {insights[stock.ticker]}
                                                        </ReactMarkdown>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}

            {/* ===================== TAB: SCANNER ===================== */}
            {activeTab === "scanner" && (
                <div className="p-5 flex flex-col min-h-[70vh] animate-in fade-in slide-in-from-bottom-2 duration-300">

                    {/* Input Type Toggle */}
                    <div className="flex bg-surface-active p-1 rounded-xl w-full mb-6">
                        <button
                            className={`flex-1 py-1.5 text-[11px] font-bold rounded-lg transition-colors ${inputType === 'link' ? 'bg-primary text-white shadow-sm' : 'text-foreground-muted hover:text-foreground'}`}
                            onClick={() => setInputType('link')}
                        >
                            URL Link
                        </button>
                        <button
                            className={`flex-1 py-1.5 text-[11px] font-bold rounded-lg transition-colors ${inputType === 'text' ? 'bg-primary text-white shadow-sm' : 'text-foreground-muted hover:text-foreground'}`}
                            onClick={() => setInputType('text')}
                        >
                            Teks Biasa
                        </button>
                    </div>

                    <div className="bg-surface rounded-2xl border border-border shadow-sm p-4 mb-6 relative group focus-within:ring-2 focus-within:ring-primary/20">
                        <div className="flex items-center gap-2 mb-2 text-primary font-bold text-xs uppercase tracking-wider">
                            {inputType === 'text' ? <FileText size={14} /> : <Search size={14} />}
                            {inputType === 'text' ? 'Paste Text/Claim' : 'Paste Article/Social Link'}
                        </div>
                        <textarea
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            placeholder={inputType === 'text' ? "Ketikkan klaim berlebihan yang mencurigakan di WhatsApp..." : "https://tiktok.com/@pompom..."}
                            className="w-full h-28 bg-transparent text-sm text-foreground placeholder:text-foreground-muted outline-none resize-none"
                        />
                        <div className="absolute top-4 right-4 animate-in fade-in duration-300">
                            <button
                                onClick={handlePaste}
                                className="bg-primary/10 hover:bg-primary/20 text-primary px-3 py-1.5 rounded-lg text-xs font-bold ring-1 ring-primary/20 transition-colors"
                            >
                                Paste
                            </button>
                        </div>
                    </div>

                    <button
                        onClick={handleScan}
                        disabled={!inputValue.trim() || isScanning}
                        className={`w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-md group ${!inputValue.trim() || isScanning ? "bg-surface-active text-foreground-muted cursor-not-allowed" : "bg-primary text-white hover:bg-primary-dark"
                            }`}
                    >
                        {isScanning ? (
                            <>
                                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Analyzing the Truth...
                            </>
                        ) : (
                            <>
                                <Search size={18} className="group-hover:scale-110 transition-transform" />
                                Scan Red Flags
                            </>
                        )}
                    </button>

                    {/* Result Block */}
                    {result && !isScanning && (
                        <div className="mt-8 animate-in slide-in-from-bottom-5 duration-500 pb-10">
                            <h2 className="font-bold text-foreground mb-4">Analysis Result</h2>

                            <div className={`p-5 rounded-2xl border flex flex-col gap-4 relative overflow-hidden ${result.riskLevel === "High" ? "bg-danger/5 border-danger/30" :
                                result.riskLevel === "Moderate" ? "bg-warning/5 border-warning/30" :
                                    "bg-primary/5 border-primary/30"
                                }`}>

                                <div className={`absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none opacity-50 ${result.riskLevel === "High" ? "bg-danger/20" : result.riskLevel === "Moderate" ? "bg-warning/20" : "bg-primary/20"
                                    }`}></div>

                                <div className="flex items-center gap-3 relative z-10">
                                    {result.riskLevel === "High" && <AlertOctagon size={28} className="text-danger" />}
                                    {result.riskLevel === "Moderate" && <ShieldQuestion size={28} className="text-warning dark:text-warning" />}
                                    {result.riskLevel === "Low" && <CheckCircle2 size={28} className="text-primary dark:text-primary" />}

                                    <div>
                                        <h3 className={`font-black uppercase tracking-tight text-lg ${result.riskLevel === "High" ? "text-danger" : result.riskLevel === "Moderate" ? "text-warning dark:text-warning" : "text-primary dark:text-primary"
                                            }`}>
                                            {result.riskLevel} Risk
                                        </h3>
                                        <p className="text-xs text-foreground-muted font-medium mt-0.5">Truth Score: {result.truthScore}/100</p>
                                    </div>
                                </div>

                                <div className="w-full bg-surface/50 h-2 rounded-full overflow-hidden mt-1 relative z-10">
                                    <div
                                        className={`h-full rounded-full transition-all duration-1000 ${result.riskLevel === "High" ? "bg-danger" : result.riskLevel === "Moderate" ? "bg-warning" : "bg-primary"
                                            }`}
                                        style={{ width: `${result.truthScore}%` }}
                                    ></div>
                                </div>

                                <div className="mt-2 text-sm text-foreground leading-relaxed relative z-10">
                                    <strong className="block text-xs font-bold text-foreground-muted uppercase tracking-wider mb-2">AI Findings</strong>
                                    {result.analysis}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
