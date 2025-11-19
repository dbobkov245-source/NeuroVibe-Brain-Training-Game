// api/generate.ts
import type { VercelRequest, VercelResponse } from '@vercel/node';

const GEMINI_URL = 'https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.error('GEMINI_API_KEY not configured');
    return res.status(500).json({ error: 'Server configuration error' });
  }

  const { history, system, generationConfig } = req.body;

  try {
    const response = await fetch(`${GEMINI_URL}?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: history.map((m: any) => ({
          role: m.role === 'model' ? 'model' : 'user',
          parts: m.parts,
        })),
        systemInstruction: { parts: [{ text: system.text }] },
        generationConfig: {
          ...generationConfig,
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
      const err = await response.text().catch(() => 'Unknown error');
      console.error('Gemini error:', response.status, err);
      return res.status(response.status).json({ error: `AI service error: ${response.status}` });
    }

    const data = await response.json();
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text || '';

    let json;
    try {
      const cleaned = text.replace(/```json/g, '').replace(/```/g, '').trim();
      json = JSON.parse(cleaned);
    } catch (e) {
      console.error('Invalid JSON from model:', text);
      return res.status(502).json({ error: 'Invalid response format from AI', raw: text });
    }

    res.status(200).json(json);
  } catch (error: any) {
    console.error('Server error:', error);
    
    if (error.name === 'AbortError') {
      return res.status(504).json({ error: 'Request timeout' });
    }
    
    res.status(500).json({ error: 'Internal server error' });
  }
}
