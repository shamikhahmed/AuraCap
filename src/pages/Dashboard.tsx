import { Link } from 'react-router-dom';
import { FileInput, Dna, Wand2, Users, Layers, Image, Smartphone, Tablet, Laptop } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { GlassCard } from '@/components/ui/GlassCard';
import { ScoreRing } from '@/components/ui/ScoreRing';
import { AppChip } from '@/components/ui/AppChip';
import { getInsight } from '@/engines/scores';

const QUICK = [
  { to: '/import', icon: FileInput, label: 'Import Apps', color: 'var(--ac)' },
  { to: '/dna', icon: Dna, label: 'Digital DNA', color: 'var(--ac2)' },
  { to: '/designer', icon: Wand2, label: 'Smart Assistant', color: 'var(--ac3)' },
  { to: '/profiles', icon: Users, label: 'Profiles', color: 'var(--amber)' },
  { to: '/organizer', icon: Layers, label: 'Organizer', color: 'var(--ac)' },
  { to: '/wallpaper', icon: Image, label: 'Wallpapers', color: 'var(--ac2)' },
];

const DEVICES = [
  { id: 'mac', label: 'Mac', Icon: Laptop, x: 50, y: 12 },
  { id: 'phone', label: 'iPhone', Icon: Smartphone, x: 18, y: 78 },
  { id: 'pad', label: 'iPad', Icon: Tablet, x: 82, y: 78 },
];

export function Dashboard() {
  const { state, scores, dna, activeProfile } = useApp();
  const insight = getInsight(state.apps);

  const renderConstellation = () => (
    <aside className="dash-rail dash-rail--constellation" aria-label="Device constellation">
      <p className="section-label mb-3">Devices</p>
      <div className="dash-constellation relative w-full max-w-[280px] mx-auto aspect-[1.15/1]" aria-hidden>
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 360 312" fill="none">
          {DEVICES.map((d) => (
            <line
              key={d.id}
              x1={d.x * 3.6}
              y1={d.y * 3.12}
              x2="180"
              y2="156"
              stroke="var(--ac)"
              strokeWidth="1.5"
              strokeOpacity="0.4"
              strokeDasharray="4 6"
            />
          ))}
          <circle cx="180" cy="156" r="4" fill="var(--ac)" opacity="0.55" />
        </svg>
        {DEVICES.map((d) => (
          <div key={d.id} className="welcome-device-node" style={{ left: `${d.x}%`, top: `${d.y}%` }}>
            <d.Icon size={14} strokeWidth={1.75} />
            <span>{d.label}</span>
          </div>
        ))}
        <div className="welcome-dna-card absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[58%] aspect-[1.55/1] rounded-xl overflow-hidden">
          <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-[var(--ac)]" />
          <div className="relative h-full p-3 flex flex-col justify-between">
            <div>
              <p className="text-[7px] tracking-[0.2em] uppercase text-[var(--mu)] font-mono">Digital DNA</p>
              <p className="text-sm font-semibold tracking-tight mt-0.5" style={{ fontFamily: 'var(--fd)' }}>
                {scores.aura}
              </p>
            </div>
            <div className="font-mono text-[8px] text-[var(--mu)] tracking-widest">
              {state.apps.length ? `${state.apps.length} APPS` : 'IMPORT TO SCORE'}
            </div>
          </div>
        </div>
      </div>
      <Link to="/dna" className="dash-rail-link">
        Full DNA report →
      </Link>
    </aside>
  );

  const toolsRail = (
    <aside className="dash-rail dash-rail--tools" aria-label="Organizer tools">
      <p className="section-label mb-3">Organizer</p>
      <div className="flex flex-col gap-2">
        {QUICK.map(({ to, icon: Icon, label, color }) => (
          <Link key={to} to={to} className="dash-tool-row">
            <Icon size={15} style={{ color }} />
            <span>{label}</span>
          </Link>
        ))}
      </div>
    </aside>
  );

  const main = (
    <div className="dash-main min-w-0">
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="page-title">Control Center</h1>
          <p className="page-sub">Frosted DNA · private on device</p>
        </div>
        <span className="badge-live">
          <span className="w-1 h-1 rounded-full bg-[var(--ac3)]" />
          LIVE
        </span>
      </div>

      <div className="dash-mobile-dna lg:hidden mb-4">{renderConstellation()}</div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 mb-4">
        {[
          { v: scores.aura, label: 'AURA', id: 'rg1', colors: ['#0071E3', '#0A84FF'] as [string, string] },
          { v: scores.focus, label: 'FOCUS', id: 'rg2', colors: ['#34C759', '#30D158'] as [string, string] },
          { v: scores.clarity, label: 'CLEAR', id: 'rg3', colors: ['#FF9500', '#FF9F0A'] as [string, string] },
          { v: scores.org, label: 'ORG', id: 'rg4', colors: ['#0071E3', '#5AC8FA'] as [string, string] },
        ].map((s) => (
          <GlassCard key={s.id} className="flex flex-col items-center py-5">
            <ScoreRing value={s.v} label={s.label} gradientId={s.id} colors={s.colors} />
            <p className="mt-2 text-xs font-semibold">
              {s.label === 'AURA'
                ? 'Aura Score'
                : s.label === 'FOCUS'
                  ? 'Focus Score'
                  : s.label === 'CLEAR'
                    ? 'Clarity Score'
                    : 'Organization'}
            </p>
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
              { l: 'Distracted', v: dna?.distractions.length ?? '—', c: 'var(--red)' },
              { l: 'Redundancies', v: dna?.redundancies.length ?? '—', c: 'var(--amber)' },
              { l: 'Active Profile', v: activeProfile.name, c: 'var(--ac2)' },
            ].map((row) => (
              <div key={row.l} className="stat-row">
                <span className="text-xs">{row.l}</span>
                <span className="font-mono text-sm font-bold" style={{ color: row.c }}>
                  {row.v}
                </span>
              </div>
            ))}
          </div>
        </GlassCard>
        <GlassCard>
          <p className="section-label mb-2.5">ECOSYSTEM PROFILES DETECTED</p>
          <div className="flex flex-wrap gap-1 mb-3">
            {dna?.locations.length ? (
              dna.locations.map((l) => <AppChip key={l.name} label={`${l.emoji} ${l.name}`} active />)
            ) : (
              <span className="text-xs text-[var(--mu)]">Import apps to detect…</span>
            )}
          </div>
          <p className="section-label mb-1.5">SMART INSIGHT</p>
          <p className="text-xs leading-relaxed" style={{ color: state.apps.length ? 'var(--tx)' : 'var(--mu)' }}>
            {insight}
          </p>
        </GlassCard>
      </div>

      {!state.apps.length && (
        <GlassCard className="mb-4 border border-[var(--ac)]/20 bg-[var(--ac)]/5">
          <div className="flex items-start gap-4">
            <div className="welcome-dna-card shrink-0 w-14 h-10 rounded-lg relative overflow-hidden">
              <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-[var(--ac)]" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-bold text-sm mb-1">Import my apps</p>
              <p className="text-xs leading-relaxed mb-3" style={{ color: 'var(--mu)' }}>
                Local-only analysis — distractions, redundancies, patterns. No upload.
              </p>
              <Link
                to="/import"
                className="inline-flex items-center gap-2 text-xs font-bold px-4 py-2 rounded-xl"
                style={{ background: 'var(--ac)', color: '#fff' }}
              >
                Import my apps →
              </Link>
            </div>
          </div>
        </GlassCard>
      )}

      <div className="lg:hidden">
        <p className="section-label mb-2.5">QUICK ACCESS</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {QUICK.map(({ to, icon: Icon, label, color }) => (
            <Link key={to} to={to} className="quick-tile">
              <Icon size={16} style={{ color }} />
              <span className="text-[11px]">{label}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="dash-home-layout">
      <div className="hidden lg:block">{renderConstellation()}</div>
      {main}
      <div className="hidden lg:block">{toolsRail}</div>
    </div>
  );
}
