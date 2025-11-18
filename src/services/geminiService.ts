// src/services/geminiService.ts
import { ChatMessage, ModelResponseData, Persona } from '../types';
import { GENERATION_CONFIG, PERSONA_PROMPTS, FEW_SHOT_EXAMPLES, SYSTEM_INSTRUCTION } from '../constants';

export async function generateJsonResponse(
  history: ChatMessage[],
  persona: Persona = 'demon'
): Promise<ModelResponseData> {
  const fullSystem = `
${PERSONA_PROMPTS[persona]}

${FEW_SHOT_EXAMPLES}

${SYSTEM_INSTRUCTION.text}
`.trim();

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 28000);

  try {
    const res = await fetch('/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        history,
        system: { text: fullSystem },
        generationConfig: GENERATION_CONFIG,
      }),
      signal: controller.signal,
    });

    clearTimeout(timeout);

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || 'Server error');
    }

    const data = await res.json();

    // Валидация
    if (!data?.display_html || typeof data?.xp_gained !== 'number' || !data?.game_data?.mode) {
      throw new Error('Некорректный ответ модели');
    }

    return data as ModelResponseData;
  } catch (err: any) {
    if (err.name === 'AbortError) {
      throw new Error('Таймаут запроса к Gemini');
    }
    throw err instanceof Error ? err : new Error('Неизвестная ошибка');
  }
}
