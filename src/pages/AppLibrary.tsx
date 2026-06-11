import { useMemo, useState } from 'react';
import { Cpu, Plus, Trash2 } from 'lucide-react';
import { APPS, CATS } from '@/data';
import { useApp } from '@/context/AppContext';
import { GlassCard } from '@/components/ui/GlassCard';
import { AppChip } from '@/components/ui/AppChip';
import { Modal } from '@/components/ui/Modal';
import { countCat } from '@/engines/scores';
import type { LayoutType } from '@/types';

const LAYOUTS: { id: LayoutType; emoji: string; label: string }[] = [
  { id: 'folders', emoji: '🗂', label: 'Folders' },
  { id: 'pages', emoji: '📄', label: 'By Pages' },
  { id: 'minimal', emoji: '⬜', label: 'Minimal' },
  { id: 'hybrid', emoji: '⚡', label: 'Hybrid' },
  { id: 'alpha', emoji: '🔤', label: 'A-Z' },
  { id: 'freq', emoji: '📊', label: 'Frequency' },
];

export function AppLibrary() {
  const { state, toggleApp, removeApp, clearApps, setLayout, toast } = useApp();
  const [cat, setCat] = useState('all');
  const [search, setSearch] = useState('');
  const [analysis, setAnalysis] = useState('');
  const [customModal, setCustomModal] = useState(false);
  const [customName, setCustomName] = useState('');

  const pool = useMemo(() => APPS.filter((a) => {
    const matchCat = cat === 'all' || a.c === cat;
    const matchSearch = !search || a.n.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  }), [cat, search]);

  const analyze = () => {
    if (!state.apps.length) { toast('Add apps first!'); return; }
    const n = state.apps.length;
    const s = countCat(state.apps, ['social', 'messaging']);
    const p = countCat(state.apps, ['productivity', 'notes']);
    const g = countCat(state.apps, ['games']);
    const c = countCat(state.apps, ['crypto', 'finance']);
    setAnalysis(`${n} apps | ${s} social | ${p} productivity | ${g} games | ${c} finance | Folders: ${Math.ceil(n / 9)} | Layout: ${state.layout}`);
    toast('Analysis complete!');
  };

  const addCustom = () => {
    if (!customName.trim()) return;
    if (!state.apps.includes(customName.trim())) toggleApp(customName.trim());
    setCustomModal(false);
    setCustomName('');
    toast(`Added: ${customName.trim()}`);
  };

  return (
    <div>
      <div className="flex items-start justify-between mb-5">
        <div><h1 className="page-title">App Library</h1><p className="page-sub">1000+ apps across 34 categories</p></div>
        <button type="button" onClick={analyze} className="btn-primary btn-sm"><Cpu size={14} /> Analyze</button>
      </div>

      <div className="flex gap-2 mb-2.5">
        <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search 1000+ apps…" className="input-field flex-1 text-xs" />
        <button type="button" onClick={() => setCustomModal(true)} className="btn-ghost btn-sm"><Plus size={14} /></button>
        <button type="button" onClick={() => { clearApps(); toast('Apps cleared'); }} className="btn-danger btn-sm"><Trash2 size={14} /></button>
      </div>

      <div className="flex flex-wrap gap-1 mb-2.5">
        <button type="button" onClick={() => setCat('all')} className={`btn-ghost btn-sm ${cat === 'all' ? '!border-[rgba(79,110,247,0.36)] !bg-[rgba(79,110,247,0.12)] !text-[var(--ac)]' : ''}`}>All</button>
        {CATS.map((c) => (
          <button key={c.id} type="button" onClick={() => setCat(c.id)} className={`btn-ghost btn-sm ${cat === c.id ? '!border-[rgba(79,110,247,0.36)] !bg-[rgba(79,110,247,0.12)] !text-[var(--ac)]' : ''}`}>{c.label}</button>
        ))}
      </div>

      <GlassCard className="mb-2.5">
        <div className="max-h-[210px] overflow-y-auto flex flex-wrap gap-0.5">
          {pool.length ? pool.map((a) => (
            <AppChip key={a.n} label={`${a.e} ${a.n}`} active={state.apps.includes(a.n)} onClick={() => toggleApp(a.n)} />
          )) : <span className="text-xs text-[var(--mu)] p-2">No apps found.</span>}
        </div>
      </GlassCard>

      <GlassCard className="mb-2.5">
        <div className="flex justify-between mb-2"><p className="section-label">SELECTED <span className="text-[var(--ac)]">({state.apps.length})</span></p><button type="button" onClick={() => clearApps()} className="btn-ghost btn-sm">Clear</button></div>
        <div className="flex flex-wrap gap-0.5 min-h-[38px]">
          {state.apps.length ? state.apps.map((nm) => {
            const a = APPS.find((x) => x.n === nm) ?? { e: '📱', n: nm };
            return <AppChip key={nm} label={`${a.e} ${nm}`} active onRemove={() => removeApp(nm)} />;
          }) : <span className="text-xs text-[var(--mu)]">Select apps above…</span>}
        </div>
      </GlassCard>

      <GlassCard className="mb-2.5">
        <p className="section-label mb-2.5">LAYOUT PREFERENCE</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
          {LAYOUTS.map((l) => (
            <button key={l.id} type="button" onClick={() => setLayout(l.id)} className={`layout-opt ${state.layout === l.id ? 'active' : ''}`}>
              <span className="text-lg">{l.emoji}</span><span className="text-[11px] font-semibold">{l.label}</span>
            </button>
          ))}
        </div>
      </GlassCard>

      <GlassCard>
        <p className="section-label mb-2">AI LAYOUT BLUEPRINT</p>
        <p className="text-xs text-[var(--mu)] leading-relaxed font-mono">{analysis || 'Select apps and click Analyze for your personalized layout.'}</p>
      </GlassCard>

      <Modal open={customModal} onClose={() => setCustomModal(false)} title="Add custom app">
        <input value={customName} onChange={(e) => setCustomName(e.target.value)} placeholder="App name" className="input-field mb-4" onKeyDown={(e) => e.key === 'Enter' && addCustom()} />
        <button type="button" onClick={addCustom} className="btn-primary w-full">Add</button>
      </Modal>
    </div>
  );
}
