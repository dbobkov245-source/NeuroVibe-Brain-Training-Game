import { ChatMessage, ModelResponseData, Persona } from '../types';
import { GENERATION_CONFIG, PERSONA_PROMPTS, FEW_SHOT_EXAMPLES } from '../constants';

export class GeminiServiceError extends Error {
  constructor(message: string, public statusCode?: number, public isNetwork = false) {
    super(message); this.name = 'GeminiServiceError';
  }
}

/** Универсальный запрос к Gemini 2.5 Flash с:
 * - выбором персоны (demon/cyborg/grandpa)
 * - температура 0.9 → уникальные ответы
 * - few-shot примерами → ИИ понимает, что хотим
 * - таймаут 30 с → не висям
 */
export async function generateJsonResponse(
  history: ChatMessage[],
  systemInstruction: { text: string },
  persona: Persona = 'demon' // новый параметр
): Promise<ModelResponseData> {
  const PROXY_ENDPOINT = '/api/generate';

  // 1. Добавляем персону и примеры к системному промту
  const fullPrompt = `${PERSONA_PROMPTS[persona]}\n${FEW_SHOT_EXAMPLES}\n${systemInstruction.text}`;

  // 2. Передаём temperature/topP → убираем шаблоны
  const body = {
    history,
    systemInstruction: { text: fullPrompt },
    generationConfig: GENERATION_CONFIG, // ← temperature: 0.9, topP: 0.95
  };

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 30000);

  try {
    const res = await fetch(PROXY_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!res.ok) {
      const text = await res.text();
      throw new GeminiServiceError(`Ошибка сервера: ${text}`, res.status);
    }

    const data: unknown = await res.json();
    if (!isModelResponseData(data)) throw new GeminiServiceError('Неверный формат ответа', 500);

    return data;
  } catch (err) {
    if (err instanceof Error && err.name === 'AbortError') throw new GeminiServiceError('Превышено время ожидания', 408, true);
    if (err instanceof GeminiServiceError) throw err;
    throw new GeminiServiceError(err instanceof Error ? err.message : 'Unknown error', undefined, true);
  }
}

// type-guard (для своих моделей)
function isModelResponseData(obj: unknown): obj is ModelResponseData {
  const d = obj as any;
  return d && typeof d.display_html === 'string' && typeof d.xp_gained === 'number' && d.game_data && ['words','story','associations'].includes(d.game_data.mode);
}
