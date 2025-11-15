import type { VercelRequest, VercelResponse } from '@vercel/node';
import { GoogleGenAI } from "@google/genai";
import { ChatMessage } from '../src/types';

export default async function handler(
  req: VercelRequest,
  res: VercelResponse,
) {
  // Ensure the API key exists before any other logic
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.error('GEMINI_API_KEY is not set in environment variables.');
    return res.status(500).json({ error: 'Ключ API не настроен на сервере.' });
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { history, systemInstruction } = req.body as { history: ChatMessage[], systemInstruction: { text: string } };

    if (!history || !systemInstruction) {
        return res.status(400).json({ error: 'Неверное тело запроса: требуются history и systemInstruction.' });
    }
    
    // Now apiKey is guaranteed to be a string
    const ai = new GoogleGenAI({ apiKey });
    
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: history,
        config: {
            systemInstruction: systemInstruction.text,
            responseMimeType: "application/json",
        }
    });

    const jsonText = response.text;
    const parsedData = JSON.parse(jsonText);

    return res.status(200).json(parsedData);

  } catch (error) {
    console.error('Error in Vercel Function:', error);
    const errorMessage = error instanceof Error ? error.message : 'Произошла неизвестная ошибка';
    return res.status(500).json({ error: `Внутренняя ошибка сервера: ${errorMessage}` });
  }
}
