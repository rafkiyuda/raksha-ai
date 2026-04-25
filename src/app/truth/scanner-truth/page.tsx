"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronLeft, Search, FileText, ShieldCheck, AlertOctagon, CheckCircle2, ShieldQuestion, AlertTriangle } from "lucide-react";

type ScanResult = {
    riskLevel: "Low" | "Moderate" | "High";
    truthScore: number;
    analysis: string;
};

export default function ScannerTruthPage() {
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
            setResult({ riskLevel: "Moderate", truthScore: 50, analysis: "Terjadi kesalahan koneksi AI." });
        } finally {
            setIsScanning(false);
        }
    };

    return (
        <div className="flex flex-col min-h-screen bg-background pb-24">
            <header className="px-5 pt-10 pb-4 flex items-center border-b border-border/10 bg-surface">
                <Link href="/truth" className="p-2 -ml-2 text-foreground-muted hover:text-foreground transition-colors">
                    <ChevronLeft size={24} />
                </Link>
                <div className="flex-1 text-center pr-8">
                    <h1 className="text-xl font-bold text-foreground">Scanner Truth</h1>
                    <p className="text-[10px] text-foreground-muted mt-0.5 tracking-wider uppercase">Deep Scan & Verification</p>
                </div>
            </header>

            <div className="p-5 flex flex-col pt-4 animate-in fade-in duration-300">

                <div className="flex bg-surface-active p-1 rounded-xl w-full mb-6 text-[11px] font-bold">
                    <button 
                        className={`flex-1 py-2 rounded-lg transition-all ${inputType === 'link' ? 'bg-white dark:bg-surface shadow-sm text-primary' : 'text-foreground-muted'}`} 
                        onClick={() => setInputType('link')}
                    >
                        URL / LINK
                    </button>
                    <button 
                        className={`flex-1 py-2 rounded-lg transition-all ${inputType === 'text' ? 'bg-white dark:bg-surface shadow-sm text-primary' : 'text-foreground-muted'}`} 
                        onClick={() => setInputType('text')}
                    >
                        TEKS / KLAIM
                    </button>
                </div>

                <div className="bg-surface rounded-2xl border border-border p-4 mb-6 relative focus-within:ring-2 focus-within:ring-primary/20">
                    <textarea
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder={inputType === 'text' ? "Contoh: Saham ABC pasti naik 100% besok karena ada bandar masuk..." : "https://tiktok.com/@pompom-investasi/video/..."}
                        className="w-full h-40 bg-transparent text-sm outline-none resize-none placeholder:text-foreground-muted/50"
                    />
                </div>

                <button
                    onClick={handleScan}
                    disabled={!inputValue.trim() || isScanning}
                    className={`w-full py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg ${
                        !inputValue.trim() || isScanning 
                        ? "bg-surface-active text-foreground-muted cursor-not-allowed" 
                        : "bg-primary text-white shadow-primary/25 hover:scale-[1.01] active:scale-[0.99]"
                    }`}
                >
                    {isScanning ? (
                        <>
                            <span className="animate-spin text-lg">⟳</span> Menganalisis...
                        </>
                    ) : (
                        <>
                            <Search size={18} /> Mulai Deteksi Bias
                        </>
                    )}
                </button>

                {result && !isScanning && (
                    <div className="mt-8 animate-in slide-in-from-bottom-4 duration-500 pb-10">
                        <div className={`p-6 rounded-2xl border-2 ${
                            result.riskLevel === 'High' 
                            ? 'bg-red-50/50 dark:bg-red-900/10 border-red-200 dark:border-red-900/30' 
                            : 'bg-emerald-50/50 dark:bg-emerald-900/10 border-emerald-200 dark:border-emerald-900/30'
                        }`}>
                            <div className="flex items-center justify-between mb-4">
                                <h3 className={`font-black uppercase tracking-tight flex items-center gap-2 ${
                                    result.riskLevel === 'High' ? 'text-red-600' : 'text-emerald-600'
                                }`}>
                                    {result.riskLevel === 'High' ? <AlertOctagon size={20} /> : <CheckCircle2 size={20} />}
                                    {result.riskLevel} Risk Result
                                </h3>
                                <span className="text-xs font-bold text-foreground-muted">Truth Score: {result.truthScore}/100</span>
                            </div>
                            
                            <div className="w-full bg-slate-200 dark:bg-slate-800 h-1.5 rounded-full mb-4 overflow-hidden">
                                <div 
                                    className={`h-full transition-all duration-1000 ${result.riskLevel === 'High' ? 'bg-red-500' : 'bg-emerald-500'}`}
                                    style={{ width: `${result.truthScore}%` }}
                                ></div>
                            </div>

                            <p className="text-sm text-foreground leading-relaxed">
                                {result.analysis}
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
