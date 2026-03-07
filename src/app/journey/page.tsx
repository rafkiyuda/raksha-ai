"use client";

import { useState } from "react";
import { Trophy, Shield, BookOpen, Lock, CheckCircle2, Award, Zap, ChevronRight, X, PlayCircle, Star, Target } from "lucide-react";

interface Lesson {
    id: number;
    title: string;
    description: string;
    xpReward: number;
    status: string;
    content: string;
    quiz: {
        question: string;
        options: string[];
        correctAnswer: number;
        explanation: string;
    };
}

export default function JourneyPage() {
    const [level, setLevel] = useState(3);
    const [points, setPoints] = useState(1450);
    const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
    const [lessonStep, setLessonStep] = useState<'intro' | 'reading' | 'quiz' | 'completed'>('intro');
    const [quizAnswer, setQuizAnswer] = useState<number | null>(null);
    const [isQuizSubmitted, setIsQuizSubmitted] = useState(false);
    const [completedIds, setCompletedIds] = useState<number[]>([1, 2]);

    const pointsToNextLevel = 2000;
    const progress = (points / pointsToNextLevel) * 100;

    const allLessons: Lesson[] = [
        {
            id: 1, xpReward: 50,
            title: 'Memahami "Notasi Khusus" BEI',
            description: 'Apa arti notasi E, FZ, dan lainnya di papan saham IDX?',
            status: 'completed',
            content: `Bursa Efek Indonesia (BEI) menggunakan notasi khusus untuk saham-saham tertentu agar investor waspada.\n\nE — Perusahaan tidak menyampaikan laporan keuangan tepat waktu.\nFZ — Saham berada dalam pembekuan efek (frozen).\nX — Saham sedang dalam suspend perdagangan.\nS — Saham terkena penghentian sementara (suspensi) karena aksi korporasi besar.\n\nMemahami notasi ini adalah lini pertama pertahanan investor dari saham bermasalah.`,
            quiz: { question: 'Apa arti notasi "E" pada papan saham BEI?', options: ['Emiten terbesar di Indonesia', 'Laporan keuangan tidak disampaikan tepat waktu', 'Saham dalam fase ekspansi', 'Efek syariah terdaftar'], correctAnswer: 1, explanation: 'Notasi E berarti emiten gagal menyampaikan laporan keuangan tepat waktu, tanda awal potensi masalah.' }
        },
        {
            id: 2, xpReward: 100,
            title: 'Mengenali Pola Pump & Dump',
            description: 'Bagaimana volume lonjakan bisa menjadi sinyal bahaya?',
            status: 'completed',
            content: `Pump & Dump adalah skema manipulasi harga saham yang sering terjadi di pasar saham dengan likuiditas rendah.\n\nFase Pump: Manipulator membeli saham besar-besaran untuk menaikkan harga, lalu menyebarkan rumor positif.\n\nFase Dump: Setelah investor ritel berbondong masuk (FOMO), manipulator menjual semua kepemilikan dengan profit besar, harga saham pun jatuh.\n\nSinyal Waspada: Volume perdagangan naik 3–5x rata-rata dalam waktu singkat tanpa berita fundamental yang jelas.`,
            quiz: { question: 'Apa sinyal utama potensi Pump & Dump yang harus diwaspadai?', options: ['Peningkatan laba bersih secara konsisten', 'Volume perdagangan naik drastis tanpa berita fundamental', 'Saham masuk indeks LQ45', 'Dividen meningkat setiap tahun'], correctAnswer: 1, explanation: 'Volume lonjakan tanpa katalis fundamental yang jelas adalah sinyal klasik manipulasi harga.' }
        },
        {
            id: 3, xpReward: 150,
            title: 'Cash Flow vs Net Profit',
            description: 'Kenapa perusahaan laba tapi bisa bangkrut? Pelajari bedanya.',
            status: 'in_progress',
            content: `Banyak investor pemula terjebak melihat Net Profit (Laba Bersih) yang meroket, lalu buru-buru membeli sahamnya. Padahal, ada metrik yang lebih krusial: Operating Cash Flow (Arus Kas Operasi).\n\nKenapa ini penting?\nNet Profit bisa dimanipulasi secara akuntansi. Tapi Cash Flow adalah uang tunai riil yang masuk ke rekening bank perusahaan.\n\nJika Net Profit positif tapi Operating Cash Flow negatif berulang kali, artinya perusahaan kesulitan menagih utang pelanggan. Ingat: Cash is King! Perusahaan bangkrut bukan karena tidak cetak laba, tapi karena kehabisan uang tunai.`,
            quiz: { question: 'Perusahaan mencetak Laba Bersih Rp 100M tapi Arus Kas Operasi minus Rp 50M. Apa indikasi terkuatnya?', options: ['Perusahaan sangat sehat karena labanya besar.', 'Perusahaan melakukan banyak investasi.', 'Penjualan tinggi tapi pelanggan belum membayar (banyak piutang).', 'Perusahaan siap membagikan dividen besar.'], correctAnswer: 2, explanation: 'Laba dicatat saat transaksi terjadi meski uang belum diterima. Arus kas negatif artinya uang riil belum masuk perusahaan.' }
        },
        {
            id: 4, xpReward: 150,
            title: 'Membaca Debt-to-Equity Ratio (DER)',
            description: 'Berapa banyak utang yang aman untuk sebuah perusahaan?',
            status: 'locked',
            content: `Debt-to-Equity Ratio (DER) mengukur seberapa besar perusahaan bergantung pada utang dibanding modal sendiri.\n\nRumus: DER = Total Utang / Total Ekuitas\n\nCara Baca:\n- DER < 1x = Lebih banyak modal sendiri. Relatif aman.\n- DER 1-2x = Wajar, tergantung sektornya.\n- DER > 2x = Utang dominan. Berisiko, terutama saat suku bunga naik.\n\nPerhatikan Sektor: Bank dan infrastruktur wajar memiliki DER tinggi. Tapi untuk ritel atau teknologi, DER tinggi adalah sinyal bahaya.`,
            quiz: { question: 'Perusahaan ritel memiliki DER 3.5x. Bagaimana penilaian Anda?', options: ['Sangat sehat, utang berarti ekspansi bisnis', 'Normal untuk semua jenis perusahaan', 'Berisiko tinggi, utang terlalu besar bagi sektor ritel', 'Tidak ada hubungannya dengan risiko investasi'], correctAnswer: 2, explanation: 'Sektor ritel idealnya memiliki DER rendah. DER 3.5x sangat tinggi dan meningkatkan risiko gagal bayar.' }
        },
        {
            id: 5, xpReward: 200,
            title: 'Price-to-Earnings (PER): Mahal atau Murah?',
            description: 'Apakah saham ini wajar dihargai sesuai labanya?',
            status: 'locked',
            content: `Price-to-Earnings Ratio (PER) adalah cara paling populer untuk menilai apakah harga saham wajar.\n\nRumus: PER = Harga Saham / Laba Per Saham (EPS)\n\nCara Baca:\n- PER rendah (< 10x) = Saham murah, tapi cek kenapa — bisa jadi ada masalah (value trap).\n- PER wajar (10-25x) = Normal untuk perusahaan mature.\n- PER tinggi (> 30x) = Pasar berharap pertumbuhan tinggi. Beresiko kalau harapan tidak terpenuhi.\n\nTrap yang sering terjadi: Investor membeli saham PER rendah dikira murah, padahal earnings-nya sedang turun.`,
            quiz: { question: 'Saham A memiliki PER 5x, jauh di bawah rata-rata industri 20x. Apa yang sebaiknya dilakukan?', options: ['Langsung beli, pasti murah dan bagus', 'Investigasi kenapa PER-nya sangat rendah sebelum membeli', 'Hindari mutlak, PER rendah selalu tanda masalah', 'PER tidak penting untuk diperhatikan'], correctAnswer: 1, explanation: 'PER rendah bisa jadi value opportunity, tapi bisa juga "value trap". Selalu investigasi penyebabnya terlebih dahulu.' }
        },
        {
            id: 6, xpReward: 200,
            title: 'Strategi Diversifikasi Portofolio',
            description: 'Jangan taruh semua telur di satu keranjang — tapi seberapa banyak?',
            status: 'locked',
            content: `Diversifikasi adalah cara mengurangi risiko dengan menyebarkan investasi ke berbagai aset atau sektor.\n\nAturan Dasar:\n- Jangan investasikan lebih dari 20% portofolio di satu saham.\n- Sebar ke minimal 3-5 sektor berbeda (bank, consumer goods, energi, dll).\n- Pertimbangkan diversifikasi aset: saham, obligasi, reksa dana.\n\nDiversifikasi Berlebihan juga Berbahaya: 15-20 saham sudah cukup untuk mengurangi unsystematic risk secara signifikan. Lebih dari itu, manfaat menurun dramatis.\n\nPilih aset yang tidak bergerak searah (korelasi rendah) agar saling menyeimbangkan.`,
            quiz: { question: 'Berapa jumlah saham yang ideal untuk diversifikasi efektif?', options: ['1-3 saham saja agar bisa fokus', '5-10 saham', '15-20 saham', 'Lebih dari 50 saham'], correctAnswer: 2, explanation: 'Penelitian menunjukkan 15-20 saham sudah cukup mengurangi risiko spesifik. Lebih dari itu, manfaat diversifikasi menurun dramatis.' }
        },
        {
            id: 7, xpReward: 250,
            title: 'Red Flags di Laporan Keuangan',
            description: 'Kenali tanda bahaya sebelum terlambat.',
            status: 'locked',
            content: `Laporan keuangan quarterly (Q) adalah jendela terpenting untuk menilai kesehatan perusahaan. Berikut red flags yang harus dicermati:\n\n1. Penurunan Gross Margin konsisten — daya saing menurun atau biaya produksi membengkak.\n\n2. Piutang tumbuh lebih cepat dari revenue — tanda perusahaan "memaksa" penjualan kredit.\n\n3. Beban bunga > 30% operating profit — utang sudah di level berbahaya.\n\n4. Auditor memberikan Qualified Opinion — ini sinyal paling serius, auditor meragukan kewajaran laporan.\n\n5. Pergantian auditor mendadak sebelum laporan tahunan dirilis.`,
            quiz: { question: 'Mana dari berikut ini yang merupakan red flag paling serius dari laporan keuangan?', options: ['Revenue tumbuh 10% per tahun', 'Auditor memberikan Qualified Opinion pada laporan tahunan', 'Perusahaan menambah kapasitas produksi', 'Dividen naik 5% dibanding tahun lalu'], correctAnswer: 1, explanation: 'Qualified Opinion dari auditor berarti ada ketidakwajaran material yang tidak bisa dikonfirmasi — ini sinyal bahaya tertinggi.' }
        },
        {
            id: 8, xpReward: 300,
            title: 'Psikologi Investasi: Hindari Bias Kognitif',
            description: 'Musuh terbesar investor bukan pasar, tapi diri sendiri.',
            status: 'locked',
            content: `Bias kognitif adalah jebakan mental yang membuat keputusan investasi menjadi tidak rasional.\n\n1. FOMO (Fear of Missing Out): Membeli saham karena harganya sudah naik dan takut ketinggalan.\n\n2. Loss Aversion: Menahan saham yang sudah rugi besar karena tidak mau merealisasi kerugian.\n\n3. Confirmation Bias: Hanya mencari informasi yang mendukung opini sendiri.\n\n4. Overconfidence: Merasa paling tahu setelah beberapa kali menang besar.\n\nSolusi: Buat Investment Thesis tertulis sebelum membeli, tentukan target harga dan stop loss di awal, dan review berkala dengan data objektif.`,
            quiz: { question: 'Investor mempertahankan saham rugi 40% karena yakin "pasti naik lagi" tanpa data baru. Bias apa ini?', options: ['FOMO (Fear of Missing Out)', 'Overconfidence Bias', 'Loss Aversion', 'Anchoring Bias'], correctAnswer: 2, explanation: 'Loss Aversion — kita secara psikologis lebih takut pada kerugian daripada kesenangan profit, membuat kita menahan aset rugi terlalu lama.' }
        },
    ];

    // Derive status based on completedIds — each lesson unlocks the next
    const lessons = allLessons.map((lesson, idx) => ({
        ...lesson,
        status: completedIds.includes(lesson.id)
            ? 'completed'
            : idx > 0 && !completedIds.includes(allLessons[idx - 1].id)
                ? 'locked'
                : lesson.status,
    }));

    const handleLessonComplete = () => {
        if (!selectedLesson) return;
        setCompletedIds(prev => [...prev, selectedLesson.id]);
        setPoints(prev => Math.min(prev + selectedLesson.xpReward, pointsToNextLevel));
        if (points + selectedLesson.xpReward >= pointsToNextLevel) {
            setLevel(prev => prev + 1);
        }
        setLessonStep('completed');
    };

    const resetModal = () => {
        setSelectedLesson(null);
        setLessonStep('intro');
        setQuizAnswer(null);
        setIsQuizSubmitted(false);
    };

    return (
        <div className="flex flex-col min-h-screen bg-background pb-24">
            {/* Header Area */}
            <header className="px-5 pt-8 pb-6 bg-surface border-b border-border shadow-sm sticky top-0 z-10">
                <h1 className="text-xl font-bold text-foreground">Literacy Journey</h1>
                <p className="text-xs text-foreground-muted mt-1">Track your progress in mastering financial risk.</p>
            </header>

            <div className="p-5 flex flex-col gap-6">

                {/* Main Level Progress Card */}
                <section className="bg-surface rounded-2xl border border-primary/30 p-5 shadow-sm overflow-hidden relative">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>

                    <div className="flex justify-between items-center mb-6 relative z-10">
                        <div className="flex items-center gap-4">
                            <div className="w-14 h-14 rounded-full bg-primary/10 border-2 border-primary flex items-center justify-center text-primary relative shadow-[0_0_15px_rgba(var(--color-primary),0.2)]">
                                <Trophy size={24} />
                                <div className="absolute -bottom-2 -right-2 bg-primary text-white text-[10px] font-bold w-6 h-6 rounded-full flex items-center justify-center border-2 border-surface">
                                    {level}
                                </div>
                            </div>
                            <div>
                                <h2 className="text-sm font-bold text-foreground-muted uppercase tracking-wider mb-0.5">Current Rank</h2>
                                <p className="text-lg font-bold text-foreground">Risk Sentinel</p>
                            </div>
                        </div>
                    </div>

                    <div className="relative z-10">
                        <div className="flex justify-between text-xs mb-2">
                            <span className="text-foreground-muted font-medium">XP Progress</span>
                            <span className="font-bold text-primary">{points} / {pointsToNextLevel} XP</span>
                        </div>
                        <div className="h-2 w-full bg-surface-active rounded-full overflow-hidden">
                            <div
                                className="h-full bg-primary rounded-full transition-all duration-1000 ease-out"
                                style={{ width: `${progress}%` }}
                            ></div>
                        </div>
                        <p className="text-[10px] text-foreground-muted mt-2 text-right">
                            Earn <strong className="text-foreground">{pointsToNextLevel - points} XP</strong> more to reach Level {level + 1}
                        </p>
                    </div>
                </section>

                {/* Badges / Achievements */}
                <section>
                    <h3 className="text-sm font-bold text-foreground-muted uppercase tracking-wider mb-3 px-1">Recent Achievements</h3>
                    <div className="grid grid-cols-2 gap-3">

                        <div className="bg-surface rounded-xl border border-border p-4 shadow-sm flex flex-col items-center justify-center text-center gap-2">
                            <div className="w-12 h-12 rounded-full bg-warning/10 text-warning flex items-center justify-center mb-1">
                                <Shield size={20} />
                            </div>
                            <h4 className="font-bold text-sm text-foreground">First Defense</h4>
                            <p className="text-[10px] text-foreground-muted">Ignored a High Risk Alert recommendation successfully.</p>
                        </div>

                        <div className="bg-surface rounded-xl border border-border p-4 shadow-sm flex flex-col items-center justify-center text-center gap-2">
                            <div className="w-12 h-12 rounded-full bg-blue-500/10 text-blue-500 flex items-center justify-center mb-1">
                                <BookOpen size={20} />
                            </div>
                            <h4 className="font-bold text-sm text-foreground">Avid Reader</h4>
                            <p className="text-[10px] text-foreground-muted">Read 5 AI Explainer pop-ups on financial terms.</p>
                        </div>

                        <div className="bg-surface rounded-xl border border-border p-4 shadow-sm flex flex-col items-center justify-center text-center gap-2 opacity-60 grayscale filter">
                            <div className="w-12 h-12 rounded-full bg-surface-active text-foreground-muted flex items-center justify-center mb-1 relative">
                                <Zap size={20} />
                                <Lock size={12} className="absolute bottom-0 right-0" />
                            </div>
                            <h4 className="font-bold text-sm text-foreground">Trend Setter</h4>
                            <p className="text-[10px] text-foreground-muted">Identify 3 pumping anomalies before they crash.</p>
                        </div>

                        <div className="bg-surface rounded-xl border border-border p-4 shadow-sm flex flex-col items-center justify-center text-center gap-2 opacity-60 grayscale filter">
                            <div className="w-12 h-12 rounded-full bg-surface-active text-foreground-muted flex items-center justify-center mb-1 relative">
                                <Award size={20} />
                                <Lock size={12} className="absolute bottom-0 right-0" />
                            </div>
                            <h4 className="font-bold text-sm text-foreground">Master Analyst</h4>
                            <p className="text-[10px] text-foreground-muted">Reach Level 10 and unlock Autopilot simulations.</p>
                        </div>

                    </div>
                </section>

                {/* Learning History / Steps */}
                <section>
                    <h3 className="text-sm font-bold text-foreground-muted uppercase tracking-wider mb-3 px-1">Learning Path</h3>
                    <div className="bg-surface rounded-xl border border-border shadow-sm p-5 relative">
                        <div className="absolute left-7 top-8 bottom-8 w-px bg-surface-active"></div>

                        {/* Dynamic Lessons */}
                        <div className="flex flex-col gap-4">

                            {lessons.map((lesson) => (
                                <div
                                    key={lesson.id}
                                    onClick={() => {
                                        if (lesson.status !== 'locked') setSelectedLesson(lesson);
                                    }}
                                    className={`flex gap-4 relative z-10 transition-all ${lesson.status === 'locked' ? 'opacity-50 grayscale cursor-not-allowed' : 'cursor-pointer hover:bg-surface-hover p-2 -ml-2 rounded-xl group'}`}
                                >
                                    <div className={`w-6 h-6 rounded-full flex items-center justify-center mt-1 outline outline-4 outline-surface z-10 shrink-0 ${lesson.status === 'completed' ? 'bg-primary text-white' : lesson.status === 'in_progress' ? 'bg-primary/20 border-2 border-primary text-primary animate-pulse' : 'bg-surface-hover border-2 border-surface-active text-foreground-muted'}`}>
                                        {lesson.status === 'completed' && <CheckCircle2 size={14} />}
                                        {lesson.status === 'in_progress' && <PlayCircle size={14} />}
                                        {lesson.status === 'locked' && <Lock size={12} />}
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="font-bold text-sm text-foreground group-hover:text-primary transition-colors">{lesson.title}</h4>
                                        <p className="text-xs text-foreground-muted mt-1 leading-relaxed">{lesson.description}</p>
                                        <div className="flex items-center gap-2 mt-2">
                                            <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold ${lesson.status === 'completed' ? 'bg-surface-active text-foreground-muted' : 'border border-primary/30 text-primary bg-primary/5'}`}>
                                                {lesson.status === 'completed' ? 'Selesai' : 'Mulai Pelajaran'}
                                            </span>
                                            <span className="flex items-center gap-1 text-[10px] font-bold text-warning bg-warning/10 px-2 py-0.5 rounded">
                                                <Star size={10} className="fill-warning" /> +{lesson.xpReward} XP
                                            </span>
                                        </div>
                                    </div>
                                    <ChevronRight size={18} className="text-foreground-muted self-center opacity-0 group-hover:opacity-100 transition-opacity -ml-4" />
                                </div>
                            ))}

                        </div>

                    </div>
                </section>

            </div>

            {/* Interactive Lesson Modal */}
            {selectedLesson && (
                <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/80 backdrop-blur-sm animate-in fade-in duration-300">
                    <div className="bg-surface w-full sm:w-[500px] h-[92vh] sm:h-[620px] rounded-t-3xl sm:rounded-3xl shadow-2xl border border-border overflow-hidden flex flex-col animate-in slide-in-from-bottom-10 sm:zoom-in-95 duration-500">

                        {/* Modal Header */}
                        <div className="p-4 border-b border-border/50 flex justify-between items-center bg-surface sticky top-0 z-20">
                            <div className="flex items-center gap-2">
                                <div className="p-1.5 bg-primary/10 rounded-lg text-primary">
                                    <BookOpen size={18} />
                                </div>
                                <h3 className="text-xs font-bold text-foreground-muted uppercase tracking-wider">Literacy Module</h3>
                            </div>
                            <button onClick={resetModal} className="p-2 bg-surface-active hover:bg-surface-hover rounded-full text-foreground-muted transition-colors">
                                <X size={20} />
                            </button>
                        </div>

                        {/* Modal Body — scrollable content only */}
                        <div className="p-6 overflow-y-auto flex-1 hide-scrollbar">

                            {/* Step: Intro */}
                            {lessonStep === 'intro' && (
                                <div className="flex flex-col items-center text-center pt-4 animate-in fade-in slide-in-from-right-4 duration-300">
                                    <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-6 ring-8 ring-primary/5">
                                        <Target size={48} />
                                    </div>
                                    <h2 className="text-2xl font-extrabold text-foreground mb-3">{selectedLesson.title}</h2>
                                    <p className="text-sm text-foreground-muted mb-6 max-w-xs">{selectedLesson.description}</p>
                                    <div className="inline-flex items-center gap-2 bg-warning/10 text-warning px-4 py-2 rounded-xl font-bold border border-warning/20">
                                        <Star size={18} className="fill-warning" />
                                        Reward: +{selectedLesson.xpReward} XP
                                    </div>
                                </div>
                            )}

                            {/* Step: Reading */}
                            {lessonStep === 'reading' && (
                                <div className="animate-in fade-in slide-in-from-right-4 duration-300">
                                    <h2 className="text-xl font-extrabold text-foreground mb-4 leading-tight">{selectedLesson.title}</h2>
                                    <div className="text-sm text-foreground-muted leading-relaxed whitespace-pre-line">
                                        {selectedLesson.content}
                                    </div>
                                </div>
                            )}

                            {/* Step: Quiz */}
                            {lessonStep === 'quiz' && (
                                <div className="flex flex-col h-full animate-in fade-in slide-in-from-right-4 duration-300">
                                    <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-3 py-1 rounded-lg font-bold text-xs uppercase tracking-wider mb-4 w-max">
                                        <Zap size={14} className="fill-primary" /> Kuis Pemahaman
                                    </div>
                                    <h3 className="text-lg font-bold text-foreground mb-6 leading-relaxed">
                                        {selectedLesson.quiz.question}
                                    </h3>

                                    <div className="flex flex-col gap-3 flex-1">
                                        {selectedLesson.quiz.options.map((opt: string, idx: number) => {
                                            const isSelected = quizAnswer === idx;
                                            const isCorrect = idx === selectedLesson.quiz.correctAnswer;

                                            let btnClass = "p-4 rounded-xl border-2 text-left text-sm font-medium transition-all outline-none focus:ring-2 ";

                                            if (!isQuizSubmitted) {
                                                btnClass += isSelected ? "border-primary bg-primary/5 text-primary ring-primary/30" : "border-border bg-surface hover:border-primary/50 text-foreground";
                                            } else {
                                                if (isCorrect) {
                                                    btnClass += "border-green-500 bg-green-500/10 text-green-600 dark:text-green-400";
                                                } else if (isSelected && !isCorrect) {
                                                    btnClass += "border-danger bg-danger/10 text-danger";
                                                } else {
                                                    btnClass += "border-border bg-surface opacity-50";
                                                }
                                            }

                                            return (
                                                <button
                                                    key={idx}
                                                    onClick={() => !isQuizSubmitted && setQuizAnswer(idx)}
                                                    disabled={isQuizSubmitted}
                                                    className={btnClass}
                                                >
                                                    {opt}
                                                </button>
                                            );
                                        })}
                                    </div>

                                    {/* Quiz Result Feedback */}
                                    {isQuizSubmitted && (
                                        <div className={`mt-6 p-4 rounded-xl border ${quizAnswer === selectedLesson.quiz.correctAnswer ? 'bg-green-500/10 border-green-500/30 text-green-700 dark:text-green-300' : 'bg-danger/10 border-danger/30 text-danger'}`}>
                                            <p className="font-bold text-sm mb-1">
                                                {quizAnswer === selectedLesson.quiz.correctAnswer ? 'Jawaban Anda Benar! 🎉' : 'Oopss, Kurang Tepat! 😅'}
                                            </p>
                                            <p className="text-xs opacity-90 leading-relaxed">{selectedLesson.quiz.explanation}</p>
                                        </div>
                                    )}
                                </div>
                            )}


                            {/* Step: Completed */}
                            {lessonStep === 'completed' && (
                                <div className="flex flex-col h-full items-center justify-center text-center animate-in zoom-in-95 duration-500">
                                    <div className="relative mb-6">
                                        <div className="absolute inset-0 bg-warning/20 blur-xl rounded-full animate-pulse"></div>
                                        <div className="w-32 h-32 bg-gradient-to-br from-warning to-orange-500 rounded-full flex items-center justify-center text-white shadow-2xl relative z-10 border-4 border-surface">
                                            <Trophy size={56} className="drop-shadow-lg" />
                                        </div>
                                    </div>
                                    <h2 className="text-3xl font-extrabold text-foreground mb-2">Luar Biasa!</h2>
                                    <p className="text-foreground-muted text-sm max-w-xs mb-6">Anda telah menyelesaikan modul &quot;{selectedLesson.title}&quot; dan mendapatkan poin XP.</p>

                                    <div className="flex items-center gap-3 bg-surface-active border border-border px-5 py-3 rounded-2xl">
                                        <Star size={24} className="fill-warning text-warning" />
                                        <div className="text-left flex flex-col">
                                            <span className="text-xs font-bold text-foreground-muted uppercase tracking-wider">Reward Earned</span>
                                            <span className="text-xl font-black text-warning">+{selectedLesson.xpReward} XP</span>
                                        </div>
                                    </div>
                                </div>
                            )}


                        </div>

                        {/* Pinned Footer */}
                        <div className="px-6 py-4 border-t border-border/50 bg-surface shrink-0">
                            {lessonStep === 'intro' && (
                                <button
                                    onClick={() => setLessonStep('reading')}
                                    className="w-full py-4 rounded-xl bg-primary hover:bg-primary-dark text-white font-bold transition-transform active:scale-95 flex items-center justify-center gap-2 shadow-lg shadow-primary/20"
                                >
                                    Mulai Membaca <ChevronRight size={18} />
                                </button>
                            )}
                            {lessonStep === 'reading' && (
                                <button
                                    onClick={() => setLessonStep('quiz')}
                                    className="w-full py-4 rounded-xl bg-surface-active border border-border hover:border-primary/50 text-foreground font-bold transition-all hover:bg-primary/5 hover:text-primary active:scale-95 flex items-center justify-center gap-2"
                                >
                                    Saya Sudah Paham. Lanjut Kuis! <PlayCircle size={18} />
                                </button>
                            )}
                            {lessonStep === 'quiz' && (
                                <>
                                    {!isQuizSubmitted ? (
                                        <button
                                            onClick={() => setIsQuizSubmitted(true)}
                                            disabled={quizAnswer === null}
                                            className="w-full py-4 rounded-xl bg-primary hover:bg-primary-dark disabled:bg-surface-active disabled:text-foreground-muted disabled:opacity-50 text-white font-bold transition-transform active:scale-95 disabled:active:scale-100 shadow-lg"
                                        >
                                            Jawab
                                        </button>
                                    ) : (
                                        <button
                                            onClick={() => {
                                                if (quizAnswer === selectedLesson.quiz.correctAnswer) {
                                                    handleLessonComplete();
                                                } else {
                                                    setIsQuizSubmitted(false);
                                                    setQuizAnswer(null);
                                                }
                                            }}
                                            className="w-full py-4 rounded-xl bg-foreground hover:bg-foreground/90 text-background font-bold transition-transform active:scale-95 shadow-lg flex items-center justify-center gap-2"
                                        >
                                            {quizAnswer === selectedLesson.quiz.correctAnswer ? "Klaim XP Saya 🏆" : "Coba Lagi 🔄"}
                                        </button>
                                    )}
                                </>
                            )}
                            {lessonStep === 'completed' && (
                                <button
                                    onClick={resetModal}
                                    className="w-full py-4 rounded-xl bg-primary hover:bg-primary-dark text-white font-bold transition-transform active:scale-95 shadow-lg shadow-primary/20"
                                >
                                    Kembali ke Journey
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
}
