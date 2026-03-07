"use client";

import { ShieldAlert, TrendingUp, TrendingDown, BellRing, ChevronRight, Wallet, Lock, CheckCircle2, MessageSquarePlus } from "lucide-react";
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
          <Link href="/truth" className="bg-surface border border-border rounded-xl p-4 shadow-sm flex items-center justify-between hover:border-primary/50 transition-colors">
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
            <Link href="/truth" className="text-xs font-semibold text-primary hover:underline">
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
              <Link href="/chat?context=stock&ticker=GOTO&name=GoTo%20Gojek%20Tokopedia&score=42" className="inline-block px-3 py-1.5 bg-background border border-border text-foreground text-xs font-semibold rounded-lg hover:bg-surface-hover transition-colors">
                Ask Co-Pilot
              </Link>
            </div>
          </div>
        </section>

        {/* Market Movers / Watchlist */}
        <section>
          <h3 className="text-base font-bold text-foreground mb-3">Your Watchlist Insights</h3>
          <div className="flex flex-col gap-3">

            <WatchlistCard
              ticker="GOTO"
              name="GoTo Gojek Tokopedia"
              change="-4.2%"
              riskLevel={95}
              riskTag="HIGH RISK"
              riskIcon={Lock}
              riskClass="danger"
              statusMessage="Special Monitoring - High Volatility"
              lastUpdated="2 min ago"
              alertMessage="Risk Alert: Protective Recommendation Active"
              insight="GOTO menunjukkan volatilitas sangat tinggi dalam 24 jam terakhir. Sentimen sosial dipenuhi hype yang tidak wajar, sementara rasio profitabilitas menurut laporan keuangan belum sejalan dengan ekspektasi. Pembelian agresif sangat tidak disarankan."
            />

            <WatchlistCard
              ticker="BUKA"
              name="Bukalapak.com"
              change="-1.8%"
              riskLevel={72}
              riskTag="REVIEW"
              riskIcon={TrendingDown}
              riskClass="warning"
              statusMessage="Under Review - Sentiment Discrepancy"
              lastUpdated="15 min ago"
              insight="Terdeteksi adanya pergerakan harga anomali meskipun sentimen berita cenderung netral. Sistem RAKSHA sedang mereview potensi aksi institusional vs ritel. Hindari mengambil posisi besar dengan tergesa-gesa."
            />

            <WatchlistCard
              ticker="BBCA"
              name="Bank Central Asia"
              change="+1.2%"
              riskLevel={12}
              riskTag="SAFE"
              riskIcon={CheckCircle2}
              riskClass="primary"
              statusMessage="Clear - Solid Fundamentals"
              lastUpdated="1 hr ago"
              insight="BCA mempertahankan performa fundamental solid tanpa fluktuasi media sosial yang mencurigakan. Pertumbuhan aset stabil. Profil risiko sangat terkendali dan cocok untuk alokasi porsi utama (Core Portfolio)."
            />

          </div>
        </section>
      </div>
    </div>
  );
}

// Watchlist Card Component with Accordion
function WatchlistCard({
  ticker, name, change, riskLevel, riskTag, riskIcon: Icon, riskClass, statusMessage, lastUpdated, alertMessage, insight
}: any) {
  const [isOpen, setIsOpen] = useState(false);

  const colors: Record<string, string> = {
    danger: "text-danger bg-danger/10 border-danger/30 shadow-danger/20",
    warning: "text-warning bg-warning/10 border-warning/30 shadow-warning/20",
    primary: "text-primary bg-primary/10 border-primary/30 shadow-primary/20",
  };
  const bgColors: Record<string, string> = {
    danger: "bg-danger",
    warning: "bg-warning",
    primary: "bg-primary",
  };
  const riskColor = colors[riskClass] || colors.primary;
  const riskBg = bgColors[riskClass] || bgColors.primary;

  return (
    <div className={`bg-surface rounded-xl border ${riskClass === 'danger' ? 'border-danger/30' : riskClass === 'warning' ? 'border-warning/30' : 'border-primary/30'} shadow-sm overflow-hidden transition-all`}>
      <div
        className="p-4 cursor-pointer hover:bg-surface-hover transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-surface-active flex items-center justify-center font-bold text-xs text-foreground shrink-0">
              {ticker}
            </div>
            <div>
              <div className="flex items-center gap-2 mb-0.5">
                <h4 className="font-bold text-sm text-foreground">{ticker}</h4>
                <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded flex items-center gap-1 ${riskColor.split(' ')[0]} ${riskColor.split(' ')[1]}`}>
                  <Icon size={10} /> {riskTag}
                </span>
              </div>
              <p className="text-xs text-foreground-muted">{name}</p>
            </div>
          </div>
          <div className="text-right">
            <p className={`text-xs font-bold flex items-center justify-end ${change.startsWith('+') ? 'text-primary' : 'text-danger'}`}>
              {change}
              <ChevronRight size={14} className={`ml-1 text-foreground-muted transition-transform duration-200 ${isOpen ? 'rotate-90' : ''}`} />
            </p>
          </div>
        </div>

        <div className="mb-3">
          <div className="flex justify-between text-xs mb-1.5">
            <span className="text-foreground-muted font-medium">Risk Level</span>
            <span className="font-bold text-foreground">{riskLevel}/100</span>
          </div>
          <div className="h-1.5 w-full bg-surface-active rounded-full overflow-hidden">
            <div className={`h-full rounded-full ${riskBg}`} style={{ width: `${riskLevel}%` }}></div>
          </div>
        </div>

        <div>
          <p className="text-xs font-medium text-foreground mb-1">{statusMessage}</p>
          <p className="text-[10px] text-foreground-muted">Last updated: {lastUpdated}</p>
        </div>
      </div>

      {/* Accordion Content */}
      {isOpen && (
        <div className="px-4 py-4 bg-surface-hover border-t border-border/50 animate-in fade-in slide-in-from-top-2 duration-200">
          <p className="text-xs text-foreground leading-relaxed mb-4">
            <strong className="text-foreground font-semibold">AI Insight:</strong> {insight}
          </p>
          <Link
            href={`/chat?context=stock&ticker=${ticker}&name=${encodeURIComponent(name)}&score=${Math.max(0, 100 - riskLevel)}`}
            className="w-full flex items-center justify-center gap-2 bg-primary/10 hover:bg-primary/20 text-primary border border-primary/20 py-2.5 rounded-xl text-xs font-bold transition-colors"
            onClick={(e) => e.stopPropagation()}
          >
            <MessageSquarePlus size={16} /> Tanya AI Detailnya
          </Link>
        </div>
      )}

      {/* Alert Block */}
      {alertMessage && (
        <div className="bg-danger/5 p-3 flex items-center justify-center gap-2 border-t border-danger/10">
          <ShieldAlert size={14} className="text-danger" />
          <p className="text-xs font-semibold text-danger">{alertMessage}</p>
        </div>
      )}
    </div>
  );
}
