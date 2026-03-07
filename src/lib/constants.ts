// ============================================================
// SHARED APP CONSTANTS — single source of truth for demo data
// ============================================================

export const USER = {
    name: "Sherine",
    initial: "S",
    email: "sherine@raksha.ai",
    plan: "PRO MEMBER",
};

export const PORTFOLIO = {
    totalValue: "Rp 150.000.000",
    totalValueRaw: 150_000_000,
    gain: "+Rp 12.450.000 (9,1%)",
    gainRaw: 12_450_000,
    gainPercent: 9.1,
    stocksCount: 5,
    alertsCount: 3,
    protectedPercent: 82,
    riskLevel: "Moderate" as const,
};

export const TRUTH_SCORE = {
    avg: 73, // (92 + 85 + 42) / 3 ≈ 73
    stocks: [
        {
            ticker: "BBCA",
            name: "Bank Central Asia",
            score: 92,
            grade: "A",
            netProfit: "Rp 48,2T",
            cashFlow: "Rp 45,8T",
            alignment: 95,
            status: "No anomalies detected in financial statements",
            riskLevel: "safe",
        },
        {
            ticker: "TLKM",
            name: "Telkom Indonesia",
            score: 85,
            grade: "A",
            netProfit: "Rp 24,5T",
            cashFlow: "Rp 22,1T",
            alignment: 90,
            status: "Consistent revenue, minor debt fluctuations",
            riskLevel: "safe",
        },
        {
            ticker: "GOTO",
            name: "GoTo Gojek Tokopedia",
            score: 42,
            grade: "C",
            netProfit: "-Rp 12,4T",
            cashFlow: "Rp 1,2T",
            alignment: 45,
            status: "Negative profit margins, rapid cash burn",
            riskLevel: "warning",
        },
    ],
};

export const WATCHLIST = [
    {
        ticker: "GOTO",
        name: "GoTo Gojek Tokopedia",
        change: "-4.2%",
        riskLevel: 95,
        riskTag: "HIGH RISK",
        riskClass: "danger",
        statusMessage: "Special Monitoring - High Volatility",
        lastUpdated: "2 min ago",
        alertMessage: "Risk Alert: Protective Recommendation Active",
        insight:
            "GOTO menunjukkan volatilitas sangat tinggi dalam 24 jam terakhir. Sentimen sosial dipenuhi hype yang tidak wajar, sementara rasio profitabilitas menurut laporan keuangan belum sejalan dengan ekspektasi. Pembelian agresif sangat tidak disarankan.",
    },
    {
        ticker: "BUKA",
        name: "Bukalapak.com",
        change: "-1.8%",
        riskLevel: 72,
        riskTag: "REVIEW",
        riskClass: "warning",
        statusMessage: "Under Review - Sentiment Discrepancy",
        lastUpdated: "15 min ago",
        alertMessage: undefined,
        insight:
            "Terdeteksi adanya pergerakan harga anomali meskipun sentimen berita cenderung netral. Sistem RAKSHA sedang mereview potensi aksi institusional vs ritel. Hindari mengambil posisi besar dengan tergesa-gesa.",
    },
    {
        ticker: "BBCA",
        name: "Bank Central Asia",
        change: "+1.2%",
        riskLevel: 12,
        riskTag: "SAFE",
        riskClass: "primary",
        statusMessage: "Clear - Solid Fundamentals",
        lastUpdated: "1 hr ago",
        alertMessage: undefined,
        insight:
            "BCA mempertahankan performa fundamental solid tanpa fluktuasi media sosial yang mencurigakan. Pertumbuhan aset stabil. Profil risiko sangat terkendali dan cocok untuk alokasi porsi utama (Core Portfolio).",
    },
];
