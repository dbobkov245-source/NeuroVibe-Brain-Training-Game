import React from 'react';
import { Persona } from '../types';
import { Bot, User, Zap } from 'lucide-react';

interface RoleSelectorProps {
    currentPersona: Persona;
    onChange: (persona: Persona) => void;
}

export function RoleSelector({ currentPersona, onChange }: RoleSelectorProps) {
    const roles: { id: Persona; name: string; icon: React.ReactNode; color: string }[] = [
        {
            id: 'demon',
            name: 'Злобный Саркастичный Демон',
            icon: <Zap className="w-8 h-8" />,
            color: 'text-purple-600 bg-purple-100 border-purple-200'
        },
        {
            id: 'cyborg',
            name: 'Холодный Научный Киборг',
            icon: <Bot className="w-8 h-8" />,
            color: 'text-blue-600 bg-blue-100 border-blue-200'
        },
        {
            id: 'grandpa',
            name: 'Добрый Старый Дед',
            icon: <User className="w-8 h-8" />,
            color: 'text-orange-600 bg-orange-100 border-orange-200'
        }
    ];

    return (
        <div className="grid grid-cols-3 gap-3 mb-6">
            {roles.map((role) => {
                const isSelected = currentPersona === role.id;
                return (
                    <button
                        key={role.id}
                        onClick={() => onChange(role.id)}
                        className={`
              relative flex flex-col items-center justify-center p-3 rounded-2xl transition-all duration-300
              ${isSelected
                                ? 'bg-white shadow-lg scale-105 border-2 border-violet-500 z-10'
                                : 'bg-white/50 border border-gray-200 hover:bg-white hover:shadow-md'
                            }
            `}
                    >
                        <div className={`p-3 rounded-full mb-2 ${role.color}`}>
                            {role.icon}
                        </div>
                        <span className={`text-xs font-bold text-center leading-tight ${isSelected ? 'text-gray-900' : 'text-gray-600'}`}>
                            {role.name}
                        </span>
                    </button>
                );
            })}
        </div>
    );
}
