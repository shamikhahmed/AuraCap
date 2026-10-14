import type { CSSProperties } from 'react';
import { cn } from '@/lib/utils';

export function GlassCard({
  className,
  children,
  delay = 0,
  glow,
  padding = 'default',
}: {
  className?: string;
  children: React.ReactNode;
  delay?: number;
  glow?: string;
  padding?: 'none' | 'default' | 'lg';
}) {
  const style = {
    ...(glow ? { '--card-glow': glow } : {}),
    ...(delay > 0 ? { '--glass-enter-delay': `${delay}s` } : {}),
  } as CSSProperties;

  return (
    <div
      className={cn(
        'glass-premium glass-card-enter relative overflow-hidden',
        padding === 'default' && 'p-5',
        padding === 'lg' && 'p-6 md:p-8',
        padding === 'none' && 'p-0',
        className,
      )}
      style={Object.keys(style).length ? style : undefined}
    >
      {glow && <div className="glass-premium-glow" aria-hidden />}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
