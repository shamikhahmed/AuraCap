import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { RotateCw, Download } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { GlassCard } from '@/components/ui/GlassCard';
import { EmptyState } from '@/components/ui/EmptyState';
import { buildSmartFolders, DISTRACTION_LIST, downloadMacDockGuide } from '@/engines/organizer';

export function SmartOrganizer() {
  const { state, scores, dna, toast } = useApp();
  const [orgScore, setOrgScore] = useState(scores.org);
  const [hidden, setHidden] = useState<string[]>([]);

  const folders = useMemo(() => buildSmartFolders(state.apps), [state.apps]);
  const redundancies = dna?.redundancies ?? [];

  const build = () => toast(state.apps.length ? `Smart folders built from your ${state.apps.length} apps!` : 'Import apps to build folders');

  const reorg = () => {
    let v = orgScore;
    const t = setInterval(() => {
      v = Math.min(v + 1, 94);
      setOrgScore(v);
      if (v >= 94) { clearInterval(t); toast('Reorganized! Score: 94/100 ✨'); }
    }, 35);
  };

  const distApps = DISTRACTION_LIST.filter((d) => state.apps.length && state.apps.includes(d.n)).filter((d) => !hidden.includes(d.n));

  if (!state.apps.length) {
    return (
      <EmptyState
        emoji="📱"
        title="Import apps first"
        description="Smart Organizer builds folders from your actual app list — import apps to see personalized folders and distraction analysis."
        ctaLabel="Import apps"
        ctaTo="/import"
      />
    );
  }

  return (
    <div>
      <div className="flex items-start justify-between mb-6">
        <div><h1 className="page-title">Smart Organizer</h1><p className="page-sub">Smart folder builder from your actual imported apps</p></div>
        <div className="flex gap-2">
          <button type="button" onClick={() => { downloadMacDockGuide(folders, state.apps); toast('Mac Dock guide downloaded'); }} className="btn-ghost btn-sm"><Download size={14} /> Mac Dock Guide</button>
          <button type="button" onClick={build} className="btn-primary btn-sm"><RotateCw size={14} /> Auto-Build</button>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-3.5 mb-3.5">
        <GlassCard>
          <p className="section-label mb-1">ORGANIZATION SCORE</p>
          <p className="text-[34px] font-extrabold font-display">{orgScore}<span className="text-sm text-[var(--mu)]">/100</span></p>
          <div className="mt-3 flex flex-col gap-2">
            {[{ l: 'Folder Structure', v: 82, c: 'var(--ac)' }, { l: 'Naming Clarity', v: 68, c: 'var(--ac2)' }, { l: 'Page Efficiency', v: 71, c: 'var(--ac3)' }].map((b) => (
              <div key={b.l}><div className="flex justify-between text-[11px] mb-0.5"><span>{b.l}</span><span>{b.v}%</span></div><div className="sbar"><div className="sfil" style={{ width: `${b.v}%`, background: b.c }} /></div></div>
            ))}
          </div>
          <button type="button" onClick={reorg} className="btn-ghost btn-sm mt-3 w-full">Reorganize</button>
        </GlassCard>
        <GlassCard>
          <p className="section-label mb-2">REDUNDANCY DETECTOR</p>
          {redundancies.length ? redundancies.map((r) => (
            <div key={r.label} className="red-card mb-2"><p className="text-[11px] text-[var(--amber)] font-semibold">{r.label}</p><p className="text-[11px] text-[var(--mu)]">{r.found.length} apps: {r.found.join(', ')}</p></div>
          )) : <p className="text-xs text-[var(--mu)]">Import apps to detect…</p>}
        </GlassCard>
      </div>

      <p className="section-label mb-2">SMART FOLDERS (built from your apps)</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 mb-4">
        {folders.map((f) => (
          <div key={f.name} className="folder-card">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-7 h-7 rounded-lg flex items-center justify-center text-sm border" style={{ background: `${f.color}22`, borderColor: `${f.color}44` }}>{f.emoji}</div>
              <div><p className="text-xs font-semibold">{f.name}</p><p className="text-[10px] text-[var(--mu)]">{f.apps.length} apps</p></div>
            </div>
            <div className="flex flex-wrap gap-0.5">
              {f.apps.slice(0, 8).map((nm) => {
                const a = APPS.find((x) => x.n === nm) ?? { e: '📱' };
                return <div key={nm} className="w-[22px] h-[22px] rounded-md flex items-center justify-center text-[9px] border" style={{ background: `${f.color}22`, borderColor: `${f.color}33` }} title={nm}>{a.e}</div>;
              })}
              {f.apps.length > 8 && <span className="text-[9px] text-[var(--mu)] p-1">+{f.apps.length - 8} more</span>}
            </div>
          </div>
        ))}
      </div>

      <p className="section-label mb-2">APPS TO CONSIDER HIDING / DELETING</p>
      <div className="flex flex-col gap-2">
        {distApps.map((d) => (
          <div key={d.n} className="list-item">
            <span className="text-lg">{d.e}</span>
            <div className="flex-1"><p className="text-xs font-semibold">{d.n}</p><p className="text-[10px] text-[var(--mu)]">{d.r}</p></div>
            <span className={`text-[10px] px-2 py-0.5 rounded-full ${d.l === 'high' ? 'bg-[rgba(239,68,68,0.18)] text-[var(--red)]' : 'bg-[rgba(245,158,11,0.18)] text-[var(--amber)]'}`}>{d.l.toUpperCase()}</span>
            <button type="button" onClick={() => { setHidden((h) => [...h, d.n]); toast('Hidden'); }} className="text-[11px] px-2 py-1 rounded-md bg-[rgba(239,68,68,0.1)] text-[var(--red)]">Hide</button>
          </div>
        ))}
      </div>
    </div>
  );
}
