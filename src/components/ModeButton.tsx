import React from 'react';

interface ModeButtonProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  onClick: () => void;
}

export const ModeButton: React.FC<ModeButtonProps> = ({ icon, title, description, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="group relative flex flex-col items-center justify-center text-center p-6 bg-white/80 backdrop-blur-sm border border-white/50 rounded-3xl shadow-sm hover:shadow-xl hover:scale-[1.02] transition-all duration-300 overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-violet-50/50 to-fuchsia-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div className="relative z-10 p-4 bg-gradient-to-br from-violet-100 to-fuchsia-50 text-violet-600 rounded-2xl mb-4 group-hover:scale-110 transition-transform duration-300 shadow-inner">
        {icon}
      </div>

      <span className="relative z-10 font-bold text-gray-800 text-lg mb-1 group-hover:text-violet-700 transition-colors">
        {title}
      </span>

      <span className="relative z-10 text-sm text-gray-500 leading-relaxed group-hover:text-gray-600">
        {description}
      </span>
    </button>
  );
};
