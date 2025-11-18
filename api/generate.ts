import type { VercelRequest, VercelResponse } from '@vercel/node';
import { GoogleGenAI } from '@google/genai';

export default async (req: VercelRequest, res: VercelResponse) => {
  // 1. Проверяем метод
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method Not Allowed' });

  // 2. Проверяем наличие ключа
  const apiKey = process.env.API_KEY;
  if (!apiKey) return res.status(500).json({ error: 'API_KEY not configured' });

  // 3. Валидируем тело
  const { history, systemInstruction, generationConfig } = req.body;
  if (!Array.isArray(history) || !systemInstruction?.text) {
    return res.status(400).json({ error: 'Invalid body: history и systemInstruction обязательны' });
  }

  try {
    const ai = new GoogleGenAI({ apiKey });

    const result = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: history,
      config: {
        systemInstruction: systemInstruction.text,
        responseMimeType: 'application/json',
        ...generationConfig, // temperature, topP и т.д.
      },
    });

    const raw = result.text;
    if (!raw) return res.status(502).json({ error: 'Пустой ответ от модели' });

    // 4. Проверяем, что это JSON
    let parsed: unknown;
    try { parsed = JSON.parse(raw); } catch {
      return res.status(502).json({ error: 'Модель вернула не JSON' });
    }

    return res.status(200).json(parsed);

  } catch (err: any) {
    // 5. Обрабатываем ошибки GoogleGenAI
    if (err?.code === 429) return res.status(429).json({ error: 'Превышен лимит запросов' });
    if (err?.code === 401) return res.status(401).json({ error: 'Неверный API-ключ' });
    console.error('Gemini error:', err);
    return res.status(500).json({ error: 'Внутренняя ошибка сервера' });
  }
};
