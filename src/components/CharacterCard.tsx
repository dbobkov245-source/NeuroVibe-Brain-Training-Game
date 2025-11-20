import { BentoCard } from './BentoGrid';
import { Persona } from '../types';
import { Bot } from 'lucide-react';

interface CharacterCardProps {
    currentPersona: Persona;
    onChange: (persona: Persona) => void;
}

export function CharacterCard({ currentPersona, onChange }: CharacterCardProps) {
    const isDemon = currentPersona === 'demon';

    return (
        <BentoCard
            className="aspect-square flex flex-col items-center justify-center text-center p-4"
            onClick={() => onChange(isDemon ? 'friendly' : 'demon')}
        >
            <div className="mb-3 p-3 rounded-full bg-blue-500/20 shadow-[0_0_15px_rgba(59,130,246,0.3)]">
                <Bot className="w-8 h-8 text-blue-400" />
            </div>
            <span className="text-sm font-medium text-gray-300">ВайбБот</span>
            <div className="mt-2 text-xs text-bento-muted px-2 py-0.5 rounded-full bg-white/5 border border-white/5">
                {isDemon ? 'Демон' : 'Друг'}
            </div>
        </BentoCard>
    );
}
