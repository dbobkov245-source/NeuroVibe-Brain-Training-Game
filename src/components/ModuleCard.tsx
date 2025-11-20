import React from 'react';
import { BentoCard } from './BentoGrid';
import { ArrowRight } from 'lucide-react';
import { clsx } from 'clsx';

interface ModuleCardProps {
    title: string;
    description: string;
    icon: React.ReactNode;
    onClick: () => void;
    colorClass?: string; // e.g., "text-blue-500", "bg-blue-500"
    delay?: number; // Animation delay index
}

export function ModuleCard({
    title,
    description,
    icon,
    onClick,
    colorClass = "text-violet-500",
    delay = 0
}: ModuleCardProps) {
    return (
        <BentoCard
            onClick={onClick}
            className={clsx(
                "animate-fade-in-up",
                delay === 1 && "animation-delay-100",
                delay === 2 && "animation-delay-200"
            )}
            icon={
                <div className={clsx("transition-colors duration-300", colorClass)}>
                    {icon}
                </div>
            }
            title={title}
            description={description}
        >
            <div className="absolute bottom-6 right-6 opacity-0 transform translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                <div className="p-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/10">
                    <ArrowRight className="w-4 h-4 text-white" />
                </div>
            </div>
        </BentoCard>
    );
}
