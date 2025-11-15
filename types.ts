import React from 'react';

export type ChatMessage = {
  role: 'user' | 'model';
  parts: { text: string }[];
};

export type GameMode = 'words' | 'story' | 'associations';

export type AchievementId = 'STORY_PATHFINDER' | 'WORD_MASTER' | 'ASSOCIATION_ACE' | 'NOVICE_NEURONAUT' | 'FIVE_TIME_CHAMPION';

export interface Achievement {
  id: AchievementId;
  name: string;
  description: string;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
}

export interface ModelResponseData {
  display_html: string;
  xp_gained: number;
  game_data: {
    mode: GameMode;
    correct_answers?: number;
    total_items?: number;
    association_score?: number;
  };
}

export interface AchievementDefinition extends Achievement {
    check: (context: AchievementCheckContext) => boolean;
}

export interface AchievementCheckContext {
  xp: number;
  lastModelResponse?: ModelResponseData;
  currentGameMode: GameMode | null;
  gamesPlayed: number;
}