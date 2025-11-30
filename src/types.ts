import { type FC, type SVGProps } from 'react';

// ========== Базовые типы сообщений ==========
export type MessageRole = 'user' | 'model';

export interface ChatMessage {
  role: MessageRole;
  parts: { text: string }[];
  isHidden?: boolean; // Для скрытых системных промптов
}

// ========== Режимы игры ==========
export const GAME_MODES = ['words', 'story', 'associations', 'details'] as const;
export type GameMode = typeof GAME_MODES[number];

// ========== Персоны ==========
export const PERSONAS = ['demon', 'cyborg', 'grandpa'] as const;
export type Persona = typeof PERSONAS[number];

// ========== Достижения ==========
export const ACHIEVEMENT_IDS = [
  'STORY_PATHFINDER',
  'WORD_MASTER',
  'ASSOCIATION_ACE',
  'NOVICE_NEURONAUT',
  'FIVE_TIME_CHAMPION',
  'SARCASM_KING',
  'DARK_PHILOSOPHER',
  'DETAILS_DETECTIVE'
] as const;

export type AchievementId = typeof ACHIEVEMENT_IDS[number];

export type IconComponent = FC<SVGProps<SVGSVGElement>>;

export interface Achievement {
  id: AchievementId;
  name: string;
  description: string;
  icon: IconComponent;
}

// ========== Данные игры ==========
export interface GameData {
  mode: GameMode;
  correct_answers?: number;
  total_items?: number;
  association_score?: number;
}

// ========== Ответ модели ==========
export interface ModelResponseData {
  display_html: string;
  xp_gained: number;
  game_data: GameData;
  isMemoryContent?: boolean; // Для карточки запоминания
}

// ========== Контекст проверки достижений ==========
export interface AchievementCheckContext {
  xp: number;
  gamesPlayed: number;
  lastModelResponse?: ModelResponseData;
  currentGameMode: GameMode | null;
}

// ========== Определение достижения с проверкой ==========
export interface AchievementDefinition extends Achievement {
  check: (ctx: AchievementCheckContext) => boolean;
}

// ========== Состояние игры для offline storage ==========
export interface GameState {
  xp: number;
  gamesPlayed: number;
  unlockedAchievements: AchievementId[];
  chatHistory: ChatMessage[];
  lastSaved: number;
}

// ========== Ежедневный квест ==========
export interface DailyQuest {
  id: string;
  title: string;
  description: string;
  target: number;
  mode: GameMode;
  minScore: number;
  xp: number;
  completed: boolean;
  ts?: number;
}

// ========== Service Worker типы ==========
declare global {
  interface ServiceWorkerGlobalScope {
    __WB_MANIFEST: any;
  }

  interface SyncEvent extends ExtendableEvent {
    readonly tag: string;
    readonly lastChance: boolean;
  }

  interface FetchEvent extends ExtendableEvent {
    readonly request: Request;
    respondWith(response: Response | Promise<Response>): void;
  }

  interface ServiceWorkerGlobalScopeEventMap {
    sync: SyncEvent;
    fetch: FetchEvent;
  }

  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

// ========== Утилиты ==========

/**
 * Type guard для проверки валидности ответа модели
 */
export function isModelResponseData(obj: unknown): obj is ModelResponseData {
  if (!obj || typeof obj !== 'object') return false;

  const data = obj as any;

  return (
    typeof data.display_html === 'string' &&
    typeof data.xp_gained === 'number' &&
    data.game_data &&
    typeof data.game_data === 'object' &&
    GAME_MODES.includes(data.game_data.mode)
  );
}

/**
 * Type guard для проверки валидности режима игры
 */
export function isGameMode(value: unknown): value is GameMode {
  return typeof value === 'string' && GAME_MODES.includes(value as GameMode);
}

/**
 * Type guard для проверки валидности персоны
 */
export function isPersona(value: unknown): value is Persona {
  return typeof value === 'string' && PERSONAS.includes(value as Persona);
}
