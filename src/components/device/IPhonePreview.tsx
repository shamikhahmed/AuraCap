import { DCLRS, DEMOJ } from '@/data';

export function IPhonePreview({ model = 'iphone16promax' }: { model?: string }) {
  const isDI = model.includes('16') || model.includes('15') || model.includes('17') || model.includes('14pro');
  const isSE = model.includes('se');
  const isMini = model.includes('mini');
  const w = isMini ? 158 : model.includes('max') ? 196 : 188;
  const h = isMini ? 344 : model.includes('max') ? 424 : 408;
  const topPad = isDI ? 50 : 44;

  return (
    <div
      className="relative overflow-hidden bg-black rounded-[40px] border-2 border-white/15 shadow-[0_0_60px_rgba(0,0,0,0.85)]"
      style={{ width: w, height: h }}
    >
      {isSE ? (
        <div className="absolute top-0 left-0 right-0 h-[18px] bg-[#1a1a1a] z-20" />
      ) : isDI ? (
        <div className="absolute top-[9px] left-1/2 -translate-x-1/2 w-[76px] h-[22px] bg-black rounded-xl z-20 border border-white/[0.07]" />
      ) : (
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[120px] h-[30px] bg-black rounded-b-[18px] z-20" />
      )}
      <div className="absolute top-0 left-0 right-0 h-11 z-15 flex items-end justify-between px-4 text-[9px] text-white/65 font-semibold">
        <span>9:41</span><span className="text-[8px]">▪ ▪ ▪</span>
      </div>
      <div
        className="absolute inset-0 grid grid-cols-4 gap-[7px] content-start px-2.5 bg-gradient-to-br from-[#050510] to-[#0a0520]"
        style={{ paddingTop: topPad, paddingBottom: 68 }}
      >
        {Array.from({ length: 16 }).map((_, i) => (
          <div
            key={i}
            className="aspect-square rounded-[13px] flex items-center justify-center"
            style={{
              background: `${DCLRS[i % DCLRS.length]}2a`,
              border: `1px solid ${DCLRS[i % DCLRS.length]}44`,
              fontSize: isMini ? 13 : 16,
            }}
          >
            {DEMOJ[i % DEMOJ.length]}
          </div>
        ))}
      </div>
      <div className="absolute bottom-2.5 left-2.5 right-2.5 h-[55px] rounded-[20px] bg-white/10 backdrop-blur-md border border-white/10 flex items-center justify-center gap-2 z-10">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="w-[39px] h-[39px] rounded-xl flex items-center justify-center text-[17px]"
            style={{ background: `${DCLRS[(i + 4) % DCLRS.length]}44` }}
          >
            {DEMOJ[(i + 4) % DEMOJ.length]}
          </div>
        ))}
      </div>
      {!isSE && <div className="absolute bottom-[5px] left-1/2 -translate-x-1/2 w-[100px] h-1 rounded bg-white/28 z-20" />}
    </div>
  );
}
