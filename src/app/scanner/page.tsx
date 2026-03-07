"use client";

import { useState } from "react";
import { ShieldAlert, Search, AlertOctagon, CheckCircle2, ShieldQuestion, Link as LinkIcon, ClipboardPaste } from "lucide-react";

type ScanResult = {
    riskLevel: "Low" | "Moderate" | "High";
    truthScore: number;
    analysis: string;
    advice: string;
};

export default function ScannerPage() {
    const [input, setInput] = useState("");
    const [inputType, setInputType] = useState<"text" | "link">("text");
    const [isScanning, setIsScanning] = useState(false);
    const [result, setResult] = useState<ScanResult | null>(null);

    const handleScan = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim()) return;

        setIsScanning(true);
        setResult(null);

        try {
            const response = await fetch("/api/scan", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ urlOrText: input })
            });
            const data = await response.json();
            if (!data.error) {
                setResult(data);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setIsScanning(false);
        }
    };

    const handlePaste = async () => {
        try {
            const text = await navigator.clipboard.readText();
            setInput(text);
        } catch (err) {
            console.error('Failed to read clipboard contents: ', err);
        }
    };

    return (
        <div className="flex flex-col min-h-[calc(100dvh-5rem)] bg-background pb-20">
            <header className="px-5 py-6 bg-surface border-b border-border mb-6 shadow-sm">
                <h1 className="text-xl font-bold text-foreground mb-1 flex items-center gap-2">
                    Truth Scanner <ShieldAlert className="text-primary w-5 h-5" />
                </h1>
                <p className="text-sm text-foreground-muted">
                    Deteksi hype sosial media dan pastikan data fundamental emiten sesuai fakta.
                </p>
            </header>

            <div className="px-5">

                {/* Input Type Toggles */}
                <div className="flex border border-border rounded-lg p-1 bg-surface mb-4">
                    <button
                        onClick={() => setInputType("text")}
                        className={`flex-1 flex items-center justify-center gap-2 py-2 text-sm font-semibold rounded-md transition-all ${inputType === "text"
                                ? "bg-primary text-white shadow-sm"
                                : "text-foreground-muted hover:text-foreground"
                            }`}
                    >
                        <ShieldQuestion size={16} /> Teks Biasa
                    </button>
                    <button
                        onClick={() => setInputType("link")}
                        className={`flex-1 flex items-center justify-center gap-2 py-2 text-sm font-semibold rounded-md transition-all ${inputType === "link"
                                ? "bg-primary text-white shadow-sm"
                                : "text-foreground-muted hover:text-foreground"
                            }`}
                    >
                        <LinkIcon size={16} /> URL Link
                    </button>
                </div>

                <form onSubmit={handleScan} className="mb-6">
                    <div className="relative mb-4 shadow-sm border border-border rounded-xl bg-surface overflow-hidden focus-within:ring-2 focus-within:ring-primary/20 focus-within:border-primary transition-all">
                        {inputType === "text" ? (
                            <textarea
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Tulis klaim saham finfluencer di sini... (cth: 'GOTO bulan depan pasti tembus 300!')"
                                className="w-full bg-transparent p-4 pb-12 min-h-[140px] text-sm outline-none resize-none placeholder:text-foreground-muted/70 text-foreground"
                                disabled={isScanning}
                            />
                        ) : (
                            <textarea
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Paste link sosial media (X/Instagram/TikTok) di sini..."
                                className="w-full bg-transparent p-4 pb-12 min-h-[140px] text-sm outline-none resize-none placeholder:text-foreground-muted/70 text-foreground"
                                disabled={isScanning}
                            />
                        )}

                        {/* Quick Paste Button inside textarea */}
                        <button
                            type="button"
                            onClick={handlePaste}
                            className="absolute bottom-3 left-3 flex items-center gap-1.5 px-3 py-1.5 bg-surface-hover hover:bg-surface-active text-foreground font-semibold text-xs rounded-lg border border-border transition-colors z-10"
                        >
                            <ClipboardPaste size={14} /> Paste
                        </button>
                    </div>
                    <button
                        type="submit"
                        disabled={!input.trim() || isScanning}
                        className="w-full bg-primary text-white hover:bg-primary-dark font-bold rounded-xl py-3.5 flex items-center justify-center gap-2 transition-all disabled:opacity-60 disabled:cursor-not-allowed shadow-sm"
                    >
                        {isScanning ? (
                            <span className="flex items-center gap-2">
                                <Search size={18} className="animate-pulse" />
                                Menganalisis {inputType === "link" ? "Link" : "Klaim"}...
                            </span>
                        ) : (
                            <span className="flex items-center gap-2">
                                <Search size={18} /> Cek Fakta
                            </span>
                        )}
                    </button>
                </form>

                {isScanning && (
                    <div className="flex flex-col items-center justify-center text-center py-10">
                        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4 relative">
                            <div className="absolute inset-0 border-4 border-primary/20 rounded-full"></div>
                            <div className="absolute inset-0 border-4 border-primary rounded-full border-t-transparent animate-spin"></div>
                            <ShieldAlert className="text-primary" size={24} />
                        </div>
                        <p className="font-semibold text-primary">Cross-checking NLP & IDX Data...</p>
                        <p className="text-xs text-foreground-muted mt-2">Ini mungkin memakan waktu beberapa detik</p>
                    </div>
                )}

                {result && !isScanning && (
                    <div className="animate-in slide-in-from-bottom-4 duration-500">
                        <h2 className="text-sm font-bold text-foreground mb-3 px-1 hover:text-primary transition-colors cursor-pointer">
                            Hasil Analisis
                        </h2>
                        <div className={`rounded-xl border shadow-sm p-5 ${result.riskLevel === "High" ? "bg-danger/5 border-danger/30" :
                            result.riskLevel === "Moderate" ? "bg-warning/5 border-warning/30" :
                                "bg-primary/5 border-primary/30"
                            }`}>

                            <div className="flex justify-between items-center mb-6 pb-5 border-b border-border/50">
                                <div>
                                    <p className="text-[10px] uppercase tracking-wider font-bold text-foreground-muted mb-1">Truth Score</p>
                                    <h3 className={`text-4xl font-black ${result.truthScore >= 80 ? "text-primary" : result.truthScore >= 50 ? "text-warning" : "text-danger"
                                        }`}>
                                        {result.truthScore}<span className="text-lg font-bold opacity-40">/100</span>
                                    </h3>
                                </div>

                                <div className={`flex flex-col items-end gap-1.5`}>
                                    <p className="text-[10px] uppercase font-bold text-foreground-muted">Risk Level</p>
                                    <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-bold text-xs ${result.riskLevel === "High" ? "bg-danger text-white shadow-danger/20" :
                                        result.riskLevel === "Moderate" ? "bg-warning text-white shadow-warning/20" :
                                            "bg-primary text-white shadow-primary/20"
                                        } shadow-sm`}>
                                        {result.riskLevel === "High" ? <AlertOctagon size={14} /> :
                                            result.riskLevel === "Moderate" ? <ShieldQuestion size={14} /> :
                                                <CheckCircle2 size={14} />}
                                        {result.riskLevel}
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-5">
                                <div>
                                    <h4 className="font-bold text-sm text-foreground flex items-center gap-1.5 mb-2">
                                        <span className="w-1.5 h-1.5 rounded-full bg-foreground-muted"></span>
                                        Analisis Sentimen
                                    </h4>
                                    <p className="text-sm leading-relaxed text-foreground-muted pl-3 border-l-2 border-border/50">
                                        {result.analysis}
                                    </p>
                                </div>

                                <div className="bg-surface rounded-lg p-4 border border-border">
                                    <h4 className="font-bold text-sm text-primary mb-2 flex items-center gap-1.5">
                                        <ShieldAlert size={14} className="text-primary" />
                                        Saran Edukatif
                                    </h4>
                                    <p className="text-sm leading-relaxed text-foreground">
                                        {result.advice}
                                    </p>
                                </div>
                            </div>

                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
