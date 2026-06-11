import { useState } from 'react';
import { Brush } from 'lucide-react';
import { DISTRACTION_LIST } from '@/engines/organizer';
import { useApp } from '@/context/AppContext';
import { GlassCard } from '@/components/ui/GlassCard';

const MODES = [
  { emoji: '🧘', name: 'Monk Mode', desc: 'No social. Essentials only.' },
  { emoji: '⚡', name: 'Founder Mode', desc: 'Work tools only.' },
  { emoji: '🌙', name: 'Sleep Mode', desc: 'Night + sleep apps.' },
  { emoji: '👻', name: 'Ghost Mode', desc: 'One page. Six apps.' },
  { emoji: '📚', name: 'Study Mode', desc: 'Notes + timer only.' },
  { emoji: '🕌', name: 'Prayer Mode', desc: 'Islamic apps only.' },
  { emoji: '💪', name: 'Gym Mode', desc: 'Fitness + music.' },
  { emoji: '✈', name: 'Travel Mode', desc: 'Maps + flights + booking.' },
];

export function DigitalCleanse() {
  const { state, toast } = useApp();
  const [removed, setRemoved] = useState<string[]>([]);
  const [reviewCount, setReviewCount] = useState(7);

  const apps = DISTRACTION_LIST.filter((d) => !removed.includes(d.n));
  const distractionScore = state.apps.length ? Math.min(100, Math.round(apps.length * 5 + 10)) : 34;

  const deepCleanse = () => {
    apps.forEach((item, n) => {
      setTimeout(() => setRemoved((r) => [...r, item.n]), n * 80);
    });
    setTimeout(() => { setReviewCount(0); toast('Deep Cleanse complete! 🧘 +20 Aura pts'); }, apps.length * 80 + 500);
  };

  return (
    <div>
      <div className="flex items-start justify-between mb-6">
        <div><h1 className="page-title">Digital Cleanse</h1><p className="page-sub">Eliminate distractions — reclaim your focus and attention</p></div>
        <button type="button" onClick={deepCleanse} className="btn-danger btn-sm"><Brush size={14} /> Deep Cleanse</button>
      </div>

      <div className="grid md:grid-cols-2 gap-3.5 mb-3.5">
        <div className="stat-card"><p className="section-label mb-1">DISTRACTION SCORE</p><p className="text-[30px] font-extrabold font-display text-[var(--red)]">{distractionScore}<span className="text-sm text-[var(--mu)]">/100</span></p></div>
        <div className="stat-card"><p className="section-label mb-1">APPS TO REVIEW</p><p className="text-[30px] font-extrabold font-display text-[var(--amber)]">{reviewCount}</p></div>
      </div>

      <p className="section-label mb-2">DISTRACTION APPS</p>
      <div className="flex flex-col gap-1.5 mb-4">
        {apps.map((d) => (
          <div key={d.n} className="list-item">
            <span className="text-lg">{d.e}</span>
            <div className="flex-1"><p className="text-xs font-semibold">{d.n}</p><p className="text-[10px] text-[var(--mu)]">{d.r}</p></div>
            <span className={`text-[10px] px-2 py-0.5 rounded-full ${d.l === 'high' ? 'bg-[rgba(239,68,68,0.18)] text-[var(--red)]' : 'bg-[rgba(245,158,11,0.18)] text-[var(--amber)]'}`}>{d.l.toUpperCase()}</span>
            <button type="button" onClick={() => { setRemoved((r) => [...r, d.n]); setReviewCount((c) => Math.max(0, c - 1)); toast('App removed'); }} className="text-[11px] px-2 py-1 rounded-md bg-[rgba(239,68,68,0.1)] text-[var(--red)]">Remove</button>
          </div>
        ))}
      </div>

      <p className="section-label mb-2">MINIMAL MODE PRESETS</p>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {MODES.map((m) => (
          <GlassCard key={m.name} onClick={() => toast(`${m.name} activated! ✓`)}>
            <div className="text-lg mb-1">{m.emoji}</div>
            <p className="font-semibold text-xs">{m.name}</p>
            <p className="text-[11px] text-[var(--mu)] mt-0.5">{m.desc}</p>
            <button type="button" className="btn-ghost w-full mt-2 text-[11px] py-1">Apply</button>
          </GlassCard>
        ))}
      </div>
    </div>
  );
}
