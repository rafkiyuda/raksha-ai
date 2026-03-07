"use client";

import { useState } from "react";
import { User as UserIcon, Settings, ShieldCheck, Wallet, ChevronRight, LogOut, Ban, BellOff, Plus, FileText, Link as LinkIcon, X } from "lucide-react";

export default function ProfilePage() {
    const [adBlockerEnabled, setAdBlockerEnabled] = useState(true);
    const [isAddPortfolioModalOpen, setIsAddPortfolioModalOpen] = useState(false);

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
                        <div className="flex items-center justify-between p-4 cursor-pointer hover:bg-surface-hover transition-colors">
                            <div className="flex items-center gap-3">
                                <div className="p-2 rounded-lg bg-surface-active text-foreground">
                                    <BellOff size={20} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-sm text-foreground">Smart Notification</h4>
                                    <p className="text-xs text-foreground-muted">Hanya notifikasi dari aset berisiko (GOTO, BUKA)</p>
                                </div>
                            </div>
                            <ChevronRight size={18} className="text-foreground-muted" />
                        </div>

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
                        <div className="flex items-center justify-between p-4 border-b border-border/50 cursor-pointer hover:bg-surface-hover transition-colors">
                            <div className="flex items-center gap-3">
                                <div className="p-2 rounded-lg bg-surface-active text-foreground">
                                    <Wallet size={20} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-sm text-foreground">Linked Brokerage</h4>
                                    <p className="text-xs text-foreground-muted">Ajaib Sekuritas (Connected via Open API)</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-xs font-bold text-primary">Active</span>
                                <ChevronRight size={18} className="text-foreground-muted" />
                            </div>
                        </div>

                        <div className="flex items-center justify-between p-4 cursor-pointer hover:bg-surface-hover transition-colors">
                            <div className="flex items-center gap-3">
                                <div className="p-2 rounded-lg bg-surface-active text-foreground">
                                    <Settings size={20} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-sm text-foreground">Risk Profile Settings</h4>
                                    <p className="text-xs text-foreground-muted">Moderate - Balanced</p>
                                </div>
                            </div>
                            <ChevronRight size={18} className="text-foreground-muted" />
                        </div>
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
                            {/* Option 1: Open API */}
                            <button className="flex items-start gap-4 p-4 rounded-xl border border-primary/30 bg-primary/5 hover:bg-primary/10 transition-colors text-left focus:ring-2 ring-primary/50 outline-none">
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
                            <button className="flex items-start gap-4 p-4 rounded-xl border border-border bg-surface-active hover:bg-surface-hover transition-colors text-left focus:ring-2 ring-foreground/20 outline-none">
                                <div className="p-2.5 rounded-full bg-surface text-foreground-muted mt-1 shrink-0">
                                    <FileText size={20} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-sm text-foreground flex items-center gap-2">
                                        Privacy Mode (OCR / Manual)
                                    </h4>
                                    <p className="text-xs text-foreground-muted mt-1 leading-relaxed">
                                        Unggah screenshot *Portofolio* Anda atau ketik manual. Data 100% aman tersimpan tanpa akses ke akun sekuritas Anda.
                                    </p>
                                </div>
                            </button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
}
