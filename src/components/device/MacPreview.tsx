import { DCLRS, DEMOJ } from '@/data';

export function MacPreview({ model = 'mbp16m4' }: { model?: string }) {
  const hasNotch = model.includes('mbp') && !model.includes('intel');

  return (
    <div className="w-[320px] rounded-[10px] border-2 border-white/14 overflow-hidden shadow-[0_0_40px_rgba(0,0,0,0.7)]">
      <div className="h-[26px] bg-[#2c2c2e] flex items-center px-3 gap-1.5 relative">
        <div className="w-[11px] h-[11px] rounded-full bg-[#ff5f56]" />
        <div className="w-[11px] h-[11px] rounded-full bg-[#ffbd2e]" />
        <div className="w-[11px] h-[11px] rounded-full bg-[#27c93f]" />
        <div className="absolute left-1/2 -translate-x-1/2 text-[9px] text-white/30 font-mono">
          {hasNotch ? 'MacBook Pro — M4' : 'MacBook'}
        </div>
        {hasNotch && <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60px] h-[13px] bg-black rounded-b-lg z-10" />}
      </div>
      <div className="h-[180px] bg-gradient-to-br from-[#060610] to-[#080820] relative grid grid-cols-8 gap-1 p-2 content-start">
        <div className="absolute top-0 left-0 right-0 h-[18px] bg-black/40 backdrop-blur flex items-center justify-between px-2 z-5">
          <span className="text-[8px] text-white/60 font-semibold">⊛ Finder</span>
          <span className="text-[8px] text-white/40">9:41 AM</span>
        </div>
        {Array.from({ length: 24 }).map((_, i) => (
          <div key={i} className="aspect-square rounded-lg flex items-center justify-center text-xs" style={{ background: `${DCLRS[i % DCLRS.length]}22` }}>
            {DEMOJ[i % DEMOJ.length]}
          </div>
        ))}
        <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 flex gap-1 bg-white/[0.08] backdrop-blur-md border border-white/10 rounded-xl p-1.5 z-10">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="w-6 h-6 rounded-md flex items-center justify-center text-[10px]" style={{ background: `${DCLRS[(i + 8) % DCLRS.length]}44` }}>
              {DEMOJ[(i + 8) % DEMOJ.length]}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
