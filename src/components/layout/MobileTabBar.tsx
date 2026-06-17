import { NavLink, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Brush, Gauge, LayoutGrid, Settings, Wand2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { hapticLight } from '@/lib/premium/haptics';

const TABS = [
  { to: '/dashboard', icon: Gauge, label: 'Home' },
  { to: '/apps', icon: LayoutGrid, label: 'Apps' },
  { to: '/designer', icon: Wand2, label: 'Design' },
  { to: '/cleanse', icon: Brush, label: 'Cleanse' },
  { to: '/settings', icon: Settings, label: 'More' },
];

function MobileTab({ to, icon: Icon, label }: { to: string; icon: typeof Gauge; label: string }) {
  return (
    <NavLink
      to={to}
      onClick={() => hapticLight()}
      className={({ isActive }) => cn('floating-tab-item', isActive && 'floating-tab-item--active')}
    >
      {({ isActive }) => (
        <>
          {isActive && (
            <motion.span
              layoutId="auracap-tab-pill"
              className="floating-tab-indicator"
              transition={{ type: 'spring', stiffness: 420, damping: 34 }}
            />
          )}
          <Icon size={20} strokeWidth={isActive ? 2.25 : 1.75} className="floating-tab-icon" />
          <span className="floating-tab-label">{label}</span>
        </>
      )}
    </NavLink>
  );
}

export function MobileTabBar() {
  const location = useLocation();
  if (location.pathname === '/') return null;

  return (
    <div className="floating-tab-shell md:hidden">
      <nav className="floating-tab-bar" aria-label="Main">
        {TABS.map((tab) => (
          <MobileTab key={tab.to} {...tab} />
        ))}
      </nav>
    </div>
  );
}
