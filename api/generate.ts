// api/generate.ts
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from '@google/generative-ai';

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
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: 'gemini-1.5-flash',
      systemInstruction: system?.text,
    });

    const chat = model.startChat({
      history: history.map((m: any) => ({
        role: m.role === 'model' ? 'model' : 'user',
        parts: m.parts,
      })),
      generationConfig: {
        ...generationConfig,
        responseMimeType: 'application/json',
      },
      safetySettings: [
        { category: HarmCategory.HARM_CATEGORY_HARASSMENT, threshold: HarmBlockThreshold.BLOCK_NONE },
        { category: HarmCategory.HARM_CATEGORY_HATE_SPEECH, threshold: HarmBlockThreshold.BLOCK_NONE },
        { category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT, threshold: HarmBlockThreshold.BLOCK_NONE },
        { category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT, threshold: HarmBlockThreshold.BLOCK_NONE },
      ],
    });

    // The last message from the user is usually not in the history passed to startChat
    // if the client appends it before sending. 
    // However, looking at the previous code:
    // contents: history.map(...)
    // It seems the client sends the FULL history including the latest user message.
    // The SDK's startChat takes history, and then we call sendMessage with the new message.
    // If the history contains the last user message, we should pop it and send it via sendMessage,
    // OR if the client sends the new message separately?
    // Let's check App.tsx again.
    // App.tsx: const currentHistory = [...chatHistory, userMessage];
    // generateJsonResponse(currentHistory, ...)
    // So the history INCLUDES the latest user message.

    // We need to separate the last message for sendMessage, or use sendMessage with empty string if that's allowed?
    // No, sendMessage expects a prompt.
    // Let's extract the last user message.

    const historyForSdk = history.map((m: any) => ({
      role: m.role === 'model' ? 'model' : 'user',
      parts: m.parts,
    }));

    const lastMessage = historyForSdk.pop();

    if (!lastMessage || lastMessage.role !== 'user') {
      // Fallback if something is weird, though App.tsx ensures user message is last.
      // If the last message is model, we can't really "reply" to it in the same way.
      // But let's assume standard flow.
      throw new Error('Last message must be from user');
    }

    const chatSession = model.startChat({
      history: historyForSdk,
      generationConfig: {
        ...generationConfig,
        responseMimeType: 'application/json',
      },
      // Safety settings repeated here if needed, but startChat accepts them in model config or here?
      // Actually safetySettings are per request or model. 
      // Let's put them in getGenerativeModel or startChat?
      // SDK v0.1.0+ puts them in getGenerativeModel usually, or startChat.
      // Let's check docs or assume standard usage.
      // safetySettings are usually 2nd arg to getGenerativeModel or part of RequestOptions.
      // But wait, getGenerativeModel takes { model, safetySettings, systemInstruction, ... }
    });

    // Re-init model with safety settings
    const modelWithSafety = genAI.getGenerativeModel({
      model: 'gemini-1.5-flash',
      systemInstruction: system?.text,
      safetySettings: [
        { category: HarmCategory.HARM_CATEGORY_HARASSMENT, threshold: HarmBlockThreshold.BLOCK_NONE },
        { category: HarmCategory.HARM_CATEGORY_HATE_SPEECH, threshold: HarmBlockThreshold.BLOCK_NONE },
        { category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT, threshold: HarmBlockThreshold.BLOCK_NONE },
        { category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT, threshold: HarmBlockThreshold.BLOCK_NONE },
      ]
    });

    const chatWithSafety = modelWithSafety.startChat({
      history: historyForSdk,
      generationConfig: {
        ...generationConfig,
        responseMimeType: 'application/json',
      }
    });

    const result = await chatWithSafety.sendMessage(lastMessage.parts[0].text);
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

    res.status(200).json(json);
  } catch (error: any) {
    console.error('Server error:', error);
    res.status(500).json({ error: error.message || 'Internal server error' });
  }
}
