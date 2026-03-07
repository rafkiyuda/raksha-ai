import { Trophy, Shield, TrendingUp, BookOpen, Lock, CheckCircle2 } from "lucide-react";

export default function JourneyPage() {
    const level = 3;
    const points = 1450;
    const pointsToNextLevel = 2000;
    const progress = (points / pointsToNextLevel) * 100;

    return (
        <div className="flex flex-col min-h-screen bg-background pb-24">
            <header className="px-5 pt-6 pb-4 bg-surface border-b border-border shadow-sm sticky top-0 z-10">
                <h1 className="text-xl font-bold text-foreground flex items-center gap-2 mb-1">
                    Literacy Journey <Trophy className="text-primary w-5 h-5 pointer-events-none" />
                </h1>
                <p className="text-sm text-foreground-muted">Level up your financial wisdom</p>
            </header>

            <div className="p-5 flex flex-col gap-6">
                {/* Level Card */}
                <section className="bg-primary text-white rounded-2xl p-6 shadow-md relative overflow-hidden">
                    <div className="absolute -top-10 -right-10 text-white/10">
                        <Trophy size={140} />
                    </div>
                    <div className="relative z-10">
                        <p className="text-xs text-primary-light mb-1 font-semibold uppercase tracking-wider">Current Status</p>
                        <div className="flex items-baseline gap-2 mb-4">
                            <h2 className="text-2xl font-bold">Smart Appraiser</h2>
                            <span className="text-sm font-bold bg-white/20 px-2 py-0.5 rounded-md">Lvl {level}</span>
                        </div>

                        <div className="mb-2 flex justify-between text-xs font-semibold">
                            <span className="text-white">{points} XP</span>
                            <span className="text-primary-light">{pointsToNextLevel} XP</span>
                        </div>
                        <div className="h-2 w-full bg-black/20 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-white rounded-full"
                                style={{ width: `${progress}%` }}
                            ></div>
                        </div>
                    </div>
                </section>

                {/* Badges */}
                <section>
                    <h3 className="text-base font-bold text-foreground mb-3">Your Badges</h3>
                    <div className="grid grid-cols-3 gap-3">
                        <div className="flex flex-col items-center gap-2 p-3 bg-surface rounded-xl border border-border shadow-sm">
                            <div className="w-10 h-10 bg-primary/10 text-primary-dark dark:text-primary rounded-full flex items-center justify-center">
                                <Shield size={20} />
                            </div>
                            <p className="text-[10px] text-center font-bold text-foreground">First Defense</p>
                        </div>
                        <div className="flex flex-col items-center gap-2 p-3 bg-surface rounded-xl border border-border shadow-sm">
                            <div className="w-10 h-10 bg-primary/10 text-primary-dark dark:text-primary rounded-full flex items-center justify-center">
                                <BookOpen size={20} />
                            </div>
                            <p className="text-[10px] text-center font-bold text-foreground">Avid Reader</p>
                        </div>
                        <div className="flex flex-col items-center gap-2 p-3 bg-surface rounded-xl border border-border shadow-sm opacity-50 grayscale">
                            <div className="w-10 h-10 bg-surface-active rounded-full flex items-center justify-center text-foreground-muted">
                                <TrendingUp size={20} />
                            </div>
                            <p className="text-[10px] text-center font-bold text-foreground-muted">Risk Master</p>
                        </div>
                    </div>
                </section>

                {/* Recent Milestones */}
                <section>
                    <div className="flex justify-between items-center mb-3">
                        <h3 className="text-base font-bold text-foreground">Recent Milestones</h3>
                    </div>

                    <div className="space-y-3">
                        <div className="flex items-center gap-3 p-3 bg-surface rounded-xl border border-border shadow-sm">
                            <div className="p-2 bg-primary/10 rounded-lg text-primary-dark dark:text-primary shrink-0">
                                <CheckCircle2 size={18} />
                            </div>
                            <div className="flex-1">
                                <h4 className="font-bold text-sm text-foreground">Window Dressing Quiz</h4>
                                <p className="text-xs text-foreground-muted">Avoided the Q4 earnings trap</p>
                            </div>
                            <span className="text-xs font-bold text-primary px-2 py-1 bg-primary/10 rounded-md">+50 XP</span>
                        </div>

                        <div className="flex items-center gap-3 p-3 bg-surface rounded-xl border border-border shadow-sm">
                            <div className="p-2 bg-primary/10 rounded-lg text-primary-dark dark:text-primary shrink-0">
                                <CheckCircle2 size={18} />
                            </div>
                            <div className="flex-1">
                                <h4 className="font-bold text-sm text-foreground">Truth Score Deep Dive</h4>
                                <p className="text-xs text-foreground-muted">Read 'Negative Equity' explainer</p>
                            </div>
                            <span className="text-xs font-bold text-primary px-2 py-1 bg-primary/10 rounded-md">+25 XP</span>
                        </div>

                        <div className="flex items-center gap-3 p-3 bg-surface rounded-xl border border-border shadow-sm opacity-60">
                            <div className="p-2 bg-surface-active rounded-lg text-foreground-muted shrink-0">
                                <Lock size={18} />
                            </div>
                            <div className="flex-1">
                                <h4 className="font-bold text-sm text-foreground">Diversification Mastery</h4>
                                <p className="text-xs text-foreground-muted">Rebalance portfolio safely</p>
                            </div>
                            <span className="text-xs font-bold text-foreground-muted px-2 py-1 bg-surface-active rounded-md">100 XP</span>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}
