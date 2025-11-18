import { useEffect, useState } from 'react';
import { DailyQuest } from '../types';

const DAY_MS = 24 * 60 * 60 * 1000;

export function useDailyQuest() {
  const [quest, setQuest] = useState<DailyQuest | null>(null);

  useEffect(() => {
    const loadQuest = () => {
      const raw = localStorage.getItem('dailyQuest');
      const saved = raw ? JSON.parse(raw) : null;
      const now = Date.now();
      
      if (!saved || now - saved.ts > DAY_MS) {
        const quests = [
          { title: 'Триумф ассоциаций', desc: 'Сыграй 3 партии в ассоциации ≥ 8/10', target: 3, mode: 'associations', minScore: 8, xp: 50 },
          { title: 'Мастер слов', desc: 'Правильно вспомни все 7 слов', target: 1, mode: 'words', minScore: 7, xp: 70 },
          { title: 'Исторический день', desc: 'Пройди историю без ошибок', target: 1, mode: 'story', minScore: 3, xp: 60 },
        ];
        const pick = quests[Math.floor(Math.random() * quests.length)];
        const fresh: DailyQuest = {
          id: crypto.randomUUID(),
          title: pick.title,
          description: pick.desc,
          target: pick.target,
          mode: pick.mode as any,
          minScore: pick.minScore,
          xp: pick.xp,
          completed: false,
          ts: now,
        };
        localStorage.setItem('dailyQuest', JSON.stringify(fresh));
        setQuest(fresh);
      } else {
        setQuest(saved);
      }
    };
    
    loadQuest();
    const interval = setInterval(loadQuest, DAY_MS);
    return () => clearInterval(interval);
  }, []);

  const complete = () => {
    if (!quest) return;
    const done = { ...quest, completed: true };
    localStorage.setItem('dailyQuest', JSON.stringify({ ...done, ts: Date.now() }));
    setQuest(done);
  };

  return { quest, complete };
}
