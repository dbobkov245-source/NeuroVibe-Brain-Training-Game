import { expect, test } from 'vitest';
import { ACHIEVEMENTS } from './achievements';

test('SARCASM_KING unlocks at score 9', () => {
  const ach = ACHIEVEMENTS.find(a => a.id === 'SARCASM_KING')!;
  const ctx = {
    xp: 0,
    gamesPlayed: 0,
    currentGameMode: 'associations',
    lastModelResponse: { association_score: 9, xp_gained: 10, game_data: { mode: 'associations' } },
  };
  expect(ach.check(ctx)).toBe(true);
});
