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
          <Link
            href="/notifications"
            className="relative p-2 rounded-full text-foreground-muted hover:bg-surface-hover transition-colors"
          >
            <BellRing size={22} />
            <span className="absolute top-1.5 right-2 w-2 h-2 bg-danger rounded-full border-2 border-surface"></span>
          </Link>
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
            <h2 className="text-3xl font-bold tracking-tight">Rp 150.000.000</h2>
          </div>

          <div className="flex gap-4 relative z-10">
            <div className="flex-1 bg-white/10 rounded-xl p-3 backdrop-blur-sm border border-white/20">
              <p className="text-xs text-primary-light mb-1">Truth Score Avg</p>
              <p className="text-lg font-bold">73/100</p>
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
        <section className="flex gap-3 overflow-x-auto hide-scrollbar -mx-5 px-5 py-2">
          <Link href="/chat" className="flex-1 min-w-[160px] bg-white dark:bg-surface border border-border shadow-md rounded-3xl p-5 flex items-center justify-between hover:border-primary/50 transition-all group shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-emerald-50 dark:bg-primary-light/10 text-emerald-600 dark:text-primary flex items-center justify-center shadow-inner">
                <ShieldAlert size={22} />
              </div>
              <span className="font-bold text-sm text-foreground/80 group-hover:text-primary transition-colors leading-tight">AI Co-<br/>Pilot</span>
            </div>
            <ChevronRight size={16} className="text-foreground-muted" />
          </Link>
          <Link href="/truth" className="flex-1 min-w-[160px] bg-white dark:bg-surface border border-border shadow-md rounded-3xl p-5 flex items-center justify-between hover:border-primary/50 transition-all group shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shadow-inner">
                <TrendingDown size={22} />
              </div>
              <span className="font-bold text-sm text-foreground/80 group-hover:text-primary transition-colors leading-tight">Truth<br/>Scanner</span>
            </div>
            <ChevronRight size={16} className="text-foreground-muted" />
          </Link>
        </section>

        {/* Risk Alerts */}
        <section>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold text-foreground">Active Alerts</h3>
            <Link href="/truth" className="text-xs font-bold text-primary hover:underline">
              See All
            </Link>
          </div>

          <div className="bg-white dark:bg-surface border border-border rounded-3xl p-5 shadow-md flex gap-4 items-start relative overflow-hidden group">
             <div className="absolute top-0 right-0 w-24 h-24 bg-danger/5 rounded-full blur-2xl -mr-12 -mt-12"></div>
            <div className="p-3 bg-danger/10 rounded-2xl shrink-0">
              <ShieldAlert className="text-danger" size={24} />
            </div>
            <div className="flex-1 relative z-10">
              <div className="flex justify-between items-start mb-1">
                <h4 className="font-bold text-base text-foreground">GOTO: High Volatility</h4>
                <span className="text-[10px] font-black px-2.5 py-1 bg-danger/10 text-danger rounded-full border border-danger/10">HIGH</span>
              </div>
              <p className="text-xs text-foreground-muted mb-4 leading-relaxed">
                Social sentiment anomaly detected. Truth Score indicates mismatch with projected earnings.
              </p>
              <Link href="/chat?context=stock&ticker=GOTO&name=GoTo%20Gojek%20Tokopedia&score=42" className="inline-flex px-4 py-2 bg-foreground text-background text-xs font-bold rounded-xl hover:opacity-90 transition-opacity shadow-sm">
                Ask Co-Pilot
              </Link>
            </div>
          </div>
        </section>

        {/* Investor Insights / News */}
        <section>
          <div className="flex justify-between items-center mb-5">
            <h3 className="text-xl font-bold text-foreground tracking-tight">Investor Insights</h3>
            <Link href="/journey" className="text-sm font-bold text-primary hover:underline transition-all">
              See All
            </Link>
          </div>
          
          <div className="flex gap-4 overflow-x-auto hide-scrollbar -mx-5 px-5 mb-2">
            <Link href="/journey" className="min-w-[280px] h-[180px] relative rounded-[32px] overflow-hidden group shrink-0 shadow-lg block">
              <img 
                src="https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&auto=format&fit=crop&q=60" 
                alt="market" 
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-5 w-full">
                <span className="inline-block px-3 py-1 bg-red-500 text-white text-[10px] font-black rounded-lg mb-3 shadow-lg">Security</span>
                <h4 className="font-bold text-base text-white leading-snug line-clamp-2 drop-shadow-md">Waspada Penipuan Investasi Berkedok AI Co-Pilot Palsu</h4>
              </div>
            </Link>

            <Link href="/journey" className="min-w-[280px] h-[180px] relative rounded-[32px] overflow-hidden group shrink-0 shadow-lg block">
              <img 
                src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&auto=format&fit=crop&q=60" 
                alt="security" 
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-5 w-full">
                <span className="inline-block px-3 py-1 bg-emerald-500 text-white text-[10px] font-black rounded-lg mb-3 shadow-lg">Regulation</span>
                <h4 className="font-bold text-base text-white leading-snug line-clamp-2 drop-shadow-md">OJK Blokir 120 Platform Investasi Ilegal Pekan Ini</h4>
              </div>
            </Link>
            
            <Link href="/journey" className="min-w-[280px] h-[180px] relative rounded-[32px] overflow-hidden group shrink-0 shadow-lg block">
              <img 
                src="https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=600&auto=format&fit=crop&q=80" 
                alt="market" 
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-5 w-full">
                <span className="inline-block px-3 py-1 bg-amber-500 text-white text-[10px] font-black rounded-lg mb-3 shadow-lg">Education</span>
                <h4 className="font-bold text-base text-white leading-snug line-clamp-2 drop-shadow-md">Mengenal 'Wash Trading' yang Sedang Marak di Kripto</h4>
              </div>
            </Link>
          </div>
        </section>

        {/* Market Movers / Watchlist */}
        <section>
          <h3 className="text-lg font-bold text-foreground mb-4">Your Watchlist Insights</h3>
          <div className="flex flex-col gap-4">

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

      <style jsx global>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
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
  const logoMap: Record<string, string> = {
    "GOTO": "/images/logos/goto.png",
    "BUKA": "/images/logos/buka.png",
    "BBCA": "/images/logos/bbca.png",
    "TLKM": "/images/logos/tlkm.png",
    "ASII": "/images/logos/asii.png",
    "ARTO": "/images/logos/arto.png",
    "BREN": "/images/logos/bren.png",
  };

  return (
    <div className={`bg-surface rounded-xl border ${riskClass === 'danger' ? 'border-danger/30' : riskClass === 'warning' ? 'border-warning/30' : 'border-primary/30'} shadow-sm overflow-hidden transition-all`}>
      <div
        className="p-4 cursor-pointer hover:bg-surface-hover transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white dark:bg-surface-active flex items-center justify-center border border-border shadow-sm overflow-hidden shrink-0">
              {logoMap[ticker] ? (
                <img src={logoMap[ticker]} alt={ticker} className="w-full h-full object-contain p-1.5" />
              ) : (
                <span className="font-bold text-xs text-foreground">{ticker}</span>
              )}
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
