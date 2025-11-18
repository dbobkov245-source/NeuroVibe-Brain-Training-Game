import { get } from '@vercel/edge-config';
import webpush from 'web-push';

webpush.setVapidDetails('mailto:you@site.com', process.env.VAPID_PUBLIC!, process.env.VAPID_PRIVATE!);

export default async (req: VercelRequest, res: VercelResponse) => {
  if (req.headers.authorization !== `Bearer ${process.env.CRON_SECRET!}`) return res.status(401).end();
  const subs = await get('pushSubs'); // массив {endpoint, keys}
  await Promise.all(
    subs.map((sub: any) => webpush.sendNotification(sub, JSON.stringify({ body: '9:00 – время тренировки!' })))
  );
  res.status(200).json({ sent: subs.length });
};
