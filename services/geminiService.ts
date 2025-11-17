import { ChatMessage, ModelResponseData } from '../types';

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

export async function generateJsonResponse(history: ChatMessage[], systemInstruction: { text: string }): Promise<ModelResponseData> {
  const PROXY_ENDPOINT = '/api/generate'; 

  try {
    const response = await fetch(PROXY_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ history, systemInstruction }),
    });

    let responseBody;
    try {
      responseBody = await response.json();
    } catch (e) {
      throw new Error(`Ошибка сервера: ${response.status} ${response.statusText}`);
    }

    if (!response.ok) {
      const errorMessage = responseBody?.error || response.statusText;
      throw new Error(errorMessage);
    }

    if (isModelResponseData(responseBody)) {
      return responseBody;
    } else {
      console.error("Invalid JSON structure:", responseBody);
      throw new Error("Получен неверный формат данных от сервера.");
    }

  } catch (error) {
    console.error("Proxy Error:", error);
    const errorMessage = error instanceof Error ? error.message : "Произошла неизвестная ошибка.";
    
    return {
      display_html: `<strong>Ошибка:</strong> ${errorMessage}`,
      xp_gained: 0,
      game_data: { mode: 'words' }
    };
  }
}
