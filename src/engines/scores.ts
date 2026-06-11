import { APPS } from '@/data';
import type { Scores } from '@/types';

export function countCat(apps: string[], cats: string[]): number {
  return apps.filter((nm) => {
    const a = APPS.find((x) => x.n === nm);
    return a && cats.includes(a.c);
  }).length;
}

export function calcScores(apps: string[]): Scores {
  const n = apps.length;
  if (!n) return { aura: 0, focus: 0, clarity: 0, org: 0 };
  const social = countCat(apps, ['social', 'messaging']);
  const games = countCat(apps, ['games']);
  const prod = countCat(apps, ['productivity', 'notes']);
  const distraction = Math.min(100, Math.round(((social + games) / n) * 200));
  const focus = Math.max(0, 100 - distraction + Math.round((prod / n) * 100));
  const clarity = Math.max(0, 100 - Math.round(n / 5));
  const org = Math.min(95, 60 + Math.round((prod / Math.max(1, n)) * 100));
  const aura = Math.round((Math.min(100, focus) + Math.min(100, clarity) + Math.min(100, org)) / 3);
  return {
    aura: Math.min(100, aura),
    focus: Math.min(100, focus),
    clarity: Math.min(100, clarity),
    org: Math.min(100, org),
  };
}

export function getInsight(apps: string[]): string {
  if (!apps.length) return 'Import your apps for personalized insights.';
  const crypto = countCat(apps, ['crypto']);
  const social = countCat(apps, ['social', 'messaging']);
  const games = countCat(apps, ['games']);
  if (crypto > 5) return `Crypto-heavy setup (${crypto} apps). Consider a dedicated Crypto folder.`;
  if (games > 15) return `You have ${games} games — gaming is a big part of your digital life.`;
  if (social > 8) return `${social} social apps. Your phone is your social hub.`;
  return `${apps.length} apps imported. Run Digital DNA for full analysis.`;
}
