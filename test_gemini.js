import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY || "");

async function run() {
    try {
        const model = genAI.getGenerativeModel({
            model: "gemini-1.5-flash",
            systemInstruction: "Kamu adalah RAKSHA AI"
        });

        const chat = model.startChat({
            history: [
                {
                    role: "user",
                    parts: [{ text: "Hai" }]
                },
                {
                    role: "model",
                    parts: [{ text: "Halo! Saya RAKSHA AI." }]
                }
            ]
        });

        const result = await chat.sendMessage("Tes");
        const response = await result.response;
        console.log("SUCCESS:", response.text());
    } catch (e) {
        console.error("ERROR:", e);
    }
}

run();
