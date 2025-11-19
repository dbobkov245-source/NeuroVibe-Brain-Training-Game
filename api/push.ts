import type { VercelRequest, VercelResponse } from '@vercel/node';
import { get } from '@vercel/edge-config';
import webpush from 'web-push';

// Настройка VAPID (лучше вынести mailto тоже в переменную, но пока оставим так)
webpush.setVapidDetails(
  'mailto:you@site.com',
  process.env.VAPID_PUBLIC!,
  process.env.VAPID_PRIVATE!
);

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Проверка авторизации (CRON_SECRET)
  if (req.headers.authorization !== `Bearer ${process.env.CRON_SECRET!}`) {
    return res.status(401).end('Unauthorized');
  }

  try {
    // Получаем данные из Edge Config
    const subs = await get('pushSubs');

    // Проверяем, что subs существует и является массивом
    if (!subs || !Array.isArray(subs)) {
      console.log('No subscriptions found or invalid format');
      return res.status(200).json({ sent: 0, message: 'No subs found' });
    }

    // Отправляем уведомления
    await Promise.all(
      subs.map(async (sub: any) => {
        try {
          await webpush.sendNotification(
            sub,
            JSON.stringify({ body: '9:00 – время тренировки!' })
          );
        } catch (error) {
          console.error('Error sending to sub:', error);
          // Здесь можно добавить логику удаления невалидной подписки, если нужно
        }
      })
    );

    return res.status(200).json({ sent: subs.length });
  } catch (error) {
    console.error('Handler error:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
