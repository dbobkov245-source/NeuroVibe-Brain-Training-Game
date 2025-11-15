import React from 'react';
import { Achievement, AchievementId } from '../types';
import { X } from './Icons';

interface AchievementsPanelProps {
  isOpen: boolean;
  onClose: () => void;
  allAchievements: Achievement[];
  unlockedIds: Set<AchievementId>;
}

export const AchievementsPanel: React.FC<AchievementsPanelProps> = ({ isOpen, onClose, allAchievements, unlockedIds }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 z-40 flex items-center justify-center p-4" onClick={onClose}>
      <div 
        className="bg-white rounded-2xl shadow-xl w-full max-w-md relative animate-fade-in-up"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-800">Достижения</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-700">
            <X className="w-6 h-6" />
          </button>
        </div>
        <div className="p-6 max-h-[60vh] overflow-y-auto space-y-4">
          {allAchievements.map((ach) => {
            const isUnlocked = unlockedIds.has(ach.id);
            const Icon = ach.icon;
            return (
              <div key={ach.id} className={`flex items-center space-x-4 transition-opacity duration-300 ${isUnlocked ? 'opacity-100' : 'opacity-50'}`}>
                <div className={`p-3 rounded-full ${isUnlocked ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className={`font-semibold ${isUnlocked ? 'text-gray-800' : 'text-gray-500'}`}>{ach.name}</h3>
                  <p className="text-sm text-gray-500">{ach.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};