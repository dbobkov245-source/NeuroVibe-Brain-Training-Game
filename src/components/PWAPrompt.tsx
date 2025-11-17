import React, { useCallback } from 'react';
import { Download, X } from './Icons';

interface PWAPromptProps {
  onInstall: () => void;
  onDismiss: () => void;
}

export const PWAPrompt: React.FC<PWAPromptProps> = ({ onInstall, onDismiss }) => {
  return (
    <div className="fixed top-5 left-1/2 -translate-x-1/2 z-50 w-full max-w-sm animate-fade-in-down">
      <div className="bg-white rounded-xl shadow-2xl p-4 border border-violet-200 flex items-center space-x-4">
        <div className="flex-shrink-0 p-3 bg-violet-100 text-violet-600 rounded-full">
          <Download className="w-7 h-7" />
        </div>
        <div className="flex-grow">
          <p className="font-bold text-gray-800">Установить NeuroVibe?</p>
          <p className="text-sm text-gray-600">Играй офлайн и быстрее!</p>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={onInstall}
            className="px-3 py-1 bg-violet-600 text-white rounded-lg text-sm font-semibold hover:bg-violet-700 transition-colors"
          >
            Установить
          </button>
          <button 
            onClick={onDismiss}
            className="p-1 text-gray-400 hover:text-gray-700"
          >
            <X className="w-5 h-5" />
          </button>
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
