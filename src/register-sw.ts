import { Workbox } from 'workbox-window';

// ✅ Правильный тип для Vite
declare const VITE_VAPID_PUBLIC: string;

const VAPID_PUBLIC = (import.meta as any).env?.VITE_VAPID_PUBLIC || VITE_VAPID_PUBLIC;

async function subscribePush(sw: ServiceWorker) {
  const sub = await sw.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: VAPID_PUBLIC,
  });
  // сохраняем подписку в Edge Config (или БД)
  await fetch('/api/save-sub', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(sub),
  });
}

if ('serviceWorker' in navigator) {
  const wb = new Workbox('/sw.js');

  wb.addEventListener('activated', async () => {
    const sw = await wb.getSW(); // ✅ Исправлено: getSW() возвращает ServiceWorker
    if ('pushManager' in sw) {
      await subscribePush(sw);
    }
  });

  wb.register();
}
