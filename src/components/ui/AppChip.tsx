import { cn } from '@/lib/utils';
import { AppIcon } from '@/components/ui/AppIcon';

interface AppChipProps {
  label: string;
  emoji?: string;
  appName?: string;
  active?: boolean;
  onClick?: () => void;
  onRemove?: () => void;
  className?: string;
}

export function AppChip({ label, emoji, appName, active, onClick, onRemove, className }: AppChipProps) {
  const displayName = appName ?? label.replace(/^.\s/, '');
  const interactive = Boolean(onClick || onRemove);
  const chipClass = cn(
    'inline-flex items-center gap-1.5 rounded-full text-xs border transition-all whitespace-nowrap',
    interactive ? 'min-h-11 min-w-11 px-3.5 py-2 touch-manipulation' : 'px-2.5 py-1.5',
    active
      ? 'bg-[rgba(79,110,247,0.18)] border-[rgba(79,110,247,0.48)] text-[var(--ac)] font-medium'
      : 'bg-[var(--inp)] border-[var(--bd2)]',
    interactive && !active && 'hover:bg-[rgba(79,110,247,0.1)]',
    className,
  );
  const body = (
    <>
      {emoji && <AppIcon name={displayName} emoji={emoji} size={14} />}
      {label}
      {onRemove && (
        <span
          role="button"
          tabIndex={0}
          className="inline-flex items-center justify-center min-h-11 min-w-11 -my-2 -mr-2 text-sm text-[var(--mu)] hover:text-[var(--red)]"
          onClick={(e) => { e.stopPropagation(); onRemove(); }}
          onKeyDown={(e) => { if (e.key === 'Enter') { e.stopPropagation(); onRemove(); } }}
          aria-label={`Remove ${label}`}
        >×</span>
      )}
    </>
  );

  if (!interactive) {
    return <span className={chipClass}>{body}</span>;
  }

  return (
    <button type="button" onClick={onClick} className={chipClass}>
      {body}
    </button>
  );
}
