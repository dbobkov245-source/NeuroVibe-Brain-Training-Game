import { useEffect, useState } from 'react';
import { DailyQuest } from '../types';

const DAY_MS = 24 * 60 * 60 * 1000;

export function useDailyQuest() {
  const [quest, setQuest] = useState<DailyQuest | null>(null);

  useEffect(() => {
    const raw = localStorage.getItem('dailyQuest');
    const saved = raw ? JSON.parse(raw) : null;
    const now = Date.now();
    if (!saved || now - saved.ts > DAY_MS) {
      const fresh: DailyQuest = {
        id: crypto.randomUUID(),
        title: 'Триумф ассоциаций',
        description: 'Сыграй 3 партии в ассоциации подряд с оценкой ≥ 8/10',
        target: 3,
        mode: 'associations',
        minScore: 8,
        xp: 50,
        completed: false,
        ts: now,
      };
      localStorage.setItem('dailyQuest', JSON.stringify({ ...fresh, ts: now }));
      setQuest(fresh);
    } else setQuest(saved);
  }, []);

  const complete = () => {
    if (!quest) return;
    const done = { ...quest, completed: true };
    localStorage.setItem('dailyQuest', JSON.stringify({ ...done, ts: Date.now() }));
    setQuest(done);
  };

  return { quest, complete };
}
