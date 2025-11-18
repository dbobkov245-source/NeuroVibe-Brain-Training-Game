import React, { useEffect, useRef } from 'react'; // ✅ Добавлены импорты

export const Confetti = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // ✅ Простая CSS анимация вместо lottie
    if (ref.current) {
      ref.current.innerHTML = `
        <style>
          @keyframes confetti-fall {
            0% { transform: translateY(-100vh) rotate(0deg); opacity: 1; }
            100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
          }
          .confetti-piece {
            position: absolute;
            width: 10px;
            height: 10px;
            animation: confetti-fall 3s ease-out forwards;
          }
        </style>
        ${Array.from({ length: 50 }, (_, i) => `
          <div class="confetti-piece" style="
            left: ${Math.random() * 100}%;
            background: hsl(${Math.random() * 360}, 70%, 50%);
            animation-delay: ${Math.random() * 0.5}s;
            animation-duration: ${2 + Math.random() * 2}s;
          "></div>
        `).join('')}
      `;
    }
  }, []);

  return <div ref={ref} className="pointer-events-none fixed inset-0 z-50" />;
};
