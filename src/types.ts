// ========== Импорты React ==========
import { type FC, type SVGProps } from 'react';

// ========== Базовые типы ==========
export type MessageRole = 'user' | 'model';

export interface ChatMessage {
  role: MessageRole;
  parts: { text: string }[];
  isHidden?: boolean;
}

export const GAME_MODES = ['words', 'story', 'associations'] as const;
export type GameMode = typeof GAME_MODES[number];

export const ACHIEVEMENT_IDS = [
  'STORY_PATHFINDER','WORD_MASTER','ASSOCIATION_ACE','NOVICE_NEURONAUT','FIVE_TIME_CHAMPION','SARCASM_KING','DARK_PHILOSOPHER'
] as const;
export type AchievementId = typeof ACHIEVEMENT_IDS[number];

export const PERSONAS = ['demon', 'cyborg', 'grandpa'] as const;
export type Persona = typeof PERSONAS[number];

export type IconComponent = FC<SVGProps<SVGSVGElement>>;

export interface Achievement {
  id: AchievementId; name: string; description: string; icon: IconComponent;
}

export interface GameData {
  mode: GameMode; correct_answers?: number; total_items?: number; association_score?: number;
}

export interface ModelResponseData {
  display_html: string; xp_gained: number; game_data: GameData; isMemoryContent?: boolean;
}

export interface AchievementCheckContext {
  xp: number; gamesPlayed: number; lastModelResponse?: ModelResponseData; currentGameMode: GameMode | null;
}

export interface AchievementDefinition extends Achievement {
  check: (ctx: AchievementCheckContext) => boolean;
}

export interface GameState {
  xp: number; gamesPlayed: number; unlockedAchievements: AchievementId[]; chatHistory: ChatMessage[]; lastSaved: number;
}

export interface DailyQuest {
  id: string; title: string; description: string; target: number; mode: GameMode; minScore: number; xp: number; completed: boolean; ts?: number;
}

// ========== Service Worker ==========
declare global {
  interface SyncEvent extends ExtendableEvent { readonly tag: string; readonly lastChance: boolean; }
  interface FetchEvent extends ExtendableEvent { readonly request: Request; respondWith(r: Response | Promise<Response>): void; }
  interface ServiceWorkerGlobalScopeEventMap { sync: SyncEvent; fetch: FetchEvent; }
}

// ========== Utils ==========
export function isModelResponseData(obj: unknown): obj is ModelResponseData {
  const data = obj as any;
  return data && typeof data.display_html==='string' && typeof data.xp_gained==='number' && data.game_data && GAME_MODES.includes(data.game_data.mode);
}
