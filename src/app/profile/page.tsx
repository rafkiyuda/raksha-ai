"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { User as UserIcon, Settings, ShieldCheck, Wallet, ChevronRight, LogOut, Ban, BellOff, Plus, FileText, Link as LinkIcon, X, Loader2, UploadCloud, CheckCircle2 } from "lucide-react";

export default function ProfilePage() {
    const [adBlockerEnabled, setAdBlockerEnabled] = useState(true);
    const [isAddPortfolioModalOpen, setIsAddPortfolioModalOpen] = useState(false);
    const [isNotificationModalOpen, setIsNotificationModalOpen] = useState(false);
    const [isBrokerageModalOpen, setIsBrokerageModalOpen] = useState(false);
    const [isRiskModalOpen, setIsRiskModalOpen] = useState(false);

    // Upload State
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [isUploading, setIsUploading] = useState(false);
    const [uploadedData, setUploadedData] = useState<any[] | null>(null);
    const [uploadError, setUploadError] = useState("");

    const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        setIsUploading(true);
        setUploadError("");
        setUploadedData(null);

        const formData = new FormData();
        formData.append("file", file);

        try {
            const res = await fetch("/api/ocr", {
                method: "POST",
                body: formData,
            });

            const json = await res.json();
            if (!res.ok) throw new Error(json.error || "Gagal memproses gambar");

            if (json.data && Array.isArray(json.data) && json.data.length > 0) {
                setUploadedData(json.data);
            } else {
                setUploadError("Gagal mendeteksi portofolio yang valid di dalam gambar.");
            }
        } catch (error: any) {
            setUploadError(error.message);
        } finally {
            setIsUploading(false);
            // reset file input
            if (fileInputRef.current) fileInputRef.current.value = "";
        }
    };

    return (
        <div className="flex flex-col min-h-screen bg-background pb-24">
            {/* Header */}
            <header className="px-5 pt-8 pb-6 bg-surface border-b border-border shadow-sm sticky top-0 z-10">
                <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-primary-light flex items-center justify-center text-primary-dark shadow-sm border-2 border-primary/20">
                        <UserIcon size={32} />
                    </div>
                    <div>
                        <h1 className="text-xl font-bold text-foreground">Sherine</h1>
                        <p className="text-sm text-foreground-muted">sherine@raksha.ai</p>
                        <div className="mt-1 inline-flex items-center gap-1 px-2 py-0.5 bg-primary/10 text-primary-dark dark:text-primary rounded-md text-[10px] font-bold tracking-wider">
                            <ShieldCheck size={12} /> PRO MEMBER
                        </div>
                    </div>
                </div>
            </header>

            <div className="p-5 flex flex-col gap-6">

                {/* Core Settings / Features */}
                <section>
                    <h3 className="text-sm font-bold text-foreground-muted uppercase tracking-wider mb-3 px-1">Protection Features</h3>
                    <div className="bg-surface rounded-xl border border-border shadow-sm overflow-hidden">

                        {/* Ad Blocker Toggle */}
                        <div className="flex items-center justify-between p-4 border-b border-border/50 hover:bg-surface-hover transition-colors">
                            <div className="flex items-center gap-3">
                                <div className={`p-2 rounded-lg ${adBlockerEnabled ? 'bg-primary/10 text-primary-dark dark:text-primary' : 'bg-surface-active text-foreground-muted'}`}>
                                    <Ban size={20} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-sm text-foreground">Pompom Ad Blocker</h4>
                                    <p className="text-xs text-foreground-muted">Auto-block iklan saham berisiko / judi online</p>
                                </div>
                            </div>

                            {/* Toggle Switch */}
                            <button
                                onClick={() => setAdBlockerEnabled(!adBlockerEnabled)}
                                className={`w-12 h-6 rounded-full flex items-center px-1 transition-colors duration-300 ${adBlockerEnabled ? 'bg-primary' : 'bg-surface-active'}`}
                            >
                                <div className={`w-4 h-4 rounded-full bg-white shadow-sm transform transition-transform duration-300 ${adBlockerEnabled ? 'translate-x-6' : 'translate-x-0'}`}></div>
                            </button>
                        </div>

                        {/* Notification Filter */}
                        <button onClick={() => setIsNotificationModalOpen(true)} className="w-full flex items-center justify-between p-4 cursor-pointer hover:bg-surface-hover transition-colors">
                            <div className="flex items-center gap-3">
                                <div className="p-2 rounded-lg bg-surface-active text-foreground">
                                    <BellOff size={20} />
                                </div>
                                <div className="text-left">
                                    <h4 className="font-bold text-sm text-foreground">Smart Notification</h4>
                                    <p className="text-xs text-foreground-muted">Hanya notifikasi dari aset berisiko (GOTO, BUKA)</p>
                                </div>
                            </div>
                            <ChevronRight size={18} className="text-foreground-muted" />
                        </button>

                    </div>
                </section>

                {/* Linked Accounts / Portfolio */}
                <section>
                    <div className="flex items-center justify-between mb-3 px-1">
                        <h3 className="text-sm font-bold text-foreground-muted uppercase tracking-wider">Portfolio & Accounts</h3>
                        <button
                            onClick={() => setIsAddPortfolioModalOpen(true)}
                            className="text-primary text-xs font-bold flex items-center gap-1 hover:text-primary-dark transition-colors"
                        >
                            <Plus size={14} /> ADD NEW
                        </button>
                    </div>

                    <div className="bg-surface rounded-xl border border-border shadow-sm overflow-hidden">
                        <button onClick={() => setIsBrokerageModalOpen(true)} className="w-full flex items-center justify-between p-4 border-b border-border/50 cursor-pointer hover:bg-surface-hover transition-colors">
                            <div className="flex items-center gap-3">
                                <div className="p-2 rounded-lg bg-surface-active text-foreground">
                                    <Wallet size={20} />
                                </div>
                                <div className="text-left">
                                    <h4 className="font-bold text-sm text-foreground">Linked Brokerage</h4>
                                    <p className="text-xs text-foreground-muted">Ajaib Sekuritas (Connected via Open API)</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-xs font-bold text-primary">Active</span>
                                <ChevronRight size={18} className="text-foreground-muted" />
                            </div>
                        </button>

                        <button onClick={() => setIsRiskModalOpen(true)} className="w-full flex items-center justify-between p-4 cursor-pointer hover:bg-surface-hover transition-colors">
                            <div className="flex items-center gap-3">
                                <div className="p-2 rounded-lg bg-surface-active text-foreground">
                                    <Settings size={20} />
                                </div>
                                <div className="text-left">
                                    <h4 className="font-bold text-sm text-foreground">Risk Profile Settings</h4>
                                    <p className="text-xs text-foreground-muted">Moderate - Balanced</p>
                                </div>
                            </div>
                            <ChevronRight size={18} className="text-foreground-muted" />
                        </button>
                    </div>
                </section>

                {/* Logout */}
                <section className="mt-4">
                    <button className="w-full flex items-center justify-center gap-2 py-4 rounded-xl font-bold text-danger bg-danger/5 hover:bg-danger/10 border border-danger/20 transition-colors">
                        <LogOut size={18} /> Logout
                    </button>
                </section>
            </div>

            {/* Add Portfolio Modal */}
            {isAddPortfolioModalOpen && (
                <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="bg-surface w-full sm:w-[400px] rounded-t-2xl sm:rounded-2xl shadow-xl border border-border overflow-hidden animate-in slide-in-from-bottom-5 sm:slide-in-from-bottom-0 sm:zoom-in-95 duration-300">
                        <div className="p-5 border-b border-border/50 flex justify-between items-center">
                            <div>
                                <h3 className="text-lg font-bold text-foreground">Add Portfolio</h3>
                                <p className="text-xs text-foreground-muted mt-0.5">Pilih metode integrasi portofolio Anda.</p>
                            </div>
                            <button
                                onClick={() => setIsAddPortfolioModalOpen(false)}
                                className="p-2 bg-surface-active hover:bg-surface-hover rounded-full text-foreground-muted transition-colors"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        <div className="p-5 flex flex-col gap-4">
                            {!uploadedData ? (
                                <>
                                    {/* Option 1: Open API */}
                                    <button className="flex items-start gap-4 p-4 rounded-xl border border-primary/30 bg-primary/5 hover:bg-primary/10 transition-colors text-left focus:ring-2 ring-primary/50 outline-none w-full">
                                        <div className="p-2.5 rounded-full bg-primary/10 text-primary mt-1 shrink-0">
                                            <LinkIcon size={20} />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-sm text-foreground flex items-center gap-2">
                                                Auto Connect (Open API)
                                                <span className="text-[9px] bg-primary text-white px-1.5 py-0.5 rounded uppercase font-bold tracking-wider">Recommended</span>
                                            </h4>
                                            <p className="text-xs text-foreground-muted mt-1 leading-relaxed">
                                                Hubungkan langsung dari aplikasi sekuritas resmi (Ajaib, Bibit, dll). Data terupdate otomatis secara real-time.
                                            </p>
                                        </div>
                                    </button>

                                    {/* Option 2: OCR / Manual */}
                                    <input
                                        type="file"
                                        ref={fileInputRef}
                                        className="hidden"
                                        accept="image/*"
                                        onChange={handleFileUpload}
                                    />
                                    <button
                                        onClick={() => fileInputRef.current?.click()}
                                        disabled={isUploading}
                                        className={`flex items-start gap-4 p-4 rounded-xl border border-border bg-surface-active hover:bg-surface-hover transition-colors text-left focus:ring-2 ring-foreground/20 outline-none w-full ${isUploading ? 'opacity-70 cursor-not-allowed' : ''}`}
                                    >
                                        <div className="p-2.5 rounded-full bg-surface text-foreground-muted mt-1 shrink-0">
                                            {isUploading ? <Loader2 size={20} className="animate-spin text-primary" /> : <UploadCloud size={20} />}
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-sm text-foreground flex items-center gap-2">
                                                {isUploading ? "Menganalisis Gambar OCR..." : "Privacy Mode (Upload OCR)"}
                                            </h4>
                                            <p className="text-xs text-foreground-muted mt-1 leading-relaxed">
                                                Unggah screenshot *Portofolio* Anda. AI kami akan mengekstrak aset Anda dengan sangat aman tanpa akses sekuritas.
                                            </p>
                                        </div>
                                    </button>

                                    {uploadError && (
                                        <div className="p-3 bg-danger/10 text-danger border border-danger/20 rounded-lg text-xs mt-2">
                                            {uploadError}
                                        </div>
                                    )}
                                </>
                            ) : (
                                <div className="animate-in fade-in zoom-in-95 duration-300">
                                    <div className="flex items-center justify-between mb-4">
                                        <h4 className="font-bold text-sm text-foreground flex items-center gap-2">
                                            <CheckCircle2 size={16} className="text-primary" /> Data Terekstrak
                                        </h4>
                                        <button
                                            onClick={() => setUploadedData(null)}
                                            className="text-xs font-bold text-primary hover:text-primary-dark transition-colors"
                                        >
                                            Upload Ulang
                                        </button>
                                    </div>

                                    <div className="flex flex-col gap-2 max-h-[300px] overflow-y-auto pr-1 mb-4">
                                        {uploadedData.map((item, idx) => (
                                            <div key={idx} className="p-3 rounded-lg border border-border bg-surface flex justify-between items-center text-xs">
                                                <div>
                                                    <span className="font-bold text-foreground text-sm block mb-0.5">{item.ticker || 'UNKNOWN'}</span>
                                                    <span className="text-foreground-muted">{item.shares || 0} lot/unit</span>
                                                </div>
                                                <div className="text-right">
                                                    <span className="text-foreground-muted block mb-0.5">Avg: {item.averagePrice || 0}</span>
                                                    <span className={`font-bold ${item.returnPercent && item.returnPercent > 0 ? 'text-primary' : item.returnPercent && item.returnPercent < 0 ? 'text-danger' : 'text-foreground'}`}>
                                                        {item.returnPercent ? `${item.returnPercent > 0 ? '+' : ''}${item.returnPercent}%` : '-'}
                                                    </span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    <button
                                        onClick={() => {
                                            setIsAddPortfolioModalOpen(false);
                                            setUploadedData(null);
                                            // Handle saving data logic here...
                                        }}
                                        className="w-full py-3 bg-primary hover:bg-primary-dark text-white rounded-xl text-xs font-bold transition-colors"
                                    >
                                        Simpan Portofolio
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* Risk Profile Modal */}
            {isRiskModalOpen && (
                <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="bg-surface w-full sm:w-[400px] rounded-t-2xl sm:rounded-2xl shadow-xl border border-border overflow-hidden animate-in slide-in-from-bottom-5 sm:slide-in-from-bottom-0 sm:zoom-in-95 duration-300">
                        <div className="p-5 border-b border-border/50 flex justify-between items-center">
                            <div>
                                <h3 className="text-lg font-bold text-foreground flex items-center gap-2"><Settings size={18} className="text-primary" /> Risk Profile</h3>
                                <p className="text-xs text-foreground-muted mt-0.5">Sesuaikan tingkat toleransi risiko Anda.</p>
                            </div>
                            <button
                                onClick={() => setIsRiskModalOpen(false)}
                                className="p-2 bg-surface-active hover:bg-surface-hover rounded-full text-foreground-muted transition-colors"
                            >
                                <X size={20} />
                            </button>
                        </div>
                        <div className="p-5 flex flex-col gap-3">
                            <button onClick={() => setIsRiskModalOpen(false)} className="flex items-center justify-between p-4 rounded-xl border border-border bg-surface-active hover:bg-surface-hover transition-colors text-left focus:ring-2 ring-foreground/20 outline-none">
                                <div>
                                    <h4 className="font-bold text-sm text-foreground">Conservative</h4>
                                    <p className="text-xs text-foreground-muted mt-0.5">Fokus pada pelestarian modal. (Reksadana/SBN)</p>
                                </div>
                            </button>
                            <button onClick={() => setIsRiskModalOpen(false)} className="flex items-center justify-between p-4 rounded-xl border border-primary/30 bg-primary/5 hover:bg-primary/10 transition-colors text-left focus:ring-2 ring-primary/50 outline-none">
                                <div>
                                    <h4 className="font-bold text-sm text-foreground flex items-center gap-2">
                                        Moderate <span className="text-[9px] bg-primary text-white px-1.5 py-0.5 rounded uppercase font-bold tracking-wider">Aktif</span>
                                    </h4>
                                    <p className="text-xs text-foreground-muted mt-0.5">Kombinasi pertumbuhan dan stabilitas (Bluechip + ETF).</p>
                                </div>
                                <ShieldCheck size={18} className="text-primary" />
                            </button>
                            <button onClick={() => setIsRiskModalOpen(false)} className="flex items-center justify-between p-4 rounded-xl border border-border bg-surface-active hover:bg-surface-hover transition-colors text-left focus:ring-2 ring-danger/50 outline-none">
                                <div>
                                    <h4 className="font-bold text-sm text-foreground text-danger">Aggressive</h4>
                                    <p className="text-xs text-foreground-muted mt-0.5">Fokus imbal hasil tinggi, siap fluktuasi tajam (Saham Lapis 2/3).</p>
                                </div>
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Linked Brokerage Modal */}
            {isBrokerageModalOpen && (
                <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="bg-surface w-full sm:w-[400px] rounded-t-2xl sm:rounded-2xl shadow-xl border border-border overflow-hidden animate-in slide-in-from-bottom-5 sm:slide-in-from-bottom-0 sm:zoom-in-95 duration-300">
                        <div className="p-5 border-b border-border/50 flex justify-between items-center">
                            <div>
                                <h3 className="text-lg font-bold text-foreground flex items-center gap-2"><Wallet size={18} className="text-primary" /> Linked Brokerage</h3>
                                <p className="text-xs text-foreground-muted mt-0.5">Kelola koneksi sekuritas Anda.</p>
                            </div>
                            <button
                                onClick={() => setIsBrokerageModalOpen(false)}
                                className="p-2 bg-surface-active hover:bg-surface-hover rounded-full text-foreground-muted transition-colors"
                            >
                                <X size={20} />
                            </button>
                        </div>
                        <div className="p-5 flex flex-col gap-4">
                            <div className="p-4 rounded-xl border border-primary/30 bg-primary/5 flex flex-col gap-3">
                                <div className="flex justify-between items-center">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-500 font-bold">A</div>
                                        <div>
                                            <h4 className="font-bold text-sm text-foreground">Ajaib Sekuritas</h4>
                                            <p className="text-xs text-foreground-muted flex items-center gap-1"><span className="w-1.5 h-1.5 bg-primary rounded-full"></span> Connected: Real-time</p>
                                        </div>
                                    </div>
                                    <span className="text-xs font-bold text-primary px-2 py-1 bg-primary/10 rounded-lg">Default</span>
                                </div>
                                <button onClick={() => setIsBrokerageModalOpen(false)} className="w-full py-2 text-xs font-bold text-danger border border-danger/20 rounded-lg hover:bg-danger/5 transition-colors">
                                    Disconnect Account
                                </button>
                            </div>

                            <button onClick={() => { setIsBrokerageModalOpen(false); setIsAddPortfolioModalOpen(true); }} className="w-full py-3 rounded-xl border border-dashed border-border text-foreground-muted font-bold text-xs hover:border-primary/50 hover:text-primary transition-colors flex items-center justify-center gap-2">
                                <Plus size={16} /> Link New Brokerage
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Smart Notification Modal */}
            {isNotificationModalOpen && (
                <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="bg-surface w-full sm:w-[400px] rounded-t-2xl sm:rounded-2xl shadow-xl border border-border overflow-hidden animate-in slide-in-from-bottom-5 sm:slide-in-from-bottom-0 sm:zoom-in-95 duration-300">
                        <div className="p-5 border-b border-border/50 flex justify-between items-center">
                            <div>
                                <h3 className="text-lg font-bold text-foreground flex items-center gap-2"><BellOff size={18} className="text-primary" /> Smart Notification</h3>
                                <p className="text-xs text-foreground-muted mt-0.5">Filter peringatan dari aset berbahaya.</p>
                            </div>
                            <button
                                onClick={() => setIsNotificationModalOpen(false)}
                                className="p-2 bg-surface-active hover:bg-surface-hover rounded-full text-foreground-muted transition-colors"
                            >
                                <X size={20} />
                            </button>
                        </div>
                        <div className="p-5 flex flex-col gap-3">
                            <button className="flex items-center justify-between p-4 rounded-xl border border-border bg-surface-active hover:bg-surface-hover transition-colors text-left focus:ring-2 ring-foreground/20 outline-none">
                                <div>
                                    <h4 className="font-bold text-sm text-foreground">Semua Notifikasi</h4>
                                    <p className="text-xs text-foreground-muted mt-0.5">Dapatkan notifikasi harian untuk portofolio sehat & berisiko.</p>
                                </div>
                            </button>
                            <button className="flex items-center justify-between p-4 rounded-xl border border-primary/30 bg-primary/5 hover:bg-primary/10 transition-colors text-left focus:ring-2 ring-primary/50 outline-none">
                                <div>
                                    <h4 className="font-bold text-sm text-foreground flex items-center gap-2">
                                        Hanya Aset Berisiko Tinggi <span className="text-[9px] bg-primary text-white px-1.5 py-0.5 rounded uppercase font-bold tracking-wider">Aktif</span>
                                    </h4>
                                    <p className="text-xs text-foreground-muted mt-0.5">Saring sinyal bising. Peringatkan saya jika GOTO / BUKA bermasalah.</p>
                                </div>
                                <ShieldCheck size={18} className="text-primary" />
                            </button>
                            <button onClick={() => setIsNotificationModalOpen(false)} className="w-full mt-2 py-3 bg-primary text-white rounded-xl text-xs font-bold transition-colors">
                                Simpan Pengaturan
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
