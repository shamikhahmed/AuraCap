import { Link } from 'react-router-dom';
import { FileInput, Layers, Image, Users, Smartphone, Tablet, Laptop } from 'lucide-react';
import { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { GlassCard } from '@/components/ui/GlassCard';
import { ScoreRing } from '@/components/ui/ScoreRing';
import { AppChip } from '@/components/ui/AppChip';
import { getInsight } from '@/engines/scores';
import { Modal } from '@/components/ui/Modal';

/** Max 4 shortcuts that do not duplicate mobile tab destinations (AUR-P1-05). */
const QUICK = [
  { to: '/import', icon: FileInput, label: 'Import', color: 'var(--ac)' },
  { to: '/wallpaper', icon: Image, label: 'Wallpapers', color: 'var(--ac2)' },
  { to: '/profiles', icon: Users, label: 'Profiles', color: 'var(--amber)' },
  { to: '/organizer', icon: Layers, label: 'Organizer', color: 'var(--ac)' },
];

const DEVICES = [
  { id: 'mac', label: 'Mac', Icon: Laptop, x: 50, y: 12 },
  { id: 'phone', label: 'iPhone', Icon: Smartphone, x: 18, y: 78 },
  { id: 'pad', label: 'iPad', Icon: Tablet, x: 82, y: 78 },
];

export function Dashboard() {
  const { state, scores, dna, activeProfile } = useApp();
  const insight = getInsight(state.apps);
  const [scoreInfo, setScoreInfo] = useState(false);

  const renderConstellation = () => (
    <aside className="dash-rail dash-rail--constellation" aria-label="Devices">
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
              <p className="text-[13px] font-semibold text-[var(--mu)]">Setup report</p>
              <p className="text-sm font-semibold tracking-tight mt-0.5" style={{ fontFamily: 'var(--fd)' }}>
                {scores.aura}
              </p>
            </div>
            <div className="text-[12px] text-[var(--mu)]">
              {state.apps.length ? `${state.apps.length} apps` : 'Import to score'}
            </div>
          </div>
        </div>
      </div>
      <Link to="/dna" className="dash-rail-link">
        Full setup report
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
      <div className="mb-6">
        <h1 className="page-title">Overview</h1>
        <p className="page-sub">Your setup at a glance. Stored only on this device.</p>
      </div>

      <div className="dash-mobile-dna dash-show-below-700 mb-4">{renderConstellation()}</div>

      <GlassCard className="mb-4 flex flex-col sm:flex-row items-center gap-5 py-5">
        <ScoreRing
          value={scores.aura}
          label=""
          gradientId="rg-aura"
          colors={['#0071E3', '#0A84FF']}
          size={112}
        />
        <div className="flex-1 w-full min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h2 className="text-lg font-bold" style={{ fontFamily: 'var(--fd)' }}>Aura Score</h2>
            <button
              type="button"
              className="text-xs font-semibold text-[var(--ac)] underline-offset-2 hover:underline"
              onClick={() => setScoreInfo(true)}
              aria-label="What is Aura Score?"
            >
              What is this?
            </button>
          </div>
          <p className="text-sm text-[var(--mu)] mb-3">How focused, clear and organized your app list looks.</p>
          <ul className="flex flex-col gap-2" aria-label="Score breakdown">
            {[
              { label: 'Focus', value: scores.focus },
              { label: 'Clarity', value: scores.clarity },
              { label: 'Organization', value: scores.org },
            ].map((row) => (
              <li key={row.label} className="stat-row !py-2.5">
                <span className="text-sm">{row.label}</span>
                <span className="text-sm font-semibold tabular-nums" style={{ color: 'var(--ac)' }}>
                  {row.value}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </GlassCard>

      <div className="grid md:grid-cols-2 gap-3.5 mb-3.5">
        <GlassCard>
          <p className="section-label mb-2.5">Quick stats</p>
          <div className="flex flex-col gap-2">
            {[
              { l: 'Apps tracked', v: state.apps.length, c: 'var(--ac)' },
              { l: 'Smart folders', v: state.apps.length ? Math.ceil(state.apps.length / 9) : 0, c: 'var(--ac3)' },
              { l: 'Distracted', v: dna?.distractions.length ?? '—', c: 'var(--red)' },
              { l: 'Redundancies', v: dna?.redundancies.length ?? '—', c: 'var(--amber)' },
              { l: 'Active profile', v: activeProfile.name, c: 'var(--ac2)' },
            ].map((row) => (
              <div key={row.l} className="stat-row">
                <span className="text-sm">{row.l}</span>
                <span className="text-sm font-semibold tabular-nums" style={{ color: row.c }}>
                  {row.v}
                </span>
              </div>
            ))}
          </div>
        </GlassCard>
        <GlassCard>
          <p className="section-label mb-2.5">Regions detected</p>
          <div className="flex flex-wrap gap-1 mb-3">
            {dna?.locations.length ? (
              dna.locations.map((l) => (
                <AppChip key={l.name} label={`Region: ${l.name}`} active />
              ))
            ) : (
              <span className="text-sm text-[var(--mu)]">Import apps to detect…</span>
            )}
          </div>
          <p className="section-label mb-1.5">Insight</p>
          <p className="text-sm leading-relaxed" style={{ color: state.apps.length ? 'var(--tx)' : 'var(--mu)' }}>
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
              <p className="font-bold text-sm mb-1">Import your apps</p>
              <p className="text-sm leading-relaxed mb-3" style={{ color: 'var(--mu)' }}>
                Paste or type your apps to score focus, clarity and organization. Nothing leaves this device.
              </p>
              <Link
                to="/import"
                className="inline-flex items-center gap-2 text-sm font-bold px-4 py-2 rounded-xl"
                style={{ background: 'var(--ac)', color: '#fff' }}
              >
                Import apps
              </Link>
            </div>
          </div>
        </GlassCard>
      )}

      <div className="dash-show-below-700">
        <p className="section-label mb-2.5">Quick access</p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {QUICK.map(({ to, icon: Icon, label, color }) => (
            <Link key={to} to={to} className="quick-tile">
              <Icon size={16} style={{ color }} />
              <span className="text-[12px] font-medium">{label}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <>
      <div className="dash-home-layout">
        <div className="dash-hide-below-700">{renderConstellation()}</div>
        {main}
        <div className="dash-hide-below-700">{toolsRail}</div>
      </div>
      <Modal open={scoreInfo} onClose={() => setScoreInfo(false)} title="Aura Score">
        <p className="text-sm text-[var(--mu)] mb-3">
          Aura Score is a single number for how focused, clear and organized your app list looks. It is calculated on this device from the apps you imported — not a measurement of you.
        </p>
        <ul className="text-sm space-y-2 mb-4">
          <li><strong>Focus</strong> — fewer distraction-heavy apps.</li>
          <li><strong>Clarity</strong> — less overlap and clutter.</li>
          <li><strong>Organization</strong> — how well apps fit into folders.</li>
        </ul>
        <button type="button" className="btn-primary w-full" onClick={() => setScoreInfo(false)}>
          Got it
        </button>
      </Modal>
    </>
  );
}
