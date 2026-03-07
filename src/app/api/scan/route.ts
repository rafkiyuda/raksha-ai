import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY || "");

export async function POST(req: Request) {
    try {
        const { input, type } = await req.json();

        const model = genAI.getGenerativeModel({
            model: "gemini-1.5-flash",
            systemInstruction: "Kamu adalah sistem audit RAKSHA AI ('Finfluencer Red Flag Scanner'). Tugasmu adalah menganalisis teks atau konteks dari URL yang diberikan user (teks post media sosial tentang saham). Berikan hasil scan dalam format JSON dengan struktur: { riskLevel: 'Low'|'Moderate'|'High', truthScore: number (0-100), analysis: 'penjelasan singkat mengapa', advice: 'saran edukatif untuk ritel' }. Fokus pada mendeteksi hype tanpa fundamental, potensi pump & dump, dan asimetri informasi."
        });

        const result = await model.generateContent(`Tolong analisis ${type === 'link' ? 'tautan' : 'klaim'} berikut:\n"${input}"\n\nKeluarkan hasil hanya dalam format JSON murni tanpa markdown formatter tambahan.`);
        const response = await result.response;
        let text = response.text().trim();
        if (text.startsWith("```json")) {
            text = text.replace(/```json/g, "").replace(/```/g, "").trim();
        }

        const parsedData = JSON.parse(text);

        return NextResponse.json(parsedData);
    } catch (error) {
        console.error("Scanner API Error:", error);
        return NextResponse.json({ error: "Failed to scan. Please try again." }, { status: 500 });
    }
}
