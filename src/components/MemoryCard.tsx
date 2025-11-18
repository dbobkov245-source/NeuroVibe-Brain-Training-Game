import React, { useState } from 'react';
import { EyeOff } from './Icons';

interface MemoryCardProps {
  content: string;
  onReady: () => void;
}

export const MemoryCard: React.FC<MemoryCardProps> = ({ content, onReady }) => {
  const [isVisible, setIsVisible] = useState(true);

  const handleReady = () => {
    setIsVisible(false);
    setTimeout(onReady, 300); // Плавное исчезание
  };

  if (!isVisible) return null;

  return (
    <div className="bg-white border-2 border-violet-200 rounded-xl p-6 shadow-lg mb-4 animate-fade-in-up">
      <div className="flex items-center gap-2 mb-3">
        <EyeOff className="w-5 h-5 text-violet-600" />
        <span className="text-sm font-semibold text-violet-700">ЗАПОМНИТЕ ЭТО</span>
      </div>
      <div 
        className="text-gray-800 text-lg leading-relaxed"
        dangerouslySetInnerHTML={{ __html: content }} 
      />
      <button
        onClick={handleReady}
        className="mt-4 w-full bg-violet-600 text-white py-3 rounded-lg font-semibold hover:bg-violet-700 transition-colors"
      >
        ГОТОВ (скрыть)
      </button>
      <style>{`
        @keyframes fade-in-up {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up { animation: fade-in-up 0.3s ease-out forwards; }
      `}</style>
    </div>
  );
};
