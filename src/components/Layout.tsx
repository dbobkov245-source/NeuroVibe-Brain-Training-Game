import React from 'react';
import { twMerge } from 'tailwind-merge';

interface LayoutProps {
    children: React.ReactNode;
    className?: string;
}

export function Layout({ children, className }: LayoutProps) {
    return (
        <div className="min-h-screen w-full bg-bento-bg text-bento-text font-sans selection:bg-bento-accent/30 selection:text-bento-accent overflow-x-hidden">
            <div className="fixed inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(139,92,246,0.15),transparent_50%)] pointer-events-none" />
            <main className={twMerge("relative z-10 max-w-md mx-auto px-4 py-6 sm:max-w-2xl md:max-w-4xl lg:max-w-6xl", className)}>
                {children}
            </main>
        </div>
    );
}
