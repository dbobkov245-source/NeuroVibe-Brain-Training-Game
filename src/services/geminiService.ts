import { ChatMessage, ModelResponseData, Persona } from '../types';
import { GENERATION_CONFIG, PERSONA_PROMPTS, FEW_SHOT_EXAMPLES } from '../constants';

export class GeminiServiceError extends Error {
  constructor(
    message: string, 
    public statusCode?: number, 
    public isNetwork = false
  ) {
    super(message);
    this.name = 'GeminiServiceError';
  }
}

/**
 * Универсальный запрос к Gemini 2.0 Flash через Vercel API route
 * @param history - История чата
 * @param systemInstruction - Системный промпт
 * @param persona - Выбранная персона (demon/cyborg/grandpa)
 */
export async function generateJsonResponse(
  history: ChatMessage[],
  systemInstruction: { text: string },
  persona: Persona = 'demon'
): Promise<ModelResponseData> {
  const PROXY_ENDPOINT = '/api/generate';

  // 1. Собираем полный системный промпт с персоной и примерами
  const fullSystemPrompt = `${PERSONA_PROMPTS[persona]}

${FEW_SHOT_EXAMPLES}

${systemInstruction.text}`;

  // 2. Формируем тело запроса
  const requestBody = {
    history,
    systemInstruction: { text: fullSystemPrompt },
    generationConfig: GENERATION_CONFIG
  };

  // 3. Защита от зависания (timeout 30 сек)
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 30000);

  try {
    const response = await fetch(PROXY_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(requestBody),
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    // 4. Обработка HTTP ошибок
    if (!response.ok) {
      let errorMessage = `Ошибка сервера: ${response.status}`;
      
      try {
        const errorData = await response.json();
        errorMessage = errorData.error || errorMessage;
      } catch {
        errorMessage = await response.text();
      }

      throw new GeminiServiceError(
        errorMessage, 
        response.status, 
        false
      );
    }

    // 5. Парсинг и валидация JSON
    const data: unknown = await response.json();

    if (!isModelResponseData(data)) {
      console.error('❌ Неверный формат ответа:', data);
      throw new GeminiServiceError(
        'Модель вернула некорректный JSON',
        500
      );
    }

    return data;

  } catch (err) {
    // 6. Обработка ошибок
    if (err instanceof Error && err.name === 'AbortError') {
      throw new GeminiServiceError(
        'Превышено время ожидания (30 сек)',
        408,
        true
      );
    }

    if (err instanceof GeminiServiceError) {
      throw err;
    }

    // Сетевые ошибки
    throw new GeminiServiceError(
      err instanceof Error ? err.message : 'Неизвестная ошибка',
      undefined,
      true
    );
  }
}

/**
 * Type guard для проверки валидности ответа модели
 */
function isModelResponseData(obj: unknown): obj is ModelResponseData {
  if (!obj || typeof obj !== 'object') return false;

  const data = obj as any;

  // Обязательные поля
  if (typeof data.display_html !== 'string') return false;
  if (typeof data.xp_gained !== 'number') return false;
  if (!data.game_data || typeof data.game_data !== 'object') return false;

  // Проверка режима игры
  const validModes = ['words', 'story', 'associations'];
  if (!validModes.includes(data.game_data.mode)) return false;

  // Опциональные поля могут отсутствовать
  return true;
}
