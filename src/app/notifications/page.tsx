import { ShieldAlert, CheckCircle2, MessageSquarePlus, Bell, ChevronLeft } from "lucide-react";
import Link from "next/link";

export default function NotificationsPage() {
    return (
        <div className="flex flex-col min-h-screen bg-background pb-24">
            {/* Header Area */}
            <header className="px-5 pt-8 pb-6 bg-surface border-b border-border shadow-sm sticky top-0 z-10 flex items-center gap-3">
                <Link href="/" className="w-10 h-10 flex items-center justify-center rounded-full bg-surface-hover text-foreground-muted hover:text-foreground transition-colors">
                    <ChevronLeft size={20} />
                </Link>
                <div>
                    <h1 className="text-xl font-bold text-foreground flex items-center gap-2">
                        <Bell size={20} className="text-primary" /> Notifications
                    </h1>
                    <p className="text-xs text-foreground-muted mt-1">You have 2 unread messages</p>
                </div>
            </header>

            <div className="p-5 flex flex-col gap-3">
                {/* Notification Items */}
                <div className="p-4 rounded-2xl bg-danger/5 border border-danger/20 flex gap-4 relative overflow-hidden group hover:bg-danger/10 transition-colors shadow-sm">
                    <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-danger"></div>
                    <div className="w-12 h-12 rounded-full bg-danger/10 text-danger flex items-center justify-center shrink-0">
                        <ShieldAlert size={24} />
                    </div>
                    <div className="flex-1">
                        <div className="flex justify-between items-start mb-1">
                            <h4 className="font-bold text-base text-foreground">High Risk Detection</h4>
                            <span className="text-xs text-foreground-muted font-medium">Just now</span>
                        </div>
                        <p className="text-sm text-foreground-muted leading-relaxed">
                            Unusual pumping activity detected on <strong className="text-foreground">GOTO</strong>. Proceed with caution.
                        </p>
                        <div className="mt-3">
                            <button className="text-xs font-bold text-danger bg-danger/10 px-3 py-1.5 rounded-lg hover:bg-danger/20 transition-colors">Review Alert</button>
                        </div>
                    </div>
                </div>

                <div className="p-4 rounded-2xl bg-surface-active border border-border flex gap-4 group hover:bg-surface-hover transition-colors shadow-sm relative overflow-hidden">
                    <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-primary rounded-l-2xl"></div>
                    <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
                        <CheckCircle2 size={24} />
                    </div>
                    <div className="flex-1">
                        <div className="flex justify-between items-start mb-1">
                            <h4 className="font-bold text-base text-foreground">Portfolio Rebalanced</h4>
                            <span className="text-xs text-foreground-muted font-medium">2 hours ago</span>
                        </div>
                        <p className="text-sm text-foreground-muted leading-relaxed">
                            Your suggested rebalancing action was successfully simulated.
                        </p>
                    </div>
                </div>

                <div className="p-4 rounded-2xl bg-surface border border-border flex gap-4 opacity-60 group shadow-sm">
                    <div className="w-12 h-12 rounded-full bg-surface-active text-foreground-muted flex items-center justify-center shrink-0">
                        <MessageSquarePlus size={24} />
                    </div>
                    <div className="flex-1">
                        <div className="flex justify-between items-start mb-1">
                            <h4 className="font-bold text-base text-foreground">New AI Insights</h4>
                            <span className="text-xs text-foreground-muted font-medium">Yesterday</span>
                        </div>
                        <p className="text-sm text-foreground-muted leading-relaxed">
                            Weekly market summary for banking sector is available.
                        </p>
                    </div>
                </div>

                <div className="mt-6 flex justify-center">
                    <button className="text-sm font-bold text-foreground-muted hover:text-foreground transition-colors px-4 py-2 rounded-full bg-surface-active hover:bg-surface-hover">
                        Mark all as read
                    </button>
                </div>

            </div>
        </div>
    );
}
