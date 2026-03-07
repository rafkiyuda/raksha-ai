"use client";

import { useState, useRef, useEffect } from "react";
import { Send, Bot, User, ShieldCheck, ToggleLeft, ToggleRight, X } from "lucide-react";

type ChatContext = {
    type: "stock";
    ticker: string;
    name: string;
    score: string;
};

type Message = {
    id: string;
    role: "user" | "assistant";
    content: string;
    context?: ChatContext;
};

export default function ChatPage() {
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
    const [chatContext, setChatContext] = useState<ChatContext | null>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isLoading, chatContext]);

    // Handle deep link query from other pages (e.g. Truth Score Market Place style)
    useEffect(() => {
        const checkQuery = () => {
            if (typeof window !== "undefined") {
                const params = new URLSearchParams(window.location.search);
                const queryContext = params.get("context");
                if (queryContext === "stock") {
                    setChatContext({
                        type: "stock",
                        ticker: params.get("ticker") || "",
                        name: params.get("name") || "",
                        score: params.get("score") || ""
                    });
                    // Clean up URL without refreshing the page
                    window.history.replaceState({}, document.title, window.location.pathname);
                }
            }
        };
        checkQuery();
    }, []);

    const handleSubmit = async (e?: React.FormEvent) => {
        if (e) e.preventDefault();

        if (!input.trim() || isLoading) return;

        const userMessage: Message = {
            id: Date.now().toString(),
            role: "user",
            content: input,
            context: chatContext || undefined
        };

        setMessages((prev) => [...prev, userMessage]);
        setInput("");
        setChatContext(null); // Clear context after send
        setIsLoading(true);

        try {
            // Include context in the text payload sent to LLM natively
            const apiMessages = [...messages, userMessage].map(msg => ({
                role: msg.role,
                content: msg.context ? `[Context: User is asking about ${msg.context.ticker} (${msg.context.name}) with Truth Score ${msg.context.score}/100]\n${msg.content}` : msg.content
            }));

            const response = await fetch("/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    messages: apiMessages,
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
        <div className="flex flex-col h-[calc(100dvh-5rem)] bg-background">
            {/* Header */}
            <header className="px-5 py-4 flex items-center justify-between border-b border-border bg-surface shrink-0 shadow-sm sticky top-0 z-10">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary-light flex items-center justify-center shrink-0 border border-primary/20">
                        <Bot className="text-primary-dark dark:text-primary" size={20} />
                    </div>
                    <div>
                        <h1 className="font-bold text-base text-foreground flex items-center gap-1">
                            RAKSHA {isAutopilot ? "Autopilot Lite" : "Co-Pilot"} <ShieldCheck size={14} className="text-primary" />
                        </h1>
                        <p className="text-xs text-foreground-muted">
                            {isAutopilot ? "Simulation mode enabled" : "Actively analyzing risks"}
                        </p>
                    </div>
                </div>

                {/* Toggle Mode */}
                <button
                    onClick={() => setIsAutopilot(!isAutopilot)}
                    className="flex flex-col items-center justify-center shrink-0 ml-2"
                >
                    {isAutopilot ? (
                        <ToggleRight size={28} className="text-primary" />
                    ) : (
                        <ToggleLeft size={28} className="text-foreground-muted" />
                    )}
                    <span className="text-[10px] font-semibold text-foreground-muted tracking-wider mt-0.5">Mode</span>
                </button>
            </header>

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

                            {/* Embedded Context Card Context Bubble */}
                            {m.context && m.context.type === 'stock' && (
                                <div className="mb-2 p-2 rounded-lg bg-black/10 border border-white/20 flex items-center gap-2">
                                    <div className="w-7 h-7 rounded-full bg-white/20 flex flex-col items-center justify-center font-bold text-[9px] leading-tight">
                                        {m.context.score}
                                    </div>
                                    <div className="text-left flex-1 overflow-hidden">
                                        <div className="font-bold text-[11px] truncate text-white">{m.context.ticker}</div>
                                        <div className="text-[9px] opacity-80 truncate text-white">{m.context.name}</div>
                                    </div>
                                </div>
                            )}

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

            {/* Input Area */}
            <div className="bg-surface border-t border-border shrink-0 flex flex-col relative">

                {/* Context Card (Marketplace Product Style) */}
                {chatContext && chatContext.type === 'stock' && (
                    <div className="px-4 pt-3 pb-0 animate-in fade-in slide-in-from-bottom-2 absolute bottom-full left-0 right-0 max-w-md mx-auto">
                        <div className="bg-background border border-primary/30 p-2.5 rounded-xl shadow-[0_-5px_15px_rgba(0,0,0,0.1)] flex items-center justify-between relative overflow-hidden backdrop-blur-md">
                            <div className="absolute top-0 right-0 w-20 h-20 bg-primary/10 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none"></div>
                            <div className="flex items-center gap-3 relative z-10 w-full">
                                <div className="w-8 h-8 rounded-full bg-surface-active flex items-center justify-center font-bold text-primary border border-primary/20 text-[10px]">
                                    {chatContext.score}
                                </div>
                                <div className="flex-1 overflow-hidden">
                                    <h4 className="text-[11px] font-bold text-foreground">Akan dianalisis: {chatContext.ticker}</h4>
                                    <p className="text-[9px] text-foreground-muted truncate">Lampiran ini akan dikirim bersama pesanmu</p>
                                </div>
                                <button
                                    onClick={() => setChatContext(null)}
                                    className="text-foreground-muted hover:text-foreground p-1 transition-colors bg-surface-active rounded-full shadow-sm"
                                >
                                    <X size={12} />
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                <div className="p-4 relative bg-surface z-20">
                    <form onSubmit={handleSubmit} className="flex gap-2">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder={isAutopilot ? "Ketik simulasi pasar..." : (chatContext ? "Tanya detail emiten ini..." : "Tulis pertanyaanmu di sini...")}
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
        </div>
    );
}
