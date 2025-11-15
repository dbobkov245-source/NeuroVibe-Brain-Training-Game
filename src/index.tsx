import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Более надежная регистрация сервис-воркера
if ('serviceWorker' in navigator) {
  // Мы регистрируем сервис-воркер немедленно, не дожидаясь события 'load'.
  // Это более надежно в современных SPA, где событие 'load' может уже произойти
  // к моменту выполнения этого скрипта.
  navigator.serviceWorker.register('/sw.js', { scope: '/' })
    .then(registration => {
      console.log('✅ ServiceWorker registration successful with scope: ', registration.scope);
    })
    .catch(error => {
      // Выводим конкретную ошибку в консоль для облегчения отладки.
      console.error('❌ ServiceWorker registration failed: ', error);
    });
}
