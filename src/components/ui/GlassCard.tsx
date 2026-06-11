import { cn } from '@/lib/utils';
import type { ReactNode } from 'react';

export function GlassCard({ children, className, onClick }: { children: ReactNode; className?: string; onClick?: () => void }) {
  return (
    <div className={cn('glass-card rounded-[20px] p-5 transition-all hover:border-[rgba(79,110,247,0.3)]', onClick && 'cursor-pointer', className)} onClick={onClick}>
      {children}
    </div>
  );
}
