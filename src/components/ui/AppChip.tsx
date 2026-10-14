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
  const tone = cn(
    active
      ? 'bg-[rgba(79,110,247,0.18)] border-[rgba(79,110,247,0.48)] text-[var(--ac)] font-medium'
      : 'bg-[var(--inp)] border-[var(--bd2)]',
  );

  const iconLabel = (
    <>
      {emoji && <AppIcon name={displayName} emoji={emoji} size={14} />}
      {label}
    </>
  );

  // Removable chips: sibling controls (never nest button-in-button).
  if (onRemove) {
    return (
      <span
        className={cn(
          'inline-flex items-center gap-0.5 rounded-full text-xs border whitespace-nowrap pl-3.5 pr-1 min-h-11 touch-manipulation',
          tone,
          !active && 'hover:bg-[rgba(79,110,247,0.1)]',
          className,
        )}
      >
        <button
          type="button"
          onClick={onClick}
          className="inline-flex items-center gap-1.5 min-h-11 py-2 touch-manipulation"
        >
          {iconLabel}
        </button>
        <button
          type="button"
          className="inline-flex items-center justify-center min-h-11 min-w-11 text-sm text-[var(--mu)] hover:text-[var(--red)] touch-manipulation"
          onClick={onRemove}
          aria-label={`Remove ${label}`}
        >
          ×
        </button>
      </span>
    );
  }

  if (onClick) {
    return (
      <button
        type="button"
        onClick={onClick}
        className={cn(
          'inline-flex items-center gap-1.5 rounded-full text-xs border transition-all whitespace-nowrap min-h-11 min-w-11 px-3.5 py-2 touch-manipulation',
          tone,
          !active && 'hover:bg-[rgba(79,110,247,0.1)]',
          className,
        )}
      >
        {iconLabel}
      </button>
    );
  }

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full text-xs border transition-all whitespace-nowrap px-2.5 py-1.5',
        tone,
        className,
      )}
    >
      {iconLabel}
    </span>
  );
}
