// src/components/PersonaRadio.tsx
import { Persona } from '../types';

const personas = [
  { id: 'demon' as const, name: 'Злобный Саркастичный Демон', emoji: '😈' },
  { id: 'cyborg' as const, name: 'Холодный Научный Киборг', emoji: '🤖' },
  { id: 'grandpa' as const, name: 'Добрый Старый Дед', emoji: '👴' },
];

export const PersonaRadio = ({ value, onChange }: { value: Persona; onChange: (p: Persona) => void }) => (
  <div className="flex gap-3 justify-center mb-4">
    {personas.map((p) => (
      <label key={p.id} className="cursor-pointer">
        <input
          type="radio"
          name="persona"
          checked={value === p.id}
          onChange={() => onChange(p.id)}
          className="sr-only"
          aria-label={p.name}
        />
        <div
          className={`px-4 py-2 rounded-full border-2 transition-all duration-200 ${
            value === p.id 
              ? 'border-violet-600 bg-violet-100 text-violet-900 shadow-md' 
              : 'border-gray-300 hover:border-gray-400'
          }`}
        >
          <span className="mr-2 text-lg">{p.emoji}</span>
          <span className="text-sm font-medium">{p.name}</span>
        </div>
      </label>
    ))}
  </div>
);
