import { WGTS, WIDGET_PRESETS } from '@/data';
import { useApp } from '@/context/AppContext';
import { GlassCard } from '@/components/ui/GlassCard';
import type { DeviceType, Widget } from '@/types';

const PRESET_META = [
  { id: 'minimal', emoji: '⬛', label: 'Minimalist', desc: 'Clock + Weather only' },
  { id: 'founder', emoji: '⚡', label: 'Founder', desc: 'Calendar + Focus + Stocks' },
  { id: 'crypto', emoji: '₿', label: 'Crypto Trader', desc: 'Markets + Portfolio + News' },
  { id: 'fitness', emoji: '💪', label: 'Fitness', desc: 'Rings + Steps + Water' },
  { id: 'islamic', emoji: '🕌', label: 'Islamic', desc: 'Prayer + Quran + Hijri' },
  { id: 'creative', emoji: '🎨', label: 'Creative', desc: 'Photos + Music + Inspiration' },
  { id: 'student', emoji: '📚', label: 'Student', desc: 'Schedule + Timer + Reminders' },
  { id: 'traveler', emoji: '✈', label: 'Traveler', desc: 'Maps + Flight + Weather' },
  { id: 'photographer', emoji: '📷', label: 'Photographer', desc: 'Camera + Lightroom + Maps' },
  { id: 'gamer', emoji: '🎮', label: 'Gamer', desc: 'PS App + Twitch + Battery' },
] as const;

export function WidgetLab() {
  const { state, setWidgetStack, toast, persist } = useApp();
  const stack = state.widgetStack;

  const addWidget = (w: Widget) => {
    if (stack.some((x) => x.n === w.n)) { toast('Already in stack'); return; }
    setWidgetStack([...stack, w]);
    toast(`${w.n} added!`);
  };

  const removeWidget = (name: string) => setWidgetStack(stack.filter((x) => x.n !== name));

  const applyPreset = (id: keyof typeof WIDGET_PRESETS) => {
    const preset = [...WIDGET_PRESETS[id]] as Widget[];
    setWidgetStack(preset);
    toast(`${id.charAt(0).toUpperCase() + id.slice(1)} widget stack applied!`);
  };

  return (
    <div>
      <div className="mb-6"><h1 className="page-title">Widget Lab</h1><p className="page-sub">Build widget stacks per device — iPhone, iPad & Mac all have different widget sizes</p></div>

      <div className="flex gap-2 mb-3.5">
        {(['iphone', 'ipad', 'mac'] as DeviceType[]).map((d) => (
          <button key={d} type="button" onClick={() => persist({ widgetDevice: d })} className={`device-tab ${state.widgetDevice === d ? 'active' : ''}`}>{d}</button>
        ))}
      </div>

      <p className="section-label mb-2">PRESET STACKS BY USER TYPE</p>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 mb-4">
        {PRESET_META.map((p) => (
          <button key={p.id} type="button" onClick={() => applyPreset(p.id)} className="preset-tile text-center">
            <div className="text-xl mb-1">{p.emoji}</div>
            <p className="text-xs font-semibold">{p.label}</p>
            <p className="text-[10px] text-[var(--mu)]">{p.desc}</p>
          </button>
        ))}
      </div>

      <div className="grid lg:grid-cols-[1fr_auto] gap-5 items-start">
        <div className="flex flex-col gap-3">
          <GlassCard>
            <p className="section-label mb-2">WIDGET POOL <span className="text-[var(--ac)]">({state.widgetDevice})</span></p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {WGTS.map((w) => (
                <button key={w.n} type="button" onClick={() => addWidget(w)} className="preset-tile text-left" style={{ opacity: stack.some((x) => x.n === w.n) ? 0.4 : 1 }}>
                  <div className="text-base mb-0.5">{w.e}</div>
                  <p className="text-xs font-semibold">{w.n}</p>
                  <p className="text-[10px] text-[var(--mu)]">{w.d}</p>
                </button>
              ))}
            </div>
          </GlassCard>
          <GlassCard>
            <div className="flex justify-between mb-2"><p className="section-label">MY STACK</p><button type="button" onClick={() => setWidgetStack([])} className="btn-ghost btn-sm">Clear</button></div>
            <div className="flex flex-col gap-1.5 min-h-[44px]">
              {stack.length ? stack.map((w) => (
                <div key={w.n} className="list-item">
                  <span className="text-[15px]">{w.e}</span>
                  <span className="text-xs flex-1 ml-2">{w.n}</span>
                  <span className="text-[10px] text-[var(--mu)]">{w.d}</span>
                  <button type="button" onClick={() => removeWidget(w.n)} className="text-[11px] text-[var(--red)] ml-2">×</button>
                </div>
              )) : <span className="text-xs text-[var(--mu)]">Select widgets above…</span>}
            </div>
            <button type="button" onClick={() => toast('Widget stack saved! ⚡')} className="btn-primary w-full mt-2.5">Save Stack</button>
          </GlassCard>
        </div>
        <div className="sticky top-[70px] flex flex-col items-center gap-2">
          <p className="section-label">PREVIEW</p>
          <div className="lockscreen-mock w-[172px] h-[374px] rounded-[36px]">
            <div className="ls-di" />
            <div className="absolute inset-0 bg-black pt-10 px-2 pb-2 flex flex-col gap-1.5">
              {stack.length ? stack.map((w, i) => (
                <div key={w.n} className={`rounded-2xl border flex items-center justify-center flex-col gap-0.5 ${i === 0 ? 'h-[108px]' : 'h-16'}`} style={{ background: `rgba(79,110,247,${0.14 - i * 0.02})`, borderColor: `rgba(79,110,247,${0.18 - i * 0.02})` }}>
                  <span className="text-xl">{w.e}</span><span className="text-[9px] text-white/50">{w.n}</span>
                </div>
              )) : (
                <>
                  <div className="h-[108px] rounded-2xl bg-[rgba(79,110,247,0.14)] border border-[rgba(79,110,247,0.18)] flex items-center justify-center flex-col"><span className="text-xl">📅</span><span className="text-[9px] text-white/50">Calendar</span></div>
                  <div className="grid grid-cols-2 gap-1.5"><div className="h-16 rounded-xl bg-[rgba(29,233,182,0.1)] flex items-center justify-center flex-col"><span>🌤</span><span className="text-[8px] text-white/40">Weather</span></div><div className="h-16 rounded-xl bg-[rgba(245,158,11,0.1)] flex items-center justify-center flex-col"><span>⏱</span><span className="text-[8px] text-white/40">Focus</span></div></div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
