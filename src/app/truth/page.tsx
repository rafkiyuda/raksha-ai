"use client";

import { useState } from "react";
import { ChevronDown, ChevronRight, TrendingUp, TrendingDown, ArrowDownUp, FileText } from "lucide-react";

export default function TruthScorePage() {
    return (
        <div className="flex flex-col min-h-screen bg-background pb-24">
            {/* Header */}
            <header className="px-5 pt-10 pb-6 flex flex-col items-center justify-center border-b border-border/10 bg-surface">
                <h1 className="text-xl font-bold text-foreground">Truth Score</h1>
                <p className="text-xs text-foreground-muted mt-1 text-center max-w-[250px] leading-relaxed">
                    AI-powered financial statement integrity
                </p>

                {/* Circular Progress (Mock SVG for the "61 Avg Score" look) */}
                <div className="relative mt-8 mb-6 flex items-center justify-center">
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
                        <span className="text-4xl font-bold text-foreground tracking-tight">61</span>
                        <span className="text-[10px] text-foreground-muted font-semibold mt-1">Avg Score</span>
                    </div>
                </div>

                {/* Legend */}
                <div className="flex items-center gap-4 text-[10px] font-medium text-foreground-muted">
                    <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-primary"></div> 70-100 Safe</div>
                    <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-warning"></div> 40-69 Caution</div>
                    <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-danger"></div> 0-39 Danger</div>
                </div>
            </header>

            {/* Stock Analysis List */}
            <div className="p-5 flex flex-col gap-4">
                <div className="flex items-center justify-between mb-1 px-1">
                    <h3 className="text-sm font-bold text-foreground-muted tracking-wide uppercase">Stock Analysis</h3>
                    <button className="flex items-center gap-1 px-2.5 py-1.5 bg-surface-active hover:bg-surface-hover rounded-md text-[10px] font-semibold text-foreground transition-colors">
                        <ArrowDownUp size={12} /> Score High
                    </button>
                </div>

                {/* Detailed Item (Open State) - BBCA */}
                <div className="bg-surface rounded-2xl border border-primary/30 p-4 shadow-sm relative overflow-hidden">
                    {/* Subtle glow effect */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>

                    <div className="flex justify-between items-center mb-5 relative z-10">
                        <div className="flex items-center gap-3">
                            <div className="relative w-12 h-12 flex items-center justify-center">
                                <svg className="w-full h-full transform -rotate-90 absolute">
                                    <circle cx="24" cy="24" r="21" stroke="currentColor" strokeWidth="3" fill="transparent" className="text-surface-active" />
                                    <circle cx="24" cy="24" r="21" stroke="currentColor" strokeWidth="3" fill="transparent" className="text-primary" strokeDasharray="132" strokeDashoffset={132 - (132 * 0.92)} />
                                </svg>
                                <span className="text-sm font-bold text-primary">92</span>
                            </div>
                            <div>
                                <div className="flex items-center gap-2 mb-0.5">
                                    <h4 className="font-bold text-base text-foreground">BBCA</h4>
                                    <span className="text-[9px] font-bold px-1.5 py-0.5 bg-surface-active text-foreground rounded flex items-center justify-center w-5 h-5">A</span>
                                </div>
                                <p className="text-xs text-foreground-muted">Bank Central Asia</p>
                            </div>
                        </div>
                        <ChevronDown size={18} className="text-foreground-muted cursor-pointer" />
                    </div>

                    <div className="grid grid-cols-2 gap-3 mb-5 relative z-10">
                        <div className="bg-background rounded-xl p-3 border border-border/50">
                            <span className="flex items-center gap-1 text-[10px] text-foreground-muted mb-1"><TrendingUp size={10} /> Net Profit</span>
                            <p className="text-sm font-bold text-foreground">Rp 48.2T</p>
                        </div>
                        <div className="bg-background rounded-xl p-3 border border-border/50">
                            <span className="flex items-center gap-1 text-[10px] text-foreground-muted mb-1"><TrendingDown size={10} /> Cash Flow</span>
                            <p className="text-sm font-bold text-foreground">Rp 45.8T</p>
                        </div>
                    </div>

                    <div className="mb-4 relative z-10">
                        <div className="flex justify-between text-[10px] mb-2">
                            <span className="text-foreground-muted font-medium">Profit-Cash Alignment</span>
                            <span className="font-bold text-primary">95%</span>
                        </div>
                        <div className="h-1.5 w-full bg-surface-active rounded-full overflow-hidden">
                            <div className="h-full bg-primary rounded-full w-[95%]"></div>
                        </div>
                    </div>

                    <div className="bg-[#0c182a] border border-[#1e3a8a]/30 p-3 rounded-lg flex items-center gap-2 relative z-10">
                        <FileText size={14} className="text-blue-400" />
                        <p className="text-xs font-medium text-blue-400">No anomalies detected in financial statements</p>
                    </div>
                </div>

                {/* Closed Item - TLKM */}
                <div className="bg-surface rounded-2xl border border-border/50 p-4 shadow-sm flex justify-between items-center cursor-pointer hover:bg-surface-hover transition-colors">
                    <div className="flex items-center gap-3">
                        <div className="relative w-12 h-12 flex items-center justify-center">
                            <svg className="w-full h-full transform -rotate-90 absolute">
                                <circle cx="24" cy="24" r="21" stroke="currentColor" strokeWidth="3" fill="transparent" className="text-surface-active" />
                                <circle cx="24" cy="24" r="21" stroke="currentColor" strokeWidth="3" fill="transparent" className="text-primary" strokeDasharray="132" strokeDashoffset={132 - (132 * 0.85)} />
                            </svg>
                            <span className="text-sm font-bold text-primary">85</span>
                        </div>
                        <div>
                            <div className="flex items-center gap-2 mb-0.5">
                                <h4 className="font-bold text-base text-foreground">TLKM</h4>
                                <span className="text-[9px] font-bold px-1.5 py-0.5 bg-surface-active text-foreground rounded flex items-center justify-center w-5 h-5">A</span>
                            </div>
                            <p className="text-xs text-foreground-muted">Telkom Indonesia</p>
                        </div>
                    </div>
                    <ChevronRight size={18} className="text-foreground-muted" />
                </div>

                {/* Closed Item - GOTO (Warning) */}
                <div className="bg-surface rounded-2xl border border-warning/20 p-4 shadow-sm flex justify-between items-center cursor-pointer hover:bg-surface-hover transition-colors">
                    <div className="flex items-center gap-3">
                        <div className="relative w-12 h-12 flex items-center justify-center">
                            <svg className="w-full h-full transform -rotate-90 absolute">
                                <circle cx="24" cy="24" r="21" stroke="currentColor" strokeWidth="3" fill="transparent" className="text-surface-active" />
                                <circle cx="24" cy="24" r="21" stroke="currentColor" strokeWidth="3" fill="transparent" className="text-warning" strokeDasharray="132" strokeDashoffset={132 - (132 * 0.42)} />
                            </svg>
                            <span className="text-sm font-bold text-warning">42</span>
                        </div>
                        <div>
                            <div className="flex items-center gap-2 mb-0.5">
                                <h4 className="font-bold text-base text-foreground">GOTO</h4>
                                <span className="text-[9px] font-bold px-1.5 py-0.5 bg-surface-active text-foreground rounded flex items-center justify-center w-5 h-5">C</span>
                            </div>
                            <p className="text-xs text-foreground-muted">GoTo Gojek Tokopedia</p>
                        </div>
                    </div>
                    <ChevronRight size={18} className="text-foreground-muted" />
                </div>

            </div>
        </div>
    );
}
