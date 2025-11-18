import React from 'react';
import { Persona } from '../types';

const personas = [
  { id: 'demon' as const, name: 'Саркастичный Демон', emoji: '😈' },
  { id: 'cyborg' as const, name: 'Научный Киборг', emoji: '🤖' },
  { id: 'grandpa' as const, name: 'Добрый Дед', emoji: '👴🏻' },
];

export const PersonaRadio = ({ value, onChange }: { value: Persona; onChange: (p: Persona) => void }) => (
  <div className="flex gap-3 justify-center mb-4">
    {personas.map((p) => (
      <label key={p.id} className="cursor-pointer">
        <input
          type="radio"
          name="persona"
          checked={value === p.id}
          onChange={() => onChange(p.id)} // ✅ Убран cast, используем 'as const'
          className="sr-only"
        />
        <div
          className={`px-4 py-2 rounded-full border-2 transition ${
            value === p.id ? 'border-violet-600 bg-violet-100' : 'border-gray-300'
          }`}
        >
          <span className="mr-2">{p.emoji}</span>
          {p.name}
        </div>
      </label>
    ))}
  </div>
);
