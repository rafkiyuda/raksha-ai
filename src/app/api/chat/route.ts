import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

// Initialize Gemini with the provided key
const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY || "");

export async function POST(req: Request) {
    try {
        const { messages } = await req.json();

        const model = genAI.getGenerativeModel({
            model: "gemini-2.5-flash",
            systemInstruction: "Kamu adalah RAKSHA AI, co-pilot edukasi finansial untuk investor ritel Gen Z dan Milenial di Indonesia. Tujuanmu adalah meningkatkan literasi finansial, menjelaskan risiko (seperti Truth Score, Notasi Khusus BEI), dan memberikan wawasan yang objektif. Jawab dengan bahasa Indonesia yang santai, mudah dimengerti, namun tegas soal manajemen risiko. JANGAN berikan rekomendasi beli/jual langsung. Jika user membahas saham berisiko tinggi (arus kas negatif, notasi khusus), peringatkan mereka dan sarankan diversifikasi. Jika ditanya soal saham gorengan (pump and dump) atau finfluencer yang hype, ingatkan untuk selalu cross-check data fundamental."
        });

        // Gemini API is extremely strict about history format:
        // 1. Must start with 'user'
        // 2. Must strictly alternate 'user' -> 'model' -> 'user' etc.
        let rawHistory = messages.slice(0, -1);

        let validHistory: any[] = [];
        let expectedRole = "user";

        for (const msg of rawHistory) {
            const mappedRole = msg.role === "user" ? "user" : "model";
            if (mappedRole === expectedRole) {
                validHistory.push({
                    role: mappedRole,
                    parts: [{ text: msg.content }]
                });
                expectedRole = expectedRole === "user" ? "model" : "user";
            }
        }

        const chat = model.startChat({ history: validHistory });

        const latestMessage = messages[messages.length - 1].content;
        const result = await chat.sendMessage(latestMessage);
        const response = await result.response;
        const text = response.text();

        return NextResponse.json({ role: "assistant", content: text });
    } catch (error: any) {
        console.error("Chat API Error Detailed:", error);
        console.error("Error Object:", JSON.stringify(error, null, 2));
        if (error.response) {
            console.error("Error Response:", await error.response.text());
        }
        return NextResponse.json({ error: "Failed to process chat", details: error.message }, { status: 500 });
    }
}
