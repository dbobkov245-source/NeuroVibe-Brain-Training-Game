import { Workbox } from 'workbox-window';

if ('serviceWorker' in navigator) {
  const wb = new Workbox('/sw.js');
  
  wb.addEventListener('activated', (event) => {
    console.log('✅ Service Worker активирован', event);
  });

  wb.addEventListener('waiting', () => {
    console.log('🔔 Доступно обновление приложения');
    if (confirm('Доступна новая версия NeuroVibe. Обновить?')) {
      wb.messageSkipWaiting();
      window.location.reload();
    }
  });

  wb.register()
    .then(() => console.log('✅ Service Worker зарегистрирован'))
    .catch((err) => console.error('❌ Ошибка регистрации SW:', err));
}
