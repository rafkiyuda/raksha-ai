"use client";

import { useState, useRef, useEffect } from "react";
import { Send, Bot, User, ShieldCheck, ToggleLeft, ToggleRight } from "lucide-react";

type Message = {
    id: string;
    role: "user" | "assistant";
    content: string;
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
