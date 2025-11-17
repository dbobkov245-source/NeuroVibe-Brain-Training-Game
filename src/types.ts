// ========== Импорты React ==========
import { type FC, type SVGProps } from 'react';

// ========== Базовые типы приложения ==========

export type MessageRole = 'user' | 'model';

export interface ChatMessage {
  role: MessageRole;
  parts: { text: string }[];
}

export const GAME_MODES = ['words', 'story', 'associations'] as const;
export type GameMode = typeof GAME_MODES[number];

export const ACHIEVEMENT_IDS = [
  'STORY_PATHFINDER',
  'WORD_MASTER',
  'ASSOCIATION_ACE',
  'NOVICE_NEURONAUT',
  'FIVE_TIME_CHAMPION'
] as const;
export type AchievementId = typeof ACHIEVEMENT_IDS[number];

export type IconComponent = FC<SVGProps<SVGSVGElement>>;

export interface Achievement {
  id: AchievementId;
  name: string;
  description: string;
  icon: IconComponent;
}

export interface GameData {
  mode: GameMode;
  correct_answers?: number;
  total_items?: number;
  association_score?: number;
}

export interface ModelResponseData {
  display_html: string;
  xp_gained: number;
  game_data: GameData;
}

export interface AchievementCheckContext {
  xp: number;
  gamesPlayed: number;
  lastModelResponse?: ModelResponseData;
  currentGameMode: GameMode | null;
}

export interface AchievementDefinition extends Achievement {
  check: (context: AchievementCheckContext) => boolean;
}

export interface GameState {
  xp: number;
  gamesPlayed: number;
  unlockedAchievements: AchievementId[];
  chatHistory: ChatMessage[];
  lastSaved: number;
}

// ========== Service Worker Types (для sw.ts) ==========
// 🔥 Только расширяем существующие типы, не переопределяем их

declare global {
  // SyncEvent уже существует в lib.dom.d.ts, но может быть недоступен в некоторых конфигах
  interface SyncEvent extends ExtendableEvent {
    readonly tag: string;
    readonly lastChance: boolean;
  }
}

// ========== Утилитарные функции ==========

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

export function isAchievementId(value: string): value is AchievementId {
  return ACHIEVEMENT_IDS.includes(value as AchievementId);
}
