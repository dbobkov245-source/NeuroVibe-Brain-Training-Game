import type { VercelRequest, VercelResponse } from '@vercel/node';

const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent';

interface GeminiRequest {
  history: Array<{ role: string; parts: Array<{ text: string }> }>;
  systemInstruction: { text: string };
  generationConfig?: {
    temperature?: number;
    topP?: number;
    maxOutputTokens?: number;
  };
}

export default async (req: VercelRequest, res: VercelResponse) => {
  // CORS headers для dev-режима
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    console.error('❌ API_KEY не настроен!');
    return res.status(500).json({ error: 'API_KEY not configured' });
  }

  const { history, systemInstruction, generationConfig } = req.body as GeminiRequest;

  if (!Array.isArray(history) || !systemInstruction?.text) {
    return res.status(400).json({ 
      error: 'Invalid body: history и systemInstruction обязательны' 
    });
  }

  try {
    // Преобразуем историю в формат Gemini API
    const contents = history.map(msg => ({
      role: msg.role === 'model' ? 'model' : 'user',
      parts: msg.parts
    }));

    const requestBody = {
      contents,
      systemInstruction: {
        parts: [{ text: systemInstruction.text }]
      },
      generationConfig: {
        temperature: generationConfig?.temperature ?? 0.9,
        topP: generationConfig?.topP ?? 0.95,
        maxOutputTokens: generationConfig?.maxOutputTokens ?? 400,
        responseMimeType: 'application/json'
      }
    };

    const response = await fetch(`${GEMINI_API_URL}?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('Gemini API error:', response.status, errorData);
      
      if (response.status === 429) {
        return res.status(429).json({ error: 'Превышен лимит запросов' });
      }
      if (response.status === 401) {
        return res.status(401).json({ error: 'Неверный API-ключ' });
      }
      
      return res.status(response.status).json({ 
        error: `Gemini API error: ${response.statusText}` 
      });
    }

    const data = await response.json();
    
    // Извлекаем текст из ответа Gemini
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
    
    if (!text) {
      console.error('Пустой ответ от модели:', JSON.stringify(data));
      return res.status(502).json({ error: 'Пустой ответ от модели' });
    }

    // Парсим JSON из ответа
    let parsed: unknown;
    try {
      // Убираем markdown форматирование если есть
      const cleanText = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
      parsed = JSON.parse(cleanText);
    } catch (parseError) {
      console.error('Ошибка парсинга JSON:', text);
      return res.status(502).json({ 
        error: 'Модель вернула не JSON',
        raw: text.substring(0, 200)
      });
    }

    return res.status(200).json(parsed);

  } catch (err: any) {
    console.error('Внутренняя ошибка:', err);
    
    if (err.code === 'ENOTFOUND' || err.code === 'ECONNREFUSED') {
      return res.status(503).json({ error: 'Нет соединения с Gemini API' });
    }
    
    return res.status(500).json({ 
      error: 'Внутренняя ошибка сервера',
      details: err.message 
    });
  }
};
