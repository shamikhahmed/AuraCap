export type DeviceType = 'iphone' | 'ipad' | 'mac';
export type LayoutType = 'folders' | 'pages' | 'minimal' | 'hybrid' | 'alpha' | 'freq';
export type ThemeMode = 'dark' | 'light';

export interface AppEntry {
  n: string;
  e: string;
  c: string;
}

export interface Wallpaper {
  n: string;
  t: string;
  c: string;
  bg: string;
  e: string;
}

export interface Widget {
  n: string;
  e: string;
  d: string;
}

export interface Profile {
  id: string;
  name: string;
  emoji: string;
  color: string;
  apps: string[];
  device: DeviceType;
  model: string;
  aesthetic: string;
  desc: string;
}

export interface VersionSnapshot {
  id: string;
  name: string;
  date: string;
  appCount: number;
  device: DeviceType;
  model: string;
  aesthetic: string;
  layout: LayoutType;
  color: string;
}

export interface Habit {
  id: string;
  text: string;
  done: boolean;
}

export interface RoutineData {
  morning: Habit[];
  day: Habit[];
  evening: Habit[];
  night: Habit[];
  screenTimeGoal: number;
}

export interface LockscreenConfig {
  device: 'iphone' | 'ipad';
  preset: string;
  background: string;
  clockWeight: string;
  clockStyle: string;
  widget1: { emoji: string; label: string };
  widget2: { emoji: string; label: string };
  focusModes: Record<string, boolean>;
}

export interface AuraState {
  name: string;
  apps: string[];
  layout: LayoutType;
  device: DeviceType;
  model: string;
  theme: ThemeMode;
  accent1: string;
  accent2: string;
  profiles: Profile[];
  activeProfile: string;
  versions: VersionSnapshot[];
  widgetDevice: DeviceType;
  widgetStack: Widget[];
  lsDevice: 'iphone' | 'ipad';
  lockscreen: LockscreenConfig;
  routine: RoutineData;
  wallpaperId: string;
  demoMode: boolean;
  entered: boolean;
  onboardingDone: boolean;
}

export interface Scores {
  aura: number;
  focus: number;
  clarity: number;
  org: number;
}

export interface DnaResult {
  profile: { name: string; emoji: string; desc: string };
  dimensions: Record<string, { cnt: number; pct: number }>;
  categoryCounts: Record<string, number>;
  locations: Array<{ emoji: string; name: string; count: number }>;
  redundancies: Array<{ label: string; found: string[] }>;
  distractions: string[];
  recommendations: string[];
}
