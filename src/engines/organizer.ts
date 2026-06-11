import { APPS, SMART_FOLDERS } from '@/data';

export interface SmartFolderResult {
  name: string;
  emoji: string;
  color: string;
  apps: string[];
}

export function buildSmartFolders(userApps: string[]): SmartFolderResult[] {
  const n = userApps.length;
  return SMART_FOLDERS.map((f) => {
    const myApps = n > 0
      ? userApps.filter((nm) => {
          const a = APPS.find((x) => x.n === nm);
          return a && (f.cats as readonly string[]).some((c) => a.c === c);
        })
      : APPS.filter((a) => (f.cats as readonly string[]).includes(a.c)).slice(0, 4).map((a) => a.n);
    return { name: f.n, emoji: f.e, color: f.col, apps: myApps };
  }).filter((f) => f.apps.length > 0 || n === 0);
}

export const DISTRACTION_LIST = [
  { n: 'TikTok', e: '🎵', r: 'Avg 2.4h/day', l: 'high' as const },
  { n: 'Instagram', e: '📸', r: 'Avg 1.8h/day', l: 'high' as const },
  { n: 'YouTube', e: '▶', r: 'Avg 2.0h/day', l: 'high' as const },
  { n: 'Twitter/X', e: '🐦', r: 'Avg 1.1h/day', l: 'medium' as const },
  { n: 'Reddit', e: '🤖', r: 'Avg 45min/day', l: 'medium' as const },
  { n: 'PUBG Mobile', e: '🎯', r: 'Multiple sessions', l: 'high' as const },
  { n: 'Free Fire', e: '🔥', r: 'Multiple sessions', l: 'high' as const },
];
