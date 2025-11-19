// src/components/PersonaRadio.tsx
import { Persona } from '../types';

const personas = [
  { id: 'demon' as const, name: 'Злобный Саркастичный Демон', emoji: '😈' },
  { id: 'cyborg' as const, name: 'Холодный Научный Киборг', emoji: '🤖' },
  { id: 'grandpa' as const, name: 'Добрый Старый Дед', emoji: '👴' },
];

export const PersonaRadio = ({ value, onChange }: { value: Persona; onChange: (p: Persona) => void }) => (
  <div className="w-full overflow-x-auto pb-4 -mx-4 px-4 scrollbar-hide">
    <div className="flex gap-3 min-w-min">
      {personas.map((p) => (
        <label key={p.id} className="cursor-pointer flex-shrink-0">
          <input
            type="radio"
            name="persona"
            checked={value === p.id}
            onChange={() => onChange(p.id)}
            className="sr-only"
            aria-label={p.name}
          />
          <div
            className={`flex flex-col items-center justify-center w-28 h-28 rounded-2xl border-2 transition-all duration-300 ${value === p.id
                ? 'border-violet-500 bg-white shadow-lg shadow-violet-200 scale-105'
                : 'border-transparent bg-white/60 hover:bg-white hover:shadow-md'
              }`}
          >
            <span className="text-4xl mb-2 filter drop-shadow-sm">{p.emoji}</span>
            <span className={`text-xs font-bold text-center px-2 leading-tight ${value === p.id ? 'text-violet-700' : 'text-gray-500'
              }`}>
              {p.name.split(' ').slice(0, 2).join(' ')}
              <br />
              {p.name.split(' ').slice(2).join(' ')}
            </span>
          </div>
        </label>
      ))}
    </div>
  </div>
);
