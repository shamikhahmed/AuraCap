import { useMemo, useState } from 'react';
import { Brush, Sparkles } from 'lucide-react';
import { DISTRACTION_LIST } from '@/engines/organizer';
import { useApp } from '@/context/AppContext';
import { GlassCard } from '@/components/ui/GlassCard';
import { AppIcon } from '@/components/ui/AppIcon';
import { APPS } from '@/data';

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

interface RemovalSuggestion {
  name: string;
  reason: string;
  severity: 'high' | 'medium';
  source: 'dna' | 'distraction' | 'redundancy';
}

export function DigitalCleanse() {
  const { state, dna, removeApp, toast } = useApp();
  const [removed, setRemoved] = useState<string[]>([]);
  const [suggestions, setSuggestions] = useState<RemovalSuggestion[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const apps = DISTRACTION_LIST.filter((d) => !removed.includes(d.n) && state.apps.includes(d.n));
  const distractionScore = state.apps.length ? Math.min(100, Math.round(apps.length * 5 + (dna?.distractions.length ?? 0) * 3 + 10)) : 34;
  const reviewCount = showSuggestions
    ? suggestions.filter((s) => state.apps.includes(s.name)).length
    : apps.length + (dna?.redundancies.filter((r) => r.found.length > 1).length ?? 0);

  const suggestRemovals = () => {
    if (!state.apps.length) {
      toast('Add apps to your wardrobe first');
      return;
    }
    if (!dna) {
      toast('Run DNA analysis first from Digital DNA');
      return;
    }
    const items: RemovalSuggestion[] = [];

    dna.distractions.forEach((name) => {
      items.push({ name, reason: 'Flagged as distraction in your DNA profile', severity: 'high', source: 'dna' });
    });

    dna.redundancies.forEach((group) => {
      if (group.found.length > 1) {
        group.found.slice(1).forEach((name) => {
          items.push({
            name,
            reason: `Redundant — keep one in "${group.label}"`,
            severity: 'medium',
            source: 'redundancy',
          });
        });
      }
    });

    if (countCat(state.apps, ['games']) > 12) {
      state.apps
        .filter((nm) => APPS.find((a) => a.n === nm)?.c === 'games')
        .slice(6)
        .forEach((name) => {
          items.push({ name, reason: 'Large games library — archive idle titles', severity: 'medium', source: 'dna' });
        });
    }

    const unique = new Map<string, RemovalSuggestion>();
    items.forEach((item) => {
      if (state.apps.includes(item.name) && !unique.has(item.name)) {
        unique.set(item.name, item);
      }
    });

    const list = [...unique.values()];
    setSuggestions(list);
    setShowSuggestions(true);
    toast(list.length ? `Found ${list.length} apps to review` : 'Your wardrobe looks lean — no removals suggested');
  };

  const removeFromWardrobe = (name: string) => {
    removeApp(name);
    setSuggestions((prev) => prev.filter((s) => s.name !== name));
    setRemoved((r) => [...r, name]);
    toast(`${name} removed from wardrobe`);
  };

  const deepCleanse = () => {
    apps.forEach((item, n) => {
      setTimeout(() => {
        removeFromWardrobe(item.n);
      }, n * 80);
    });
    setTimeout(() => toast('Deep Cleanse complete! 🧘 +20 Aura pts'), apps.length * 80 + 500);
  };

  const activeSuggestions = useMemo(
    () => suggestions.filter((s) => state.apps.includes(s.name)),
    [suggestions, state.apps],
  );

  return (
    <div>
      <div className="flex items-start justify-between mb-6 gap-3 flex-wrap">
        <div><h1 className="page-title">Digital Cleanse</h1><p className="page-sub">Eliminate distractions — reclaim your focus and attention</p></div>
        <div className="flex gap-2">
          <button type="button" onClick={suggestRemovals} className="btn-primary btn-sm"><Sparkles size={14} /> Suggest Removals</button>
          <button type="button" onClick={deepCleanse} className="btn-danger btn-sm"><Brush size={14} /> Deep Cleanse</button>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-3.5 mb-3.5">
        <div className="stat-card"><p className="section-label mb-1">DISTRACTION SCORE</p><p className="text-[30px] font-extrabold font-display text-[var(--red)]">{distractionScore}<span className="text-sm text-[var(--mu)]">/100</span></p></div>
        <div className="stat-card"><p className="section-label mb-1">APPS TO REVIEW</p><p className="text-[30px] font-extrabold font-display text-[var(--amber)]">{reviewCount}</p></div>
      </div>

      {showSuggestions && (
        <>
          <p className="section-label mb-2">DNA & IMPORT SUGGESTIONS</p>
          <div className="flex flex-col gap-1.5 mb-4">
            {activeSuggestions.length ? activeSuggestions.map((s) => {
              const entry = APPS.find((a) => a.n === s.name) ?? { e: '📱', n: s.name };
              return (
                <div key={s.name} className="list-item">
                  <AppIcon name={s.name} emoji={entry.e} size={20} />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold truncate">{s.name}</p>
                    <p className="text-[10px] text-[var(--mu)]">{s.reason}</p>
                  </div>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full shrink-0 ${s.severity === 'high' ? 'bg-[rgba(239,68,68,0.18)] text-[var(--red)]' : 'bg-[rgba(245,158,11,0.18)] text-[var(--amber)]'}`}>{s.source.toUpperCase()}</span>
                  <button type="button" onClick={() => removeFromWardrobe(s.name)} className="text-[11px] px-2 py-1 rounded-md bg-[rgba(239,68,68,0.1)] text-[var(--red)] shrink-0">Remove</button>
                </div>
              );
            }) : (
              <GlassCard className="text-xs text-[var(--mu)]">No removal suggestions — your wardrobe is already optimized.</GlassCard>
            )}
          </div>
        </>
      )}

      <p className="section-label mb-2">DISTRACTION APPS</p>
      <div className="flex flex-col gap-1.5 mb-4">
        {apps.map((d) => (
          <div key={d.n} className="list-item">
            <AppIcon name={d.n} emoji={d.e} size={20} />
            <div className="flex-1"><p className="text-xs font-semibold">{d.n}</p><p className="text-[10px] text-[var(--mu)]">{d.r}</p></div>
            <span className={`text-[10px] px-2 py-0.5 rounded-full ${d.l === 'high' ? 'bg-[rgba(239,68,68,0.18)] text-[var(--red)]' : 'bg-[rgba(245,158,11,0.18)] text-[var(--amber)]'}`}>{d.l.toUpperCase()}</span>
            <button type="button" onClick={() => removeFromWardrobe(d.n)} className="text-[11px] px-2 py-1 rounded-md bg-[rgba(239,68,68,0.1)] text-[var(--red)]">Remove</button>
          </div>
        ))}
        {!apps.length && <GlassCard className="text-xs text-[var(--mu)]">No distraction apps in your current wardrobe.</GlassCard>}
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

function countCat(apps: string[], cats: string[]) {
  return apps.filter((nm) => {
    const a = APPS.find((x) => x.n === nm);
    return a && cats.includes(a.c);
  }).length;
}
