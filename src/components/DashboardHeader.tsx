import { BrainCircuit, Trophy, Award, Bell, ArrowLeft } from 'lucide-react';


interface DashboardHeaderProps {
    xp: number;
    achievementsCount: string;
    onOpenAchievements: () => void;
    onReset?: () => void;
    showBack?: boolean;
}

export function DashboardHeader({
    xp,
    achievementsCount,
    onOpenAchievements,
    onReset,
    showBack
}: DashboardHeaderProps) {
    return (
        <header className="mb-8">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    {showBack && onReset ? (
                        <button
                            onClick={onReset}
                            className="p-2 bg-white/10 rounded-xl text-white hover:bg-white/20 transition-colors"
                        >
                            <ArrowLeft className="w-6 h-6" />
                        </button>
                    ) : (
                        <div className="p-2 bg-bento-accent/10 rounded-xl">
                            <BrainCircuit className="w-6 h-6 text-bento-accent" />
                        </div>
                    )}
                    <h1 className="text-2xl font-bold text-white tracking-tight">NeuroVibe</h1>
                </div>

                <div className="flex items-center gap-3">
                    <button
                        onClick={onOpenAchievements}
                        className="relative p-2 text-bento-muted hover:text-white transition-colors"
                    >
                        <Trophy className="w-5 h-5" />
                        <span className="absolute -top-1 -right-1 min-w-[1.25rem] h-5 bg-green-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center ring-2 ring-bento-bg px-1">
                            {achievementsCount}
                        </span>
                    </button>

                    <div className="flex items-center gap-2 px-3 py-1.5 bg-bento-inner rounded-full border border-white/5">
                        <Award className="w-4 h-4 text-yellow-500" />
                        <span className="text-sm font-bold text-white">{xp} XP</span>
                    </div>
                </div>
            </div>

            {/* Notification Banner */}
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-violet-900/50 to-fuchsia-900/50 border border-white/10 p-4">
                <div className="flex items-start gap-4">
                    <div className="p-2 bg-white/10 rounded-full backdrop-blur-sm">
                        <Bell className="w-5 h-5 text-white" />
                    </div>
                    <div>
                        <h3 className="text-sm font-semibold text-white mb-1">Daily Streak 🔥</h3>
                        <p className="text-xs text-gray-300">You're on a roll! Complete one more module to reach your weekly goal.</p>
                    </div>
                </div>
            </div>
        </header>
    );
}
