export const NeoButton = ({ children, onClick, className = '' }: React.PropsWithChildren<{ onClick: () => void }>) => (
  <button
    onClick={onClick}
    className={`px-6 py-3 rounded-xl text-white font-semibold
      bg-gray-200 dark:bg-gray-800
      shadow-[6px_6px_12px_rgba(0,0,0,0.15),-6px_-6px_12px_rgba(255,255,255,0.7)]
      active:shadow-[inset_4px_4px_8px_rgba(0,0,0,0.15),inset_-4px_-4px_8px_rgba(255,255,255,0.7)]
      transition-shadow duration-200 ${className}`}
  >
    {children}
  </button>
);
