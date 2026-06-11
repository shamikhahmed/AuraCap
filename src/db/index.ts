import { openDB, type DBSchema, type IDBPDatabase } from 'idb';
import { DEFAULT_PROFILES } from '@/data';
import type { AuraState, LockscreenConfig, RoutineData } from '@/types';

export interface AuraDB extends DBSchema {
  state: { key: string; value: AuraState };
}

const DEFAULT_ROUTINE: RoutineData = {
  morning: [
    { id: 'm1', text: 'No phone for first 30 min', done: true },
    { id: 'm2', text: 'Check calendar and messages only', done: false },
    { id: 'm3', text: 'Enable Work Focus mode', done: false },
  ],
  day: [
    { id: 'd1', text: 'Batch notifications every 2 hours', done: true },
    { id: 'd2', text: 'Social apps: 30 min limit', done: false },
  ],
  evening: [
    { id: 'e1', text: 'Review completed tasks', done: false },
    { id: 'e2', text: 'Enable Personal Focus mode', done: true },
  ],
  night: [
    { id: 'n1', text: 'Enable Sleep Focus mode', done: true },
    { id: 'n2', text: 'Charge phone outside bedroom', done: true },
    { id: 'n3', text: 'Read instead of scroll', done: false },
  ],
  screenTimeGoal: 4,
};

const DEFAULT_LOCKSCREEN: LockscreenConfig = {
  device: 'iphone',
  preset: 'Minimal',
  background: 'linear-gradient(160deg,#050507,#0d0d20)',
  clockWeight: '200',
  clockStyle: 'letter-spacing:-2px',
  widget1: { emoji: '🏃', label: 'Activity' },
  widget2: { emoji: '🌤', label: 'Weather' },
  focusModes: { dnd: true, work: false, prayer: false, sleep: false },
};

export const DEFAULT_STATE: AuraState = {
  name: '',
  apps: [],
  layout: 'folders',
  device: 'iphone',
  model: 'iphone16promax',
  theme: 'dark',
  accent1: '#4f6ef7',
  accent2: '#7b5ea7',
  profiles: [...DEFAULT_PROFILES.map((p) => ({ ...p, apps: [...p.apps] }))],
  activeProfile: 'personal',
  versions: [],
  widgetDevice: 'iphone',
  widgetStack: [],
  lsDevice: 'iphone',
  lockscreen: DEFAULT_LOCKSCREEN,
  routine: DEFAULT_ROUTINE,
  wallpaperId: 'Void Black',
  demoMode: false,
  entered: false,
  onboardingDone: false,
};

let dbPromise: Promise<IDBPDatabase<AuraDB>> | null = null;

export function getDb() {
  if (!dbPromise) {
    dbPromise = openDB<AuraDB>('auraos-v5', 1, {
      upgrade(db) {
        db.createObjectStore('state', { keyPath: 'id' });
      },
    });
  }
  return dbPromise;
}

export async function loadState(): Promise<AuraState> {
  const db = await getDb();
  const row = await db.get('state', 'main');
  if (!row) return { ...DEFAULT_STATE };
  return {
    ...DEFAULT_STATE,
    ...row,
    profiles: row.profiles?.length ? row.profiles : DEFAULT_STATE.profiles,
    routine: row.routine ?? DEFAULT_ROUTINE,
    lockscreen: row.lockscreen ?? DEFAULT_LOCKSCREEN,
  };
}

export async function saveState(state: AuraState) {
  const db = await getDb();
  await db.put('state', { ...state, id: 'main' } as AuraState & { id: string });
}

export async function factoryReset() {
  const db = await getDb();
  await db.clear('state');
}

export function exportTxt(apps: string[]): string {
  return `AuraOS v5 — My App List\n========================\nTotal: ${apps.length} apps\n\n${apps.join('\n')}`;
}

export function exportJson(state: AuraState): string {
  return JSON.stringify(state, null, 2);
}
