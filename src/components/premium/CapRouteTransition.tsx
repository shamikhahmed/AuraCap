import { useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';

type CapRouteTransitionProps = {
  children: React.ReactNode;
  className?: string;
};

/**
 * Route enter animation via CSS (View Transitions when available).
 * Replaces GSAP — AUR-P1-03 / P-AUR-2. Respects prefers-reduced-motion.
 */
export function CapRouteTransition({ children, className }: CapRouteTransitionProps) {
  const location = useLocation();

  return (
    <div
      key={location.pathname}
      className={cn('cap-route-enter', className)}
      data-cap-dashboard
    >
      {children}
    </div>
  );
}
