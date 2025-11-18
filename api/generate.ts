// api/generate.ts
import type { VercelRequest, VercelResponse } from '@vercel/node';

const GEMINI_API_URL =
  'https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method Not Allowed' });

  const apiKey = process.env.API_KEY;
  if (!apiKey) return res.status(500).json({ error: 'API_KEY not configured' });

  const { history, systemInstruction, generationConfig } = req.body as any;

  if (!history || !system?.text) {
    return res.status(400).json({ error: 'history и system обязательны' });
  }

  try {
    const response = await fetch(`${GEMINI_API_URL}?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: history.map((m: any) => ({
          role: m.role === 'model' ? 'model' : 'user',
          parts: m.parts,
        })),
        systemInstruction: { parts: [{ text: system.text }] },
        generationConfig: {
          temperature: generationConfig?.temperature ?? 0.9,
          topP: generationConfig?.topP ?? 0.95,
          maxOutputTokens: generationConfig?.maxOutputTokens ?? 800,
          responseMimeType: 'application/json',
        },
        safetySettings: [
          { category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_NONE' },
          { category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 'BLOCK_NONE' },
          { category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT', threshold: 'BLOCK_NONE' },
          { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_NONE' },
        ],
      }),
    });

    if (!response.ok) {
      const err = await response.text();
      console.error('Gemini error:', response.status, err);
      return res.status(response.status).json({ error: 'Gemini API error' });
    }

    const data = await response.json();
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text ?? '';

    let json;
    try {
      const clean = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
      json = JSON.parse(clean);
    } catch {
      return res.status(502).json({ error: 'Модель не вернула валидный JSON', raw: text });
    }

    res.status(200).json(json);
  } catch (e: any) {
    console.error(e);
    res.status(500).json({ error: 'Server error', details: e.message });
  }
}
