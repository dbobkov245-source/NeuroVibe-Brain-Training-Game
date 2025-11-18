// src/services/geminiService.ts
import { ChatMessage, ModelResponseData, Persona } from '../types';
import { GENERATION_CONFIG, PERSONA_PROMPTS, FEW_SHOT_EXAMPLES, SYSTEM_INSTRUCTION } from '../constants';

export class GeminiServiceError extends Error {
  constructor(message: string, public statusCode?: number) {
    super(message);
    this.name = 'GeminiServiceError';
  }
}

export async function generateJsonResponse(
  history: ChatMessage[],
  persona: Persona = 'demon'
): Promise<ModelResponseData> {
  const fullSystemPrompt = [
    PERSONA_PROMPTS[persona],
    FEW_SHOT_EXAMPLES,
    SYSTEM_INSTRUCTION.text
  ].join('\n\n').trim();

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 15000); // Увеличен таймаут

  try {
    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        history,
        system: { text: fullSystemPrompt },
        generationConfig: GENERATION_CONFIG,
      }),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new GeminiServiceError(
        errorData.error || `HTTP ${response.status}: ${response.statusText}`,
        response.status
      );
    }

    const data = await response.json();

    // Валидация ответа
    if (
      typeof data?.display_html !== 'string' ||
      typeof data?.xp_gained !== 'number' ||
      !data?.game_data?.mode
    ) {
      console.error('Invalid response structure:', data);
      throw new GeminiServiceError('Invalid response structure from AI');
    }

    return data as ModelResponseData;
  } catch (err: any) {
    clearTimeout(timeoutId);

    if (err.name === 'AbortError') {
      throw new GeminiServiceError('Request timed out after 15 seconds', 504);
    }

    if (err instanceof GeminiServiceError) throw err;

    throw new GeminiServiceError(
      err.message || 'Network error occurred',
      err.statusCode || 500
    );
  }
}
