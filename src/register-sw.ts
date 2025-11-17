import { Workbox } from 'workbox-window';

if ('serviceWorker' in navigator) {
  const wb = new Workbox('/sw.js');

  wb.addEventListener('installed', (event) => {
    if (event.isUpdate) {
      // New content available, show refresh prompt
      if (confirm('Доступно обновление NeuroVibe! Обновить страницу?')) {
        window.location.reload();
      }
    }
  });

  wb.register();
}
