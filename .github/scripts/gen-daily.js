#!/usr/bin/env node
// генерируем случайный ежедневный квест
const fs = require('fs');
const crypto = require('crypto');

const quests = [
  { title: 'Триумф ассоциаций',  desc: 'Сыграй 3 партии в ассоциации ≥ 8/10', target: 3, mode: 'associations', minScore: 8, xp: 50 },
  { title: 'Мастер слов',       desc: 'Правильно вспомни все 7 слов',        target: 1, mode: 'words',       minScore: 7, xp: 70 },
  { title: 'Исторический день', desc: 'Пройди историю без ошибок',           target: 1, mode: 'story',       minScore: 3, xp: 60 },
];

const pick = quests[Math.floor(Math.random() * quests.length)];
const daily = { id: crypto.randomUUID(), ...pick, completed: false, ts: Date.now() };

fs.writeFileSync('public/daily.json', JSON.stringify(daily, null, 2));
console.log('✅ daily.json создан:', daily.title);
