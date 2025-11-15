import { AchievementDefinition } from './types';
import { BookOpenText, MessageSquare, Users, Award, Trophy } from './components/Icons';

export const ACHIEVEMENTS: AchievementDefinition[] = [
  {
    id: 'STORY_PATHFINDER',
    name: 'Первооткрыватель Историй',
    description: 'Завершите свою первую игру в режиме "История".',
    icon: BookOpenText,
    check: ({ lastModelResponse, currentGameMode }) => {
      if (!lastModelResponse || currentGameMode !== 'story') return false;
      return lastModelResponse.xp_gained > 0 && lastModelResponse.game_data.mode === 'story';
    },
  },
  {
    id: 'WORD_MASTER',
    name: 'Мастер Слов',
    description: 'Правильно вспомните все 7 слов в режиме "Слова".',
    icon: MessageSquare,
    check: ({ lastModelResponse, currentGameMode }) => {
      if (!lastModelResponse || currentGameMode !== 'words') return false;
      const { correct_answers, total_items } = lastModelResponse.game_data;
      return correct_answers === 7 && total_items === 7;
    },
  },
  {
    id: 'ASSOCIATION_ACE',
    name: 'Ас Ассоциаций',
    description: 'Получите оценку 8/10 или выше в режиме "Ассоциации".',
    icon: Users,
    check: ({ lastModelResponse, currentGameMode }) => {
      if (!lastModelResponse || currentGameMode !== 'associations') return false;
      const { association_score } = lastModelResponse.game_data;
      return association_score !== undefined && association_score >= 8;
    },
  },
  {
    id: 'NOVICE_NEURONAUT',
    name: 'Начинающий Нейронавт',
    description: 'Заработайте свои первые 100 XP.',
    icon: Award,
    check: ({ xp }) => xp >= 100,
  },
  {
    id: 'FIVE_TIME_CHAMPION',
    name: 'Пятикратный Чемпион',
    description: 'Сыграйте 5 игр в любом режиме.',
    icon: Trophy,
    check: ({ gamesPlayed }) => gamesPlayed >= 5,
  },
];
