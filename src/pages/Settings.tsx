import { useState } from 'react';
import { Download, FileCode, Share2, RotateCcw } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { GlassCard } from '@/components/ui/GlassCard';
import { Modal } from '@/components/ui/Modal';

const ACCENTS = [
  ['#4f6ef7', '#7b5ea7'],
  ['#1de9b6', '#0097a7'],
  ['#f59e0b', '#ef4444'],
  ['#a855f7', '#6366f1'],
  ['#ec4899', '#f43f5e'],
  ['#22d3ee', '#6366f1'],
];

export function Settings() {
  const { state, setTheme, setAccent, exportTxtFile, exportJsonFile, shareSetup, resetAll } = useApp();
  const [resetModal, setResetModal] = useState(false);

  return (
    <div>
      <div className="mb-6"><h1 className="page-title">Settings</h1><p className="page-sub">Customize AuraOS v5</p></div>

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
        <GlassCard>
          <p className="section-label mb-3">EXPORT & SYNC</p>
          <div className="flex flex-col gap-1.5">
            <button type="button" onClick={exportTxtFile} className="btn-ghost justify-start"><Download size={14} className="text-[var(--ac)]" /> Export App List</button>
            <button type="button" onClick={exportJsonFile} className="btn-ghost justify-start"><FileCode size={14} className="text-[var(--ac3)]" /> Export Full Setup (JSON)</button>
            <button type="button" onClick={shareSetup} className="btn-ghost justify-start"><Share2 size={14} className="text-[var(--ac2)]" /> Share My Setup</button>
          </div>
        </GlassCard>
        <GlassCard className="!border-[rgba(239,68,68,0.16)]">
          <p className="section-label mb-3 !text-[rgba(239,68,68,0.6)]">DANGER ZONE</p>
          <button type="button" onClick={() => setResetModal(true)} className="btn-danger w-full"><RotateCcw size={14} /> Factory Reset</button>
        </GlassCard>
      </div>

      <GlassCard className="mt-3 text-center">
        <p className="text-base font-extrabold font-display mb-1">AuraOS v5.0</p>
        <p className="text-[10px] text-[var(--mu)] font-mono">1000+ Apps · Smart DNA · iPhone + iPad + Mac · Multi-Profile · Version History · 100% Offline</p>
      </GlassCard>

      <Modal open={resetModal} onClose={() => setResetModal(false)} title="Factory reset?">
        <p className="text-sm text-[var(--mu)] mb-4">Reset ALL AuraOS data? This cannot be undone.</p>
        <div className="flex gap-2">
          <button type="button" onClick={() => resetAll()} className="btn-danger flex-1">Reset everything</button>
          <button type="button" onClick={() => setResetModal(false)} className="btn-ghost flex-1">Cancel</button>
        </div>
      </Modal>
    </div>
  );
}
