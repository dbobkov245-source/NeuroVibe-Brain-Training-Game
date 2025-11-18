import React, { useEffect } from 'react';
import { Achievement } from '../types';

interface AchievementToastProps {
  achievement: Achievement;
  onClose: () => void;
}

export const AchievementToast: React.FC<AchievementToastProps> = ({ achievement, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 4000);

    return () => clearTimeout(timer);
  }, [onClose]);

  const Icon = achievement.icon;

  return (
    <div 
      className="fixed top-5 left-1/2 -translate-x-1/2 z-50 w-full max-w-sm animate-fade-in-down"
      onClick={onClose}
    >
      <div className="bg-white rounded-xl shadow-2xl p-4 border border-green-200 flex items-center space-x-4 cursor-pointer">
        <div className="flex-shrink-0 p-3 bg-green-100 text-green-600 rounded-full">
          <Icon className="w-7 h-7" />
        </div>
        <div>
          <p className="font-bold text-gray-800">Достижение открыто!</p>
          <p className="text-gray-600">{achievement.name}</p>
        </div>
      </div>
      <style>{`
        @keyframes fade-in-down {
          0% { opacity: 0; transform: translate(-50%, -20px); }
          100% { opacity: 1; transform: translate(-50%, 0); }
        }
        .animate-fade-in-down { animation: fade-in-down 0.5s ease-out forwards; }
      `}</style>
    </div>
  );
};
