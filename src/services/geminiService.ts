import { ChatMessage, ModelResponseData } from '../types';

export class GeminiServiceError extends Error {
  constructor(
    message: string,
    public readonly statusCode?: number,
    public readonly isNetworkError?: boolean
  ) {
    super(message);
    this.name = 'GeminiServiceError';
  }
}

// Type guard to check if the parsed JSON matches our expected structure
function isModelResponseData(obj: any): obj is ModelResponseData {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    typeof obj.display_html === 'string' &&
    typeof obj.xp_gained === 'number' &&
    typeof obj.game_data === 'object' &&
    obj.game_data !== null &&
    ['words', 'story', 'associations'].includes(obj.game_data.mode)
  );
}

/**
 * Sends chat history to a secure backend proxy, which then calls the Gemini API.
 * The API key is NOT handled on the client-side.
 */
export async function generateJsonResponse(
  history: ChatMessage[], 
  systemInstruction: { text: string }
): Promise<ModelResponseData> {
  const PROXY_ENDPOINT = '/api/generate'; 

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000); // 30s timeout

    const response = await fetch(PROXY_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        history,
        systemInstruction,
      }),
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    const contentType = response.headers.get('content-type');
    if (!contentType?.includes('application/json')) {
      throw new GeminiServiceError(
        'Сервер вернул неверный формат данных',
        response.status,
        false
      );
    }

    const responseBody = await response.json();

    if (!response.ok) {
      const errorMessage = responseBody?.error || response.statusText;
      throw new GeminiServiceError(
        `Ошибка сервера: ${errorMessage}`,
        response.status,
        false
      );
    }

    if (isModelResponseData(responseBody)) {
      return responseBody;
    } else {
      console.error("Invalid JSON structure received from proxy:", responseBody);
      throw new GeminiServiceError('Получен неверный формат данных от сервера', 500, false);
    }

  } catch (error) {
    if (error instanceof Error) {
      if (error.name === 'AbortError') {
        throw new GeminiServiceError('Превышено время ожидания ответа', 408, true);
      }
      if ('isNetworkError' in error) {
        throw error;
      }
    }
    
    console.error("Proxy Communication Error:", error);
    const errorMessage = error instanceof Error ? error.message : "Произошла неизвестная ошибка.";
    throw new GeminiServiceError(errorMessage, undefined, true);
  }
}
