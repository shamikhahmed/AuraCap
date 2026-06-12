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
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs border transition-all whitespace-nowrap',
        active
          ? 'bg-[rgba(79,110,247,0.18)] border-[rgba(79,110,247,0.48)] text-[var(--ac)] font-medium'
          : 'bg-[var(--inp)] border-[var(--bd2)] hover:bg-[rgba(79,110,247,0.1)]',
        className,
      )}
    >
      {emoji && <AppIcon name={displayName} emoji={emoji} size={14} />}
      {label}
      {onRemove && (
        <span
          role="button"
          tabIndex={0}
          className="text-[10px] text-[var(--mu)] ml-0.5 hover:text-[var(--red)]"
          onClick={(e) => { e.stopPropagation(); onRemove(); }}
          onKeyDown={(e) => { if (e.key === 'Enter') { e.stopPropagation(); onRemove(); } }}
        >×</span>
      )}
    </button>
  );
}
