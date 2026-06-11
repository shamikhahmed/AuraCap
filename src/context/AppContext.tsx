import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { DEFAULT_STATE, exportJson, exportTxt, factoryReset, loadState, saveState } from '@/db';
import { computeDna } from '@/engines/dna';
import { calcScores } from '@/engines/scores';
import { SAMPLE_LIST } from '@/data';
import type { AuraState, DeviceType, LayoutType, Profile, VersionSnapshot, Widget } from '@/types';

interface Toast { id: number; message: string }

interface AppContextValue {
  state: AuraState;
  ready: boolean;
  scores: ReturnType<typeof calcScores>;
  dna: ReturnType<typeof computeDna> | null;
  toasts: Toast[];
  activeProfile: Profile;
  setState: (patch: Partial<AuraState>) => void;
  persist: (patch: Partial<AuraState>) => Promise<void>;
  toast: (message: string) => void;
  importApps: (raw: string, source?: string) => { added: number; existed: number };
  toggleApp: (name: string) => void;
  removeApp: (name: string) => void;
  clearApps: () => void;
  loadDemo: () => Promise<void>;
  exitDemo: () => Promise<void>;
  enterApp: (name?: string) => Promise<void>;
  switchProfile: (id: string) => Promise<void>;
  createProfile: (name: string) => Promise<void>;
  editProfile: (id: string, name: string) => Promise<void>;
  saveVersion: (name: string, aesthetic?: string) => Promise<void>;
  restoreVersion: (id: string) => Promise<void>;
  deleteVersion: (id: string) => Promise<void>;
  exportTxtFile: () => void;
  exportJsonFile: () => void;
  shareSetup: () => void;
  resetAll: () => Promise<void>;
  setLayout: (layout: LayoutType) => Promise<void>;
  setDevice: (device: DeviceType) => Promise<void>;
  setModel: (model: string) => Promise<void>;
  setTheme: (theme: 'dark' | 'light') => Promise<void>;
  setAccent: (c1: string, c2: string) => Promise<void>;
  setWidgetStack: (stack: Widget[]) => Promise<void>;
  updateRoutine: (routine: AuraState['routine']) => Promise<void>;
  updateLockscreen: (lockscreen: AuraState['lockscreen']) => Promise<void>;
}

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, setStateRaw] = useState<AuraState>(DEFAULT_STATE);
  const [ready, setReady] = useState(false);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [toastId, setToastId] = useState(0);

  useEffect(() => {
    loadState().then((s) => {
      setStateRaw(s);
      setReady(true);
      applyThemeVars(s);
    });
  }, []);

  const applyThemeVars = (s: AuraState) => {
    document.documentElement.setAttribute('data-theme', s.theme);
    document.documentElement.style.setProperty('--ac', s.accent1);
    document.documentElement.style.setProperty('--ac2', s.accent2);
    document.body.classList.toggle('light', s.theme === 'light');
  };

  const persist = useCallback(async (patch: Partial<AuraState>) => {
    setStateRaw((prev) => {
      const next = { ...prev, ...patch };
      saveState(next);
      if (patch.theme || patch.accent1 || patch.accent2) applyThemeVars(next);
      return next;
    });
  }, []);

  const setState = useCallback((patch: Partial<AuraState>) => {
    setStateRaw((prev) => ({ ...prev, ...patch }));
  }, []);

  const toast = useCallback((message: string) => {
    const id = toastId + 1;
    setToastId(id);
    setToasts((t) => [...t, { id, message }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 3000);
  }, [toastId]);

  const importApps = useCallback((raw: string) => {
    const lines = raw.split(/[\n,]+/).map((l) => l.trim()).filter((l) => l.length > 1);
    let added = 0;
    let existed = 0;
    const apps = [...state.apps];
    lines.forEach((name) => {
      if (!apps.includes(name)) { apps.push(name); added++; }
      else existed++;
    });
    persist({ apps });
    return { added, existed };
  }, [state.apps, persist]);

  const toggleApp = useCallback((name: string) => {
    const apps = state.apps.includes(name)
      ? state.apps.filter((a) => a !== name)
      : [...state.apps, name];
    persist({ apps });
  }, [state.apps, persist]);

  const removeApp = useCallback((name: string) => {
    persist({ apps: state.apps.filter((a) => a !== name) });
  }, [state.apps, persist]);

  const clearApps = useCallback(() => persist({ apps: [] }), [persist]);

  const loadDemo = useCallback(async () => {
    const apps = SAMPLE_LIST.split('\n').map((l) => l.trim()).filter(Boolean);
    await persist({ apps, demoMode: true, entered: true, onboardingDone: true });
    toast('Demo wardrobe loaded!');
  }, [persist, toast]);

  const exitDemo = useCallback(async () => {
    await persist({ apps: [], demoMode: false });
    toast('Demo ended — start your own setup');
  }, [persist, toast]);

  const enterApp = useCallback(async (name?: string) => {
    await persist({ entered: true, name: name ?? state.name });
  }, [persist, state.name]);

  const activeProfile = useMemo(
    () => state.profiles.find((p) => p.id === state.activeProfile) ?? state.profiles[0],
    [state.profiles, state.activeProfile],
  );

  const scores = useMemo(() => calcScores(state.apps), [state.apps]);
  const dna = useMemo(() => (state.apps.length ? computeDna(state.apps) : null), [state.apps]);

  const value: AppContextValue = {
    state,
    ready,
    scores,
    dna,
    toasts,
    activeProfile,
    setState,
    persist,
    toast,
    importApps,
    toggleApp,
    removeApp,
    clearApps,
    loadDemo,
    exitDemo,
    enterApp,
    switchProfile: async (id) => { await persist({ activeProfile: id }); toast(`Switched to ${state.profiles.find((p) => p.id === id)?.name}`); },
    createProfile: async (name) => {
      const emojis = ['🎯', '🌍', '📱', '🔮', '⚡', '🌟', '🎨', '🏆'];
      const pf: Profile = {
        id: `pf_${Date.now()}`, name, emoji: emojis[Math.floor(Math.random() * emojis.length)],
        color: '#4f6ef7', apps: [], device: 'iphone', model: 'iphone16promax', aesthetic: 'minimal', desc: 'Custom profile',
      };
      await persist({ profiles: [...state.profiles, pf] });
      toast(`Profile created: ${name}`);
    },
    editProfile: async (id, name) => {
      const profiles = state.profiles.map((p) => (p.id === id ? { ...p, name } : p));
      await persist({ profiles });
      toast('Profile updated!');
    },
    saveVersion: async (name, aesthetic) => {
      const v: VersionSnapshot = {
        id: `v${Date.now()}`, name, date: new Date().toLocaleDateString(),
        appCount: state.apps.length, device: state.device, model: state.model,
        aesthetic: aesthetic ?? 'minimal', layout: state.layout,
        color: ['#4f6ef7', '#1de9b6', '#f59e0b', '#a855f7'][Math.floor(Math.random() * 4)],
      };
      const versions = [v, ...state.versions].slice(0, 10);
      await persist({ versions });
      toast(`Version saved: ${name}`);
    },
    restoreVersion: async (id) => {
      const v = state.versions.find((x) => x.id === id);
      if (!v) return;
      await persist({ device: v.device, model: v.model, layout: v.layout });
      toast(`Restored: ${v.name}`);
    },
    deleteVersion: async (id) => {
      await persist({ versions: state.versions.filter((x) => x.id !== id) });
      toast('Version deleted');
    },
    exportTxtFile: () => {
      const blob = new Blob([exportTxt(state.apps)], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url; a.download = 'my-apps.txt'; a.click();
      URL.revokeObjectURL(url);
      toast('App list exported!');
    },
    exportJsonFile: () => {
      const blob = new Blob([exportJson(state)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url; a.download = 'auraos-v5-setup.json'; a.click();
      URL.revokeObjectURL(url);
      toast('Setup exported as JSON!');
    },
    shareSetup: () => {
      const encoded = btoa(JSON.stringify({ apps: state.apps.slice(0, 50), device: state.device, layout: state.layout }));
      const url = `${window.location.href.split('#')[0]}#share=${encoded}`;
      navigator.clipboard?.writeText(url);
      toast('Share link copied!');
    },
    resetAll: async () => { await factoryReset(); window.location.reload(); },
    setLayout: async (layout) => persist({ layout }),
    setDevice: async (device) => persist({ device }),
    setModel: async (model) => persist({ model }),
    setTheme: async (theme) => persist({ theme }),
    setAccent: async (accent1, accent2) => persist({ accent1, accent2 }),
    setWidgetStack: async (widgetStack) => persist({ widgetStack }),
    updateRoutine: async (routine) => persist({ routine }),
    updateLockscreen: async (lockscreen) => persist({ lockscreen }),
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
