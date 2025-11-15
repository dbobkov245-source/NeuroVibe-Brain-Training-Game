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

    let responseBody;
    try {
      responseBody = await response.json();
    } catch (e) {
      // If server returns non-JSON error (e.g. gateway error), create a custom error.
      throw new Error(`Ошибка сервера: ${response.status} ${response.statusText}`);
    }

    if (!response.ok) {
      // Use the 'error' field from the server's JSON response if it exists, otherwise statusText.
      const errorMessage = responseBody?.error || response.statusText;
      throw new Error(`Ошибка сервера-посредника: ${errorMessage}`);
    }

    if (isModelResponseData(responseBody)) {
      return responseBody;
    } else {
      console.error("Invalid JSON structure received from proxy:", responseBody);
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
