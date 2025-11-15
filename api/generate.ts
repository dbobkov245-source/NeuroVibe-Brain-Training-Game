import type { VercelRequest, VercelResponse } from '@vercel/node';
import { GoogleGenAI } from "@google/genai";
import { ChatMessage } from '../types';

export default async function handler(
  req: VercelRequest,
  res: VercelResponse,
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'GEMINI_API_KEY is not set in environment variables.' });
  }
  
  try {
    const { history, systemInstruction } = req.body as { history: ChatMessage[], systemInstruction: { text: string } };

    if (!history || !systemInstruction) {
        return res.status(400).json({ error: 'Invalid request body: history and systemInstruction are required.' });
    }

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
    console.error('Error calling Gemini API:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return res.status(500).json({ error: `Internal Server Error: ${errorMessage}` });
  }
}
