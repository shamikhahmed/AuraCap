import { useEffect, useRef, useState } from 'react';
import { Download, FileCode, Share2, RotateCcw, Upload, Bell, Sparkles } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { GlassCard } from '@/components/ui/GlassCard';
import { Modal } from '@/components/ui/Modal';

const APP_VERSION = '5.0.4';

const ACCENTS = [
  ['#4f6ef7', '#7b5ea7'],
  ['#1de9b6', '#0097a7'],
  ['#f59e0b', '#ef4444'],
  ['#a855f7', '#6366f1'],
  ['#ec4899', '#f43f5e'],
  ['#22d3ee', '#6366f1'],
];

const CLEANSE_KEY = 'auracap_next_cleanse_date';
const CLEANSE_NOTIF_KEY = 'auracap_cleanse_notif_enabled';

function loadCleanseDate(): string {
  return localStorage.getItem(CLEANSE_KEY) || '';
}

function loadCleanseNotif(): boolean {
  return localStorage.getItem(CLEANSE_NOTIF_KEY) === '1';
}

function daysUntil(dateStr: string): number | null {
  if (!dateStr) return null;
  const target = new Date(dateStr + 'T09:00:00');
  const now = new Date();
  return Math.ceil((target.getTime() - now.getTime()) / 86400000);
}

export function Settings() {
  const { state, setTheme, setAccent, exportTxtFile, exportJsonFile, importJsonFile, shareSetup, resetAll, toast } = useApp();
  const [resetModal, setResetModal] = useState(false);
  const [cleanseDate, setCleanseDate] = useState(loadCleanseDate);
  const [cleanseNotif, setCleanseNotif] = useState(loadCleanseNotif);
  const notifiedRef = useRef(false);
  const jsonInputRef = useRef<HTMLInputElement>(null);

  const cleanseDays = daysUntil(cleanseDate);
  const cleanseDue = cleanseDays !== null && cleanseDays <= 0;
  const cleanseSoon = cleanseDays !== null && cleanseDays > 0 && cleanseDays <= 3;

  useEffect(() => {
    if (!cleanseNotif || !cleanseDate || !cleanseDue || notifiedRef.current) return;
    if (!('Notification' in window)) return;
    const fire = () => {
      if (Notification.permission === 'granted') {
        new Notification('AuraCap — Digital Cleanse due', {
          body: 'Time for your scheduled app audit. Open Digital Cleanse to review distractions.',
          tag: 'auracap-cleanse',
        });
        notifiedRef.current = true;
      }
    };
    if (Notification.permission === 'granted') fire();
    else if (Notification.permission !== 'denied') {
      Notification.requestPermission().then((p) => { if (p === 'granted') fire(); });
    }
  }, [cleanseNotif, cleanseDate, cleanseDue]);

  const saveCleanse = (date: string, notif: boolean) => {
    setCleanseDate(date);
    setCleanseNotif(notif);
    if (date) localStorage.setItem(CLEANSE_KEY, date);
    else localStorage.removeItem(CLEANSE_KEY);
    localStorage.setItem(CLEANSE_NOTIF_KEY, notif ? '1' : '0');
    notifiedRef.current = false;
    toast(date ? 'Cleanse reminder saved' : 'Cleanse reminder cleared');
  };

  const scheduleInDays = (n: number) => {
    const d = new Date();
    d.setDate(d.getDate() + n);
    saveCleanse(d.toISOString().slice(0, 10), cleanseNotif);
  };

  return (
    <div>
      <div className="mb-6"><h1 className="page-title">Settings</h1><p className="page-sub">Customize AuraCap v5</p></div>

      <div className="grid md:grid-cols-2 gap-3">
        <GlassCard>
          <p className="section-label mb-3">THEME</p>
          <div className="flex gap-2">
            <button type="button" onClick={() => setTheme('dark')} className={`btn-ghost flex-1 ${state.theme === 'dark' ? '!border-[var(--ac)]' : ''}`}>🌙 Dark</button>
            <button type="button" onClick={() => setTheme('light')} className={`btn-ghost flex-1 ${state.theme === 'light' ? '!border-[var(--ac)]' : ''}`}>☀ Light</button>
          </div>
        </GlassCard>
        <GlassCard>
          <p className="section-label mb-3">ACCENT COLOR</p>
          <div className="flex gap-2 flex-wrap">
            {ACCENTS.map(([c1, c2]) => (
              <button key={c1} type="button" onClick={() => setAccent(c1, c2)} className="w-7 h-7 rounded-full border-2 border-white/20" style={{ background: `linear-gradient(135deg,${c1},${c2})` }} />
            ))}
          </div>
        </GlassCard>
        <GlassCard className="md:col-span-2">
          <p className="section-label mb-3 flex items-center gap-2"><Sparkles size={14} className="text-[var(--ac2)]" /> DIGITAL CLEANSE REMINDER</p>
          <p className="text-xs text-[var(--mu)] mb-3">Schedule your next app audit. AuraCap can notify you when it&apos;s due (browser notifications).</p>
          <div className="flex flex-wrap gap-2 mb-3">
            <input
              type="date"
              value={cleanseDate}
              min={new Date().toISOString().slice(0, 10)}
              onChange={(e) => saveCleanse(e.target.value, cleanseNotif)}
              className="input-field flex-1 min-w-[140px]"
            />
            <button type="button" onClick={() => scheduleInDays(7)} className="btn-ghost btn-sm">+7 days</button>
            <button type="button" onClick={() => scheduleInDays(30)} className="btn-ghost btn-sm">+30 days</button>
          </div>
          <label className="flex items-center gap-2 text-xs cursor-pointer mb-2">
            <input
              type="checkbox"
              checked={cleanseNotif}
              onChange={(e) => saveCleanse(cleanseDate, e.target.checked)}
              className="accent-[var(--ac)]"
            />
            <Bell size={12} /> Notify when cleanse is due
          </label>
          {cleanseDate && (
            <p className={`text-xs font-semibold ${cleanseDue ? 'text-[var(--red)]' : cleanseSoon ? 'text-[var(--amber)]' : 'text-[var(--ac3)]'}`}>
              {cleanseDue ? 'Due today — open Digital Cleanse' : cleanseSoon ? `Due in ${cleanseDays} day${cleanseDays === 1 ? '' : 's'}` : cleanseDays !== null ? `Scheduled · ${cleanseDays} days away` : ''}
            </p>
          )}
        </GlassCard>
        <GlassCard>
          <p className="section-label mb-3">EXPORT & SYNC</p>
          <div className="flex flex-col gap-1.5">
            <button type="button" onClick={exportTxtFile} className="btn-ghost justify-start"><Download size={14} className="text-[var(--ac)]" /> Export App List</button>
            <button type="button" onClick={exportJsonFile} className="btn-ghost justify-start"><FileCode size={14} className="text-[var(--ac3)]" /> Export Full Setup (JSON)</button>
            <button type="button" onClick={() => jsonInputRef.current?.click()} className="btn-ghost justify-start"><Upload size={14} className="text-[var(--amber)]" /> Import JSON Backup</button>
            <input ref={jsonInputRef} type="file" accept=".json,application/json" className="hidden" onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) importJsonFile(f);
              e.target.value = '';
            }} />
            <button type="button" onClick={shareSetup} className="btn-ghost justify-start"><Share2 size={14} className="text-[var(--ac2)]" /> Share My Setup</button>
          </div>
        </GlassCard>
        <GlassCard className="!border-[rgba(239,68,68,0.16)]">
          <p className="section-label mb-3 !text-[rgba(239,68,68,0.6)]">DANGER ZONE</p>
          <button type="button" onClick={() => setResetModal(true)} className="btn-danger w-full"><RotateCcw size={14} /> Factory Reset</button>
        </GlassCard>
      </div>

      <GlassCard className="mt-3 text-center">
        <p className="text-base font-extrabold font-display mb-1">AuraCap v{APP_VERSION}</p>
        <p className="text-[10px] text-[var(--mu)] font-mono">1000+ Apps · Smart DNA · iPhone + iPad + Mac · Multi-Profile · Version History · 100% Offline</p>
      </GlassCard>

      <Modal open={resetModal} onClose={() => setResetModal(false)} title="Factory reset?">
        <p className="text-sm text-[var(--mu)] mb-4">Reset ALL AuraCap data? This cannot be undone.</p>
        <div className="flex gap-2">
          <button type="button" onClick={() => resetAll()} className="btn-danger flex-1">Reset everything</button>
          <button type="button" onClick={() => setResetModal(false)} className="btn-ghost flex-1">Cancel</button>
        </div>
      </Modal>
    </div>
  );
}
