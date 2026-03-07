"use client";

import { useState, useRef, useEffect } from "react";
import { Send, Bot, User, ShieldCheck, ToggleLeft, ToggleRight, Trophy, Shield, BookOpen, TrendingUp, CheckCircle2, Lock } from "lucide-react";

type Message = {
    id: string;
    role: "user" | "assistant";
    content: string;
};

export default function CoPilotPage() {
    const [activeTab, setActiveTab] = useState<"chat" | "journey">("chat");

    return (
        <div className="flex flex-col h-[calc(100dvh-5rem)] bg-background">
            {/* Top Sub-Navigation */}
            <header className="px-5 pt-6 pb-2 border-b border-border bg-surface shrink-0 sticky top-0 z-10">
                <div className="flex items-center justify-between mb-4">
                    <div>
                        <h1 className="font-bold text-xl text-foreground flex items-center gap-2">
                            Co-Pilot <Bot size={20} className="text-primary" />
                        </h1>
                        <p className="text-xs text-foreground-muted mt-0.5">Your AI financial assistant & progress</p>
                    </div>
                </div>

                <div className="flex bg-surface-active rounded-lg p-1">
                    <button
                        onClick={() => setActiveTab("chat")}
                        className={`flex-1 flex justify-center items-center gap-2 py-2 text-sm font-bold rounded-md transition-colors ${activeTab === "chat" ? "bg-surface shadow-sm text-foreground" : "text-foreground-muted hover:text-foreground"}`}
                    >
                        <Bot size={16} /> Chat
                    </button>
                    <button
                        onClick={() => setActiveTab("journey")}
                        className={`flex-1 flex justify-center items-center gap-2 py-2 text-sm font-bold rounded-md transition-colors ${activeTab === "journey" ? "bg-surface shadow-sm text-foreground" : "text-foreground-muted hover:text-foreground"}`}
                    >
                        <Trophy size={16} /> Journey
                    </button>
                </div>
            </header>

            {activeTab === "chat" ? <ChatComponent /> : <JourneyComponent />}
        </div>
    );
}

// ---------------------------
// Chat Component
// ---------------------------
function ChatComponent() {
    const [messages, setMessages] = useState<Message[]>([
        {
            id: "1",
            role: "assistant",
            content: "Halo! Saya RAKSHA AI, Co-Pilot finansialmu. Hindari FOMO, dan mari kita amankan portofoliomu. Ada emiten atau strategi yang ingin dibahas?"
        }
    ]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isAutopilot, setIsAutopilot] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isLoading]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;

        const userMessage: Message = { id: Date.now().toString(), role: "user", content: input };
        setMessages((prev) => [...prev, userMessage]);
        setInput("");
        setIsLoading(true);

        try {
            const response = await fetch("/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    messages: [...messages, userMessage],
                    mode: isAutopilot ? "autopilot" : "copilot"
                })
            });

            const data = await response.json();
            if (data.error) throw new Error(data.error);

            setMessages((prev) => [
                ...prev,
                { id: (Date.now() + 1).toString(), role: "assistant", content: data.content }
            ]);
        } catch (error) {
            console.error("Chat error:", error);
            setMessages((prev) => [
                ...prev,
                { id: (Date.now() + 1).toString(), role: "assistant", content: "Maaf, sistem AI sedang sibuk. Coba lagi sebentar." }
            ]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col h-full">
            {/* Mode Toggle Banner */}
            <div className="px-5 py-3 border-b border-border bg-surface/50 shrink-0 flex items-center justify-between">
                <div>
                    <h2 className="text-xs font-bold text-foreground flex items-center gap-1">Mode: {isAutopilot ? "Autopilot Lite" : "Co-Pilot"} <ShieldCheck size={12} className="text-primary" /></h2>
                    <p className="text-[10px] text-foreground-muted">{isAutopilot ? "Simulation mode enabled" : "Actively analyzing risks"}</p>
                </div>
                <button
                    onClick={() => setIsAutopilot(!isAutopilot)}
                    className="flex flex-col items-center justify-center shrink-0 ml-2"
                >
                    {isAutopilot ? (
                        <ToggleRight size={28} className="text-primary" />
                    ) : (
                        <ToggleLeft size={28} className="text-foreground-muted" />
                    )}
                </button>
            </div>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto p-5 space-y-5 bg-background">
                {messages.map((m) => (
                    <div key={m.id} className={`flex gap-3 ${m.role === "user" ? "flex-row-reverse" : ""}`}>
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 shadow-sm ${m.role === "assistant"
                            ? "bg-primary text-white"
                            : "bg-surface border border-border text-foreground"
                            }`}>
                            {m.role === "assistant" ? <Bot size={14} /> : <User size={14} />}
                        </div>

                        <div className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-sm ${m.role === "user"
                            ? "bg-primary text-white rounded-tr-md"
                            : "bg-surface border border-border text-foreground rounded-tl-md"
                            }`}>
                            {m.content}
                        </div>
                    </div>
                ))}

                {isLoading && (
                    <div className="flex gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center shrink-0 shadow-sm">
                            <Bot size={14} />
                        </div>
                        <div className="bg-surface border border-border rounded-2xl rounded-tl-md px-5 py-4 flex gap-1.5 items-center shadow-sm">
                            <div className="w-1.5 h-1.5 bg-primary/50 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                            <div className="w-1.5 h-1.5 bg-primary/50 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                            <div className="w-1.5 h-1.5 bg-primary/50 rounded-full animate-bounce"></div>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 bg-surface border-t border-border shrink-0">
                <form onSubmit={handleSubmit} className="flex gap-2">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder={isAutopilot ? "Ketik simulasi pasar..." : "Tulis pertanyaanmu di sini..."}
                        className="flex-1 bg-background border border-border focus:border-primary focus:ring-1 focus:ring-primary rounded-xl px-4 py-3 text-sm outline-none transition-all placeholder:text-foreground-muted"
                        disabled={isLoading}
                    />
                    <button
                        type="submit"
                        disabled={!input.trim() || isLoading}
                        className="w-12 h-12 flex flex-col items-center justify-center bg-primary text-white rounded-xl hover:bg-primary-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
                    >
                        <Send size={18} className={input.trim() ? "translate-x-0.5 -translate-y-0.5 transition-transform" : ""} />
                    </button>
                </form>
            </div>
        </div>
    );
}

// ---------------------------
// Journey Component
// ---------------------------
function JourneyComponent() {
    const level = 3;
    const points = 1450;
    const pointsToNextLevel = 2000;
    const progress = (points / pointsToNextLevel) * 100;

    return (
        <div className="flex-1 overflow-y-auto bg-background pb-10">
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
