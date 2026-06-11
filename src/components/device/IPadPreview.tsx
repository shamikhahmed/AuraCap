import { DCLRS, DEMOJ } from '@/data';

export function IPadPreview({ model = 'ipadpro11m4' }: { model?: string }) {
  const hasSB = model.includes('pro') || model.includes('air');
  const left = hasSB ? 54 : 0;

  return (
    <div className="relative w-[280px] h-[210px] rounded-[14px] border-2 border-white/14 bg-black overflow-hidden shadow-[0_0_40px_rgba(0,0,0,0.7)]">
      {hasSB && (
        <div className="absolute left-0 top-0 bottom-0 w-[54px] bg-black/50 border-r border-white/[0.07] flex flex-col items-center pt-3.5 gap-1.5 z-10">
          {['🔵', '⚡', '📝', '📷', '🎬', '💼', '📊'].map((ic) => (
            <div key={ic} className="w-8 h-8 rounded-lg bg-white/[0.08] flex items-center justify-center text-[13px]">{ic}</div>
          ))}
        </div>
      )}
      <div
        className="absolute top-0 right-0 bottom-0 bg-gradient-to-br from-[#060610] to-[#0a0820] grid grid-cols-5 gap-1.5 p-2.5 content-start"
        style={{ left }}
      >
        {Array.from({ length: 25 }).map((_, i) => (
          <div
            key={i}
            className="aspect-square rounded-[11px] flex items-center justify-center text-[13px]"
            style={{ background: `${DCLRS[i % DCLRS.length]}25`, border: `1px solid ${DCLRS[i % DCLRS.length]}38` }}
          >
            {DEMOJ[i % DEMOJ.length]}
          </div>
        ))}
      </div>
      <div className="absolute bottom-1.5 z-10 flex justify-center" style={{ left, right: 0 }}>
        <div className="flex gap-1.5 bg-white/10 backdrop-blur-md border border-white/10 rounded-[14px] p-1.5">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="w-7 h-7 rounded-lg flex items-center justify-center text-xs" style={{ background: `${DCLRS[(i + 6) % DCLRS.length]}44` }}>
              {DEMOJ[(i + 6) % DEMOJ.length]}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
