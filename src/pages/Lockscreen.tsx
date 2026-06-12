import { LS_PRESETS, LSBGS } from '@/data';
import { useApp } from '@/context/AppContext';
import { GlassCard } from '@/components/ui/GlassCard';
import { exportLockscreenPng } from '@/lib/pngExport';

const WIDGET_PAIRS = [
  ['🏃', 'Activity', '🌤', 'Weather'],
  ['🔋', 'Battery', '📅', 'Calendar'],
  ['⏱', 'Focus', '📊', 'Steps'],
  ['🕌', 'Prayer', '🌙', 'Hijri'],
  ['📈', 'Crypto', '💹', 'Markets'],
  ['🎵', 'Music', '💤', 'Sleep'],
  ['📷', 'Camera', '🖼', 'Photos'],
  ['🏋', 'Fitness', '💧', 'Water'],
  ['✈', 'Flight', '🕐', 'Time Zone'],
  ['📖', 'Quran', '📿', 'Dhikr'],
] as const;

const CLOCK_STYLES = [
  { wt: '200', st: 'letter-spacing:-2px', label: 'Thin' },
  { wt: '400', st: '', label: 'Regular' },
  { wt: '700', st: 'letter-spacing:-1px', label: 'Bold' },
  { wt: '300', st: 'letter-spacing:5px', label: 'Spaced' },
  { wt: '700', st: 'font-family:monospace', label: 'Mono' },
  { wt: '800', st: 'letter-spacing:-3px', label: 'Heavy' },
];

export function Lockscreen() {
  const { state, updateLockscreen, toast } = useApp();
  const ls = state.lockscreen;

  const update = (patch: Partial<typeof ls>) => updateLockscreen({ ...ls, ...patch });

  const time = new Date();
  const clockStr = `${String(time.getHours()).padStart(2, '0')}:${String(time.getMinutes()).padStart(2, '0')}`;

  return (
    <div>
      <div className="mb-6"><h1 className="page-title">Lockscreen Builder</h1><p className="page-sub">Separate designs for iPhone, iPad — each device has different lockscreen options</p></div>

      <div className="flex gap-2 mb-3.5">
        {(['iphone', 'ipad'] as const).map((d) => (
          <button key={d} type="button" onClick={() => update({ device: d })} className={`device-tab ${ls.device === d ? 'active' : ''}`}>{d}</button>
        ))}
      </div>

      <p className="section-label mb-2">LOCKSCREEN STYLE</p>
      <div className="flex gap-1 flex-wrap mb-4">
        {LS_PRESETS.map((p) => (
          <button key={p.n} type="button" onClick={() => { update({ preset: p.n, background: p.bg }); toast(`${p.n} lockscreen applied!`); }} className="device-tab text-[11px]" style={{ background: p.bg, color: p.c }}>{p.n}</button>
        ))}
      </div>

      <div className="grid lg:grid-cols-[auto_1fr] gap-5 items-start">
        <div className="flex flex-col items-center gap-2">
          <div className="lockscreen-mock" style={{ background: ls.background }}>
            <div className={ls.device === 'ipad' ? 'ls-notch' : 'ls-di'} />
            <div className="text-center mt-3.5">
              <div className="text-[46px] font-extralight tracking-tight text-white" style={{ fontWeight: ls.clockWeight, ...(ls.clockStyle ? Object.fromEntries(ls.clockStyle.split(';').filter(Boolean).map((s) => s.split(':').map((x) => x.trim()))) : {}) }}>{clockStr}</div>
              <div className="text-[11px] text-white/50 mt-0.5">Friday, 22 May</div>
            </div>
            <div className="grid grid-cols-2 gap-1.5 mt-3 w-full px-3.5">
              <div className="rounded-[10px] p-1.5 bg-white/[0.09] text-[9px] text-center text-white"><div className="text-[13px]">{ls.widget1.emoji}</div>{ls.widget1.label}</div>
              <div className="rounded-[10px] p-1.5 bg-white/[0.09] text-[9px] text-center text-white"><div className="text-[13px]">{ls.widget2.emoji}</div>{ls.widget2.label}</div>
            </div>
            <div className="absolute bottom-3.5 left-3.5 right-3.5 flex justify-between">
              <div className="w-[30px] h-[30px] rounded-full bg-white/12 flex items-center justify-center text-[11px]">🔦</div>
              <div className="w-[30px] h-[30px] rounded-full bg-white/12 flex items-center justify-center text-[11px]">📷</div>
            </div>
          </div>
          <button type="button" onClick={() => toast('Lockscreen saved! ✨')} className="btn-primary btn-sm">Save Design</button>
          <button
            type="button"
            onClick={async () => {
              try {
                await exportLockscreenPng(ls);
                toast('Lockscreen PNG downloaded!');
              } catch {
                toast('Export failed — try again');
              }
            }}
            className="btn-ghost btn-sm"
          >
            Download PNG
          </button>
        </div>

        <div className="flex flex-col gap-3">
          <GlassCard>
            <p className="section-label mb-2">CLOCK STYLE</p>
            <div className="grid grid-cols-3 gap-1">
              {CLOCK_STYLES.map((c) => (
                <button key={c.label} type="button" onClick={() => update({ clockWeight: c.wt, clockStyle: c.st })} className={`font-opt ${ls.clockWeight === c.wt ? 'active' : ''}`}>
                  <div className="text-[15px]" style={{ fontWeight: Number(c.wt) }}>9:41</div><div className="text-[9px] text-[var(--mu)]">{c.label}</div>
                </button>
              ))}
            </div>
          </GlassCard>
          <GlassCard>
            <p className="section-label mb-2">WIDGET PAIRS</p>
            {WIDGET_PAIRS.map(([e1, n1, e2, n2]) => (
              <button key={n1} type="button" onClick={() => { update({ widget1: { emoji: e1, label: n1 }, widget2: { emoji: e2, label: n2 } }); toast('Widgets updated!'); }} className="list-item w-full text-left mb-1 cursor-pointer">
                <span className="text-xs">{e1} {n1} + {e2} {n2}</span>
              </button>
            ))}
          </GlassCard>
          <GlassCard>
            <p className="section-label mb-2">BACKGROUND</p>
            <div className="grid grid-cols-4 gap-1">
              {LSBGS.map((bg, i) => (
                <button key={i} type="button" onClick={() => update({ background: bg })} className="h-[38px] rounded-md border-2 border-transparent hover:border-[var(--ac)]" style={{ background: bg }} />
              ))}
            </div>
          </GlassCard>
          <GlassCard>
            <p className="section-label mb-2">FOCUS MODES</p>
            {[{ k: 'dnd', l: 'Do Not Disturb' }, { k: 'work', l: 'Work Focus' }, { k: 'prayer', l: 'Prayer / Islamic Focus' }, { k: 'sleep', l: 'Sleep Mode' }].map((f) => (
              <div key={f.k} className="flex items-center justify-between py-1.5 border-b border-[var(--bd)] last:border-0">
                <span className="text-xs font-medium">{f.l}</span>
                <label className="toggle"><input type="checkbox" checked={ls.focusModes[f.k]} onChange={(e) => update({ focusModes: { ...ls.focusModes, [f.k]: e.target.checked } })} /><span className="toggle-slider" /></label>
              </div>
            ))}
          </GlassCard>
        </div>
      </div>
    </div>
  );
}
