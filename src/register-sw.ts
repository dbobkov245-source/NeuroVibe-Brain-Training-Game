import { Workbox } from 'workbox-window';

// Регистрация Service Worker для PWA
if ('serviceWorker' in navigator) {
  const wb = new Workbox('/sw.js');

  // Событие активации SW
  wb.addEventListener('activated', (event) => {
    console.log('✅ Service Worker активирован', event);
    
    // Опционально: подписка на push-уведомления
    // subscribeToPushNotifications();
  });

  // Событие обновления SW
  wb.addEventListener('waiting', () => {
    console.log('🔄 Доступно обновление приложения');
    
    // Можно показать toast с кнопкой "Обновить"
    if (confirm('Доступна новая версия NeuroVibe. Обновить?')) {
      wb.messageSkipWaiting();
      window.location.reload();
    }
  });

  // Регистрируем SW
  wb.register()
    .then(() => console.log('✅ Service Worker зарегистрирован'))
    .catch((err) => console.error('❌ Ошибка регистрации SW:', err));
}

/**
 * Подписка на push-уведомления (опционально)
 * Требует VAPID ключи в .env
 */
async function subscribeToPushNotifications() {
  try {
    // Проверяем поддержку Push API
    if (!('PushManager' in window)) {
      console.warn('⚠️ Push API не поддерживается');
      return;
    }

    // Получаем registration
    const registration = await navigator.serviceWorker.ready;

    // Проверяем разрешения
    const permission = await Notification.requestPermission();
    if (permission !== 'granted') {
      console.log('🔕 Уведомления отклонены пользователем');
      return;
    }

    // Получаем VAPID ключ из env (если есть)
    const vapidPublicKey = import.meta.env.VITE_VAPID_PUBLIC;
    if (!vapidPublicKey) {
      console.warn('⚠️ VAPID ключ не настроен');
      return;
    }

    // Подписываемся на push
    const subscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(vapidPublicKey)
    });

    // Отправляем подписку на сервер
    await fetch('/api/save-sub', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(subscription)
    });

    console.log('✅ Push уведомления включены');

  } catch (error) {
    console.error('❌ Ошибка подписки на push:', error);
  }
}

/**
 * Конвертер base64 VAPID ключа
 */
function urlBase64ToUint8Array(base64String: string): Uint8Array {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/-/g, '+')
    .replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}
