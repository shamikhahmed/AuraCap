import { Link } from 'react-router-dom';
import { FileInput, Dna, Wand2, Users, Layers, Image } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { GlassCard } from '@/components/ui/GlassCard';
import { ScoreRing } from '@/components/ui/ScoreRing';
import { AppChip } from '@/components/ui/AppChip';
import { getInsight } from '@/engines/scores';

const QUICK = [
  { to: '/import', icon: FileInput, label: 'Import Apps', color: 'var(--ac)' },
  { to: '/dna', icon: Dna, label: 'Digital DNA', color: 'var(--ac2)' },
  { to: '/designer', icon: Wand2, label: 'AI Designer', color: 'var(--ac3)' },
  { to: '/profiles', icon: Users, label: 'Profiles', color: 'var(--amber)' },
  { to: '/organizer', icon: Layers, label: 'Organizer', color: 'var(--pink)' },
  { to: '/wallpaper', icon: Image, label: 'Wallpapers', color: '#a855f7' },
];

export function Dashboard() {
  const { state, scores, dna, activeProfile } = useApp();
  const insight = getInsight(state.apps);

  return (
    <div>
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="page-title">Control Center</h1>
          <p className="page-sub">Your digital ecosystem at a glance</p>
        </div>
        <span className="badge-live"><span className="w-1 h-1 rounded-full bg-[var(--ac3)]" />LIVE</span>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 mb-4">
        {[
          { v: scores.aura, label: 'AURA', id: 'rg1', colors: ['#4f6ef7', '#7b5ea7'] as [string, string] },
          { v: scores.focus, label: 'FOCUS', id: 'rg2', colors: ['#1de9b6', '#0097a7'] as [string, string] },
          { v: scores.clarity, label: 'CLEAR', id: 'rg3', colors: ['#f59e0b', '#ef4444'] as [string, string] },
          { v: scores.org, label: 'ORG', id: 'rg4', colors: ['#a855f7', '#6366f1'] as [string, string] },
        ].map((s) => (
          <GlassCard key={s.id} className="flex flex-col items-center py-5">
            <ScoreRing value={s.v} label={s.label} gradientId={s.id} colors={s.colors} />
            <p className="mt-2 text-xs font-semibold">{s.label === 'AURA' ? 'Aura Score' : s.label === 'FOCUS' ? 'Focus Score' : s.label === 'CLEAR' ? 'Clarity Score' : 'Organization'}</p>
          </GlassCard>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-3.5 mb-3.5">
        <GlassCard>
          <p className="section-label mb-2.5">QUICK STATS</p>
          <div className="flex flex-col gap-2">
            {[
              { l: 'Apps Tracked', v: state.apps.length, c: 'var(--ac)' },
              { l: 'Smart Folders', v: state.apps.length ? Math.ceil(state.apps.length / 9) : 0, c: 'var(--ac3)' },
              { l: 'Distractions', v: dna?.distractions.length ?? '—', c: 'var(--red)' },
              { l: 'Redundancies', v: dna?.redundancies.length ?? '—', c: 'var(--amber)' },
              { l: 'Active Profile', v: activeProfile.name, c: 'var(--ac2)' },
            ].map((row) => (
              <div key={row.l} className="stat-row"><span className="text-xs">{row.l}</span><span className="font-mono text-sm font-bold" style={{ color: row.c }}>{row.v}</span></div>
            ))}
          </div>
        </GlassCard>
        <GlassCard>
          <p className="section-label mb-2.5">ECOSYSTEM PROFILES DETECTED</p>
          <div className="flex flex-wrap gap-1 mb-3">
            {dna?.locations.length ? dna.locations.map((l) => (
              <AppChip key={l.name} label={`${l.emoji} ${l.name}`} active />
            )) : <span className="text-xs text-[var(--mu)]">Import apps to detect…</span>}
          </div>
          <p className="section-label mb-1.5">AI INSIGHT</p>
          <p className="text-xs leading-relaxed" style={{ color: state.apps.length ? 'var(--tx)' : 'var(--mu)' }}>{insight}</p>
        </GlassCard>
      </div>

      <p className="section-label mb-2.5">QUICK ACCESS</p>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
        {QUICK.map(({ to, icon: Icon, label, color }) => (
          <Link key={to} to={to} className="quick-tile">
            <Icon size={16} style={{ color }} />
            <span className="text-[11px]">{label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
