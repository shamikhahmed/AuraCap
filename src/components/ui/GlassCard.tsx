import type { CSSProperties, ReactNode } from 'react';
import { cn } from '@/lib/utils';

export function GlassCard({
  children,
  className,
  onClick,
  delay = 0,
  tilt = true,
}: {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  delay?: number;
  tilt?: boolean;
}) {
  const style =
    delay > 0
      ? ({ '--glass-enter-delay': `${delay}s` } as CSSProperties)
      : undefined;

  return (
    <div
      data-cap-tilt={tilt ? '5' : undefined}
      className={cn(
        'glass-card glass-premium glass-card-enter relative overflow-hidden cap-depth rounded-[20px] p-5 transition-all hover:border-[rgba(79,110,247,0.3)]',
        onClick && 'cursor-pointer',
        className,
      )}
      style={style}
      onClick={onClick}
    >
      {children}
    </div>
  );
}
