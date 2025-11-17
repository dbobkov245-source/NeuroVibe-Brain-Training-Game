import { type FC, type SVGProps } from 'react';

// ========== Базовые типы приложения ==========

/** Роль участника чата */
export type MessageRole = 'user' | 'model';

/** Сообщение в чате */
export interface ChatMessage {
  role: MessageRole;
  parts: { text: string }[];
}

/** Игровые режимы */
export const GAME_MODES = ['words', 'story', 'associations'] as const;
export type GameMode = typeof GAME_MODES[number];

/** ID достижений с жесткой типизацией */
export const ACHIEVEMENT_IDS = [
  'STORY_PATHFINDER',
  'WORD_MASTER',
  'ASSOCIATION_ACE',
  'NOVICE_NEURONAUT',
  'FIVE_TIME_CHAMPION'
] as const;
export type AchievementId = typeof ACHIEVEMENT_IDS[number];

/** Иконка для UI (React компонент) */
export type IconComponent = FC<SVGProps<SVGSVGElement>>;

/** Достижение (публичная модель) */
export interface Achievement {
  id: AchievementId;
  name: string;
  description: string;
  icon: IconComponent;
}

/** Внутренние данные игры из ответа модели */
export interface GameData {
  mode: GameMode;
  correct_answers?: number;
  total_items?: number;
  association_score?: number;
}

/** Ответ от Google Gemini API */
export interface ModelResponseData {
  display_html: string;
  xp_gained: number;
  game_data: GameData;
}

/** Контекст для проверки достижений */
export interface AchievementCheckContext {
  xp: number;
  gamesPlayed: number;
  lastModelResponse?: ModelResponseData;
  currentGameMode: GameMode | null;
}

/** Полное определение достижения с функцией проверки */
export interface AchievementDefinition extends Achievement {
  check: (context: AchievementCheckContext) => boolean;
}

// ========== Типы для офлайн-хранилища ==========

/** Сохраненное состояние игры (IndexedDB/localStorage) */
export interface GameState {
  xp: number;
  gamesPlayed: number;
  unlockedAchievements: AchievementId[];
  chatHistory: ChatMessage[];
  lastSaved: number;
}

// ========== Service Worker Types (для sw.ts) ==========

/** Базовый интерфейс расширяемых событий SW */
export interface ExtendableEvent extends Event {
  waitUntil(fn: Promise<any>): void;
}

/** Событие fetch в Service Worker */
export interface FetchEvent extends ExtendableEvent {
  readonly request: Request;
  readonly clientId: string;
  readonly resultingClientId?: string;
  readonly target: ServiceWorkerGlobalScope;
  respondWith(response: Response | Promise<Response>): void;
}

/** Событие sync (Background Sync) */
export interface SyncEvent extends ExtendableEvent {
  readonly tag: string;
  readonly lastChance: boolean;
}

/** Событие push (Push API) */
export interface PushEvent extends ExtendableEvent {
  readonly data: PushMessageData | null;
}

export interface PushMessageData {
  arrayBuffer(): ArrayBuffer;
  blob(): Blob;
  json(): any;
  text(): string;
}

// ========== Кастомные ошибки (опционально) ==========

/** Класс ошибки для Gemini Service */
export class GeminiError extends Error {
  constructor(
    message: string,
    public statusCode?: number,
    public isNetworkError?: boolean
  ) {
    super(message);
    this.name = 'GeminiError';
  }
}

// ========== Тип-гард (type guard) функции ==========

/** Проверка, является ли объект корректным ответом модели */
export function isModelResponseData(obj: unknown): obj is ModelResponseData {
  if (typeof obj !== 'object' || obj === null) return false;
  
  const data = obj as Record<string, unknown>;
  return (
    typeof data.display_html === 'string' &&
    typeof data.xp_gained === 'number' &&
    typeof data.game_data === 'object' &&
    data.game_data !== null &&
    GAME_MODES.includes((data.game_data as GameData).mode)
  );
}

/** Проверка, является ли строка ID достижения */
export function isAchievementId(value: string): value is AchievementId {
  return ACHIEVEMENT_IDS.includes(value as AchievementId);
}
