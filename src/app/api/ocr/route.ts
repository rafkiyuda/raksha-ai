import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY || "");

export async function POST(req: Request) {
    try {
        const formData = await req.formData();
        const file = formData.get("file") as File;

        if (!file) {
            return NextResponse.json({ error: "No file provided" }, { status: 400 });
        }

        const mimeType = file.type;
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const base64String = buffer.toString("base64");

        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

        const prompt = `
        Analisis gambar ini yang merupakan screenshot portofolio saham atau reksadana.
        Eksrak informasi berikut dan kembalikan HANYA dalam format JSON array of objects. 
        Masing-masing object HANYA boleh memiliki kunci:
        - "ticker" (simbol saham, huruf kapital, misal: GOTO, BBCA)
        - "shares" (jumlah lot atau lembar, angka, misal: 100)
        - "averagePrice" (harga beli rata-rata, angka, misal: 50.5)
        - "currentPrice" (harga saat ini, angka, misal: 52.0)
        - "totalValue" (total nilai saat ini, angka, opsional)
        - "returnPercent" (persentase keuntungan/kerugian, angka desimal, misal: -5.4, opsional)

        Jika tidak bisa menemukan data yang valid, kembalikan array kosong: []
        PENTING: JANGAN kembalikan markdown backticks atau teks lain selain JSON murni.
        `;

        const result = await model.generateContent([
            prompt,
            {
                inlineData: {
                    data: base64String,
                    mimeType
                }
            }
        ]);

        const responseText = result.response.text();

        // Membersihkan markdown backticks jika AI bandel
        let cleanText = responseText.replace(/```json/g, '').replace(/```/g, '').trim();

        try {
            const data = JSON.parse(cleanText);
            return NextResponse.json({ data });
        } catch (parseError) {
            console.error("Failed to parse OCR JSON:", cleanText);
            // Fallback jika bukan JSON murni tapi setidaknya ada teks
            return NextResponse.json({ rawText: cleanText, error: "Gagal memformat data Portofolio" }, { status: 500 });
        }

    } catch (error: any) {
        console.error("OCR API Error:", error);
        return NextResponse.json({ error: "Gagal memproses gambar" }, { status: 500 });
    }
}
