// api/generate.ts
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from '@google/generative-ai';

// Priority list of models to try
const MODEL_PRIORITY = [
  'gemini-1.5-flash',
  'gemini-1.5-pro',
  'gemini-pro'
];

async function getBestModel(apiKey: string): Promise<string> {
  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`);
    if (!response.ok) {
      console.warn('Failed to list models, falling back to default');
      return 'gemini-1.5-flash';
    }

    const data = await response.json();
    const availableModels = new Set((data.models || []).map((m: any) => m.name.replace('models/', '')));

    for (const model of MODEL_PRIORITY) {
      if (availableModels.has(model)) {
        console.log(`Selected model: ${model}`);
        return model;
      }
    }

    console.warn('No priority models found, falling back to default');
    return 'gemini-1.5-flash';
  } catch (error) {
    console.error('Error selecting model:', error);
    return 'gemini-1.5-flash';
  }
}

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
    // Dynamically select the best model
    const modelName = await getBestModel(apiKey);

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: modelName,
      systemInstruction: system?.text,
      safetySettings: [
        { category: HarmCategory.HARM_CATEGORY_HARASSMENT, threshold: HarmBlockThreshold.BLOCK_NONE },
        { category: HarmCategory.HARM_CATEGORY_HATE_SPEECH, threshold: HarmBlockThreshold.BLOCK_NONE },
        { category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT, threshold: HarmBlockThreshold.BLOCK_NONE },
        { category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT, threshold: HarmBlockThreshold.BLOCK_NONE },
      ]
    });

    // Extract history and last message logic
    const historyForSdk = history.map((m: any) => ({
      role: m.role === 'model' ? 'model' : 'user',
      parts: m.parts,
    }));

    const lastMessage = historyForSdk.pop();

    if (!lastMessage || lastMessage.role !== 'user') {
      throw new Error('Last message must be from user');
    }

    const chat = model.startChat({
      history: historyForSdk,
      generationConfig: {
        ...generationConfig,
        responseMimeType: 'application/json',
      }
    });

    const result = await chat.sendMessage(lastMessage.parts[0].text);
    const response = await result.response;
    const text = response.text();

    let json;
    try {
      const cleaned = text.replace(/```json/g, '').replace(/```/g, '').trim();
      json = JSON.parse(cleaned);
    } catch (e) {
      console.error('Invalid JSON from model:', text);
      return res.status(502).json({ error: 'Invalid response format from AI', raw: text });
    }

    // Add model info to response for debugging
    json._debug_model = modelName;

    res.status(200).json(json);
  } catch (error: any) {
    console.error('Server error:', error);
    res.status(500).json({ error: error.message || 'Internal server error' });
  }
}
