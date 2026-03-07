"use client";

import { ShieldAlert, TrendingUp, TrendingDown, BellRing, ChevronRight, Wallet } from "lucide-react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function Home() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-background pb-24">
      {/* Header section */}
      <header className="px-5 pt-6 pb-4 bg-surface sticky top-0 z-40 border-b border-border flex justify-between items-center shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary-light flex items-center justify-center text-primary-dark font-bold text-lg">
            S
          </div>
          <div>
            <p className="text-xs text-foreground-muted">Welcome back,</p>
            <h1 className="text-base font-bold text-foreground">Sherine</h1>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {mounted && (
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="text-xs font-semibold px-2 py-1 rounded bg-surface-hover border border-border text-foreground-muted"
            >
              {theme === "dark" ? "Light" : "Dark"}
            </button>
          )}
          <button className="relative p-2 rounded-full text-foreground-muted hover:bg-surface-hover transition-colors">
            <BellRing size={22} />
            <span className="absolute top-1.5 right-2 w-2 h-2 bg-danger rounded-full border-2 border-surface"></span>
          </button>
        </div>
      </header>

      <div className="p-5 flex flex-col gap-6">
        {/* Portfolio Overview */}
        <section className="bg-primary text-white rounded-2xl p-5 shadow-lg relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-20">
            <Wallet size={120} />
          </div>
          <p className="text-sm text-primary-light mb-1 relative z-10">Total Portfolio Value</p>
          <div className="flex items-end gap-3 mb-5 relative z-10">
            <h2 className="text-3xl font-bold tracking-tight">Rp 24,500,000</h2>
          </div>

          <div className="flex gap-4 relative z-10">
            <div className="flex-1 bg-white/10 rounded-xl p-3 backdrop-blur-sm border border-white/20">
              <p className="text-xs text-primary-light mb-1">Truth Score Avg</p>
              <p className="text-lg font-bold">86/100</p>
            </div>
            <div className="flex-1 bg-white/10 rounded-xl p-3 backdrop-blur-sm border border-white/20">
              <p className="text-xs text-primary-light mb-1">Risk Level</p>
              <p className="text-lg font-bold text-white flex items-center gap-1">
                Moderate <TrendingUp size={14} className="text-primary-light" />
              </p>
            </div>
          </div>
        </section>

        {/* Action Buttons */}
        <section className="grid grid-cols-2 gap-3">
          <Link href="/chat" className="bg-surface border border-border rounded-xl p-4 shadow-sm flex items-center justify-between hover:border-primary/50 transition-colors">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary-light/50 text-primary-dark dark:bg-primary-light/20 dark:text-primary rounded-lg">
                <ShieldAlert size={20} />
              </div>
              <span className="font-semibold text-sm">AI Co-Pilot</span>
            </div>
            <ChevronRight size={16} className="text-foreground-muted" />
          </Link>
          <Link href="/scanner" className="bg-surface border border-border rounded-xl p-4 shadow-sm flex items-center justify-between hover:border-primary/50 transition-colors">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-warning/20 text-warning-dark dark:text-warning rounded-lg">
                <TrendingDown size={20} />
              </div>
              <span className="font-semibold text-sm">Truth Scanner</span>
            </div>
            <ChevronRight size={16} className="text-foreground-muted" />
          </Link>
        </section>

        {/* Risk Alerts */}
        <section>
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-base font-bold text-foreground">Active Alerts</h3>
            <Link href="/scanner" className="text-xs font-semibold text-primary hover:underline">
              See All
            </Link>
          </div>

          <div className="bg-surface border border-border rounded-xl p-4 shadow-sm flex gap-3 items-start">
            <div className="p-2 bg-danger/10 rounded-lg shrink-0 mt-0.5">
              <ShieldAlert className="text-danger" size={18} />
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-start mb-1">
                <h4 className="font-bold text-sm text-foreground">GOTO: High Volatility</h4>
                <span className="text-[10px] font-bold px-2 py-0.5 bg-danger/10 text-danger rounded-full">High</span>
              </div>
              <p className="text-xs text-foreground-muted mb-3 leading-relaxed">
                Social sentiment anomaly detected. Truth Score indicates mismatch with projected earnings.
              </p>
              <Link href="/chat?topic=GOTO" className="inline-block px-3 py-1.5 bg-background border border-border text-foreground text-xs font-semibold rounded-lg hover:bg-surface-hover transition-colors">
                Ask Co-Pilot
              </Link>
            </div>
          </div>
        </section>

        {/* Market Movers */}
        <section>
          <h3 className="text-base font-bold text-foreground mb-3">Your Watchlist</h3>
          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center p-3 bg-surface rounded-xl border border-border hover:border-border/80 transition-colors cursor-pointer shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-surface-active flex items-center justify-center font-bold text-xs text-foreground">
                  BBCA
                </div>
                <div>
                  <p className="font-semibold text-sm text-foreground">Bank Central Asia</p>
                  <p className="text-xs text-foreground-muted">Safe-to-Trade</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-semibold text-sm">Rp 9,800</p>
                <p className="text-xs font-bold text-primary flex items-center justify-end">
                  +1.2%
                </p>
              </div>
            </div>

            <div className="flex justify-between items-center p-3 bg-surface rounded-xl border border-border hover:border-border/80 transition-colors cursor-pointer shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-surface-active flex items-center justify-center font-bold text-xs text-foreground">
                  BUMI
                </div>
                <div>
                  <p className="font-semibold text-sm text-foreground">Bumi Resources</p>
                  <p className="text-xs text-danger">Special Notation</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-semibold text-sm">Rp 120</p>
                <p className="text-xs font-bold text-danger flex items-center justify-end">
                  -3.4%
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
