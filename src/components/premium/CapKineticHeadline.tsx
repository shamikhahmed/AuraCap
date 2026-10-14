import type { CSSProperties } from 'react';
import { cn } from '@/lib/utils';

/** Line-by-line headline — CSS only (no framer). Respects prefers-reduced-motion. */
export function CapKineticHeadline({
  lines,
  className,
  gradient = false,
}: {
  lines: string[];
  className?: string;
  gradient?: boolean;
}) {
  return (
    <div className={cn('cap-kinetic', gradient && 'cap-kinetic-gradient', className)}>
      {lines.map((text, i) => (
        <span
          key={text}
          className="cap-kinetic-line block overflow-hidden"
          style={{ '--glass-enter-delay': `${0.06 + i * 0.085}s` } as CSSProperties}
        >
          <span className="inline-block glass-card-enter">{text}</span>
        </span>
      ))}
    </div>
  );
}
