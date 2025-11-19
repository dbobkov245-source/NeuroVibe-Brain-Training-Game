import type { VercelRequest, VercelResponse } from '@vercel/node';
import { GoogleGenerativeAI } from '@google/generative-ai';

export default async function handler(req: VercelRequest, res: VercelResponse) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
        return res.status(500).json({ error: 'GEMINI_API_KEY not configured' });
    }

    try {
        // We can't list models directly with the SDK in the current version easily 
        // without using the model manager which might be in a different package or 
        // via direct fetch if the SDK doesn't expose it nicely yet.
        // However, let's try a simple generation with a known model to see if it works,
        // OR better, let's use the REST API for listing models since the SDK 
        // focuses on generation.
        // Actually, let's try to use the SDK's getGenerativeModel and just return "OK" if it initializes,
        // but that doesn't prove availability.

        // Let's use direct fetch for listing models as it's reliable for debugging.
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`);
        const data = await response.json();

        res.status(200).json({
            keyConfigured: true,
            models: data
        });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
}
