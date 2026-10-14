import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { hapticSelection } from '@/lib/premium/haptics';

export function OptionPill({
  label,
  selected,
  onSelect,
  className,
}: {
  label: string;
  selected: boolean;
  onSelect: () => void;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={() => {
        if (!selected) hapticSelection();
        onSelect();
      }}
      className={cn(
        'relative rounded-full px-4 py-2 text-sm font-medium min-h-[40px] transition-colors overflow-hidden pressable',
        selected
          ? 'bg-[var(--color-accent)] text-white'
          : 'bg-[var(--color-surface-elevated)] text-[var(--color-text-secondary)] border border-[var(--color-border-subtle)]',
        className,
      )}
    >
      <span className="relative z-10 flex items-center gap-1.5">
        {selected && (
          <span className="inline-flex" aria-hidden>
            <Check size={14} strokeWidth={3} />
          </span>
        )}
        {label}
      </span>
    </button>
  );
}
