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
      className="flex flex-col items-center justify-center text-center p-4 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-lg hover:border-violet-400 hover:bg-violet-50 transition-all duration-200"
    >
      <div className="p-3 bg-violet-100 text-violet-600 rounded-full mb-3">
        {icon}
      </div>
      <span className="font-semibold text-gray-800">{title}</span>
      <span className="text-sm text-gray-500">{description}</span>
    </button>
  );
};
