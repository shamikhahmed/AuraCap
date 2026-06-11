import { Sparkles } from 'lucide-react';
import { useApp } from '@/context/AppContext';

export function DemoBanner() {
  const { state, exitDemo } = useApp();
  if (!state.demoMode) return null;
  return (
    <div className="mx-4 md:mx-0 mt-4 mb-2 flex items-center justify-between gap-3 px-4 py-3 rounded-2xl bg-[rgba(79,110,247,0.12)] border border-[rgba(79,110,247,0.28)]">
      <div className="flex items-center gap-2 text-sm">
        <Sparkles size={16} className="text-[var(--ac)]" />
        <span>You're viewing a demo wardrobe — sample apps with realistic DNA results.</span>
      </div>
      <button type="button" onClick={() => exitDemo()} className="btn-ghost text-xs shrink-0">Start my own</button>
    </div>
  );
}
