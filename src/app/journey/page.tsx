import { Trophy, Shield, TrendingUp, BookOpen, Lock, CheckCircle2, Award, Zap } from "lucide-react";

export default function JourneyPage() {
    const level = 3;
    const points = 1450;
    const pointsToNextLevel = 2000;
    const progress = (points / pointsToNextLevel) * 100;

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

                        <div className="flex gap-4 mb-6 relative z-10">
                            <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center mt-1 outline outline-4 outline-surface z-10">
                                <CheckCircle2 size={12} className="text-white" />
                            </div>
                            <div>
                                <h4 className="font-bold text-sm text-foreground">Understanding "Notasi Khusus"</h4>
                                <p className="text-xs text-foreground-muted mt-1">Learnt what BEI special notations mean for your portfolio risks.</p>
                                <span className="inline-block mt-2 px-2 py-0.5 bg-surface-active text-foreground-muted rounded text-[10px] font-bold">+50 XP</span>
                            </div>
                        </div>

                        <div className="flex gap-4 mb-6 relative z-10">
                            <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center mt-1 outline outline-4 outline-surface z-10">
                                <CheckCircle2 size={12} className="text-white" />
                            </div>
                            <div>
                                <h4 className="font-bold text-sm text-foreground">Spotting Pump & Dump</h4>
                                <p className="text-xs text-foreground-muted mt-1">Identified suspicious volume spikes using Truth Scanner.</p>
                                <span className="inline-block mt-2 px-2 py-0.5 bg-surface-active text-foreground-muted rounded text-[10px] font-bold">+100 XP</span>
                            </div>
                        </div>

                        <div className="flex gap-4 relative z-10 opacity-60">
                            <div className="w-5 h-5 rounded-full bg-surface-hover border-2 border-surface-active flex items-center justify-center mt-1 outline outline-4 outline-surface z-10">
                            </div>
                            <div>
                                <h4 className="font-bold text-sm text-foreground">Mastering "Cash Flow" vs "Net Profit"</h4>
                                <p className="text-xs text-foreground-muted mt-1">Upcoming module based on your BBCA Truth Score analysis.</p>
                                <span className="inline-block mt-2 px-2 py-0.5 border border-primary/30 text-primary rounded text-[10px] font-bold">In Progress</span>
                            </div>
                        </div>

                    </div>
                </section>

            </div>
        </div>
    );
}
