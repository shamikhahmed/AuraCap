import type { CSSProperties } from 'react';
import { cn } from '@/lib/utils';
import { PressableLink } from '@/components/ui/PressableScale';

export function StatPill({
  icon,
  label,
  value,
  tone = 'default',
  delay = 0,
  to,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  tone?: 'default' | 'hot' | 'warn' | 'good';
  delay?: number;
  to?: string;
}) {
  const className = cn('stat-pill', tone !== 'default' && `stat-pill--${tone}`);
  const style =
    delay > 0
      ? ({ '--glass-enter-delay': `${delay}s` } as CSSProperties)
      : undefined;

  const inner = (
    <>
      <div className="stat-pill-icon">{icon}</div>
      <div>
        <p className="stat-pill-label">{label}</p>
        <p className="stat-pill-value">{value}</p>
      </div>
    </>
  );

  if (to) {
    return (
      <div className="glass-card-enter" style={style}>
        <PressableLink to={to} className={className} aria-label={`${label}: ${value}`}>
          {inner}
        </PressableLink>
      </div>
    );
  }

  return (
    <div className={cn(className, 'glass-card-enter')} style={style}>
      {inner}
    </div>
  );
}
