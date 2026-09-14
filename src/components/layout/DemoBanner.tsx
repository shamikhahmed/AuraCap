import { useApp } from '@/context/AppContext';

export function DemoBanner() {
  const { state, exitDemo } = useApp();
  if (!state.demoMode) return null;
  return (
    <div
      role="status"
      className="mb-4 flex items-center justify-between gap-3 px-4 py-3 rounded-[14px] bg-[color-mix(in_srgb,var(--ac)_10%,transparent)] border border-[color-mix(in_srgb,var(--ac)_24%,transparent)]"
    >
      <p className="text-sm text-[var(--tx)]">You&apos;re viewing sample data.</p>
      <button type="button" onClick={() => exitDemo()} className="btn-ghost text-xs shrink-0">
        Use my apps
      </button>
    </div>
  );
}
