import { motion } from 'framer-motion';
import type { ReactNode } from 'react';
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
  return (
    <motion.div
      initial={{ opacity: 0, y: 16, rotateX: 8, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
      transition={{ duration: 0.48, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      data-cap-tilt={tilt ? '5' : undefined}
      className={cn(
        'glass-card glass-premium relative overflow-hidden cap-depth rounded-[20px] p-5 transition-all hover:border-[rgba(79,110,247,0.3)]',
        onClick && 'cursor-pointer',
        className,
      )}
      onClick={onClick}
    >
      {children}
    </motion.div>
  );
}
