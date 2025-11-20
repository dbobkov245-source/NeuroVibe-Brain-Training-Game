import React from 'react';
import { twMerge } from 'tailwind-merge';

interface BentoGridProps {
    children: React.ReactNode;
    className?: string;
}

interface BentoCardProps {
    children: React.ReactNode;
    className?: string;
    onClick?: () => void;
    title?: string;
    description?: string;
    icon?: React.ReactNode;
    header?: React.ReactNode;
    variant?: 'default' | 'gold';
}

export function BentoGrid({ children, className }: BentoGridProps) {
    return (
        <div className={twMerge("grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[minmax(180px,auto)]", className)}>
            {children}
        </div>
    );
}

export function BentoCard({
    children,
    className,
    onClick,
    title,
    description,
    icon,
    header,
    variant = 'default'
}: BentoCardProps) {
    return (
        <div
            onClick={onClick}
            className={twMerge(
                "group relative flex flex-col justify-between rounded-3xl p-6 transition-all duration-300", // Removed overflow-hidden and hover styles
                variant === 'gold' ? "glass-card glass-card-gold" : "glass-card", // Conditional glass-card classes
                onClick && "cursor-pointer active:scale-95",
                className
            )}
        >
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            {header && <div className="mb-4">{header}</div>}

            <div className="relative z-10 flex flex-col h-full">
                <div className="flex-grow">
                    {icon && (
                        <div className="mb-4 text-bento-accent p-3 bg-bento-inner rounded-2xl w-fit group-hover:text-white group-hover:bg-bento-accent transition-colors duration-300">
                            {icon}
                        </div>
                    )}
                    {children}
                </div>

                {(title || description) && (
                    <div className="mt-4">
                        {title && (
                            <h3 className="text-lg font-bold text-white group-hover:text-glow transition-all duration-300">
                                {title}
                            </h3>
                        )}
                        {description && (
                            <p className="text-sm text-bento-muted mt-1 group-hover:text-gray-300 transition-colors">
                                {description}
                            </p>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
