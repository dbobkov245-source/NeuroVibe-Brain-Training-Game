import { ChatMessage, ModelResponseData } from '../types';

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
export async function generateJsonResponse(history: ChatMessage[], systemInstruction: { text: string }): Promise<ModelResponseData> {
  // The frontend now calls a local proxy endpoint instead of Google's API directly.
  // This proxy server will be responsible for securely adding the API key.
  const PROXY_ENDPOINT = '/api/generate'; 

  try {
    const response = await fetch(PROXY_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        history,
        systemInstruction,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Ошибка сервера-посредника: ${errorData.error || response.statusText}`);
    }

    const parsed = await response.json();

    if (isModelResponseData(parsed)) {
      return parsed;
    } else {
      console.error("Invalid JSON structure received from proxy:", parsed);
      throw new Error("Получен неверный формат данных от сервера.");
    }
  } catch (error) {
    console.error("Proxy Communication Error:", error);
    const errorMessage = error instanceof Error ? error.message : "Произошла неизвестная ошибка.";
    // Return a structured error to be displayed in the chat
    return {
      display_html: `<strong>Ошибка:</strong> ${errorMessage}`,
      xp_gained: 0,
      game_data: { mode: 'words' } // Default mode on error
    };
  }
}
