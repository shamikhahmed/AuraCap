import { NavLink } from 'react-router-dom';
import {
  Gauge, Dna, FileInput, LayoutGrid, Layers, Wand2, Image, Lock,
  Grid3x3, Zap, Brush, Moon, Users, Settings, Menu, X,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useApp } from '@/context/AppContext';

const NAV = [
  { to: '/dashboard', icon: Gauge, label: 'Dashboard' },
  { to: '/dna', icon: Dna, label: 'Digital DNA', badge: true },
  { to: '/import', icon: FileInput, label: 'Import Apps' },
  { to: '/apps', icon: LayoutGrid, label: 'App Library' },
  { to: '/organizer', icon: Layers, label: 'Smart Organizer' },
  { to: '/designer', icon: Wand2, label: 'AI Designer' },
  { to: '/wallpaper', icon: Image, label: 'Wallpapers' },
  { to: '/lockscreen', icon: Lock, label: 'Lockscreen' },
  { to: '/widgets', icon: Grid3x3, label: 'Widget Lab' },
  { to: '/shortcuts', icon: Zap, label: 'Shortcuts' },
  { to: '/cleanse', icon: Brush, label: 'Cleanse' },
  { to: '/routine', icon: Moon, label: 'Daily Routine' },
  { to: '/profiles', icon: Users, label: 'Profiles & Snapshots' },
  { to: '/settings', icon: Settings, label: 'Settings' },
];

interface SidebarProps {
  expanded: boolean;
  mobileOpen: boolean;
  onToggle: () => void;
  onMobileClose: () => void;
}

export function Sidebar({ expanded, mobileOpen, onToggle, onMobileClose }: SidebarProps) {
  const { activeProfile } = useApp();

  return (
    <>
      {mobileOpen && <div className="fixed inset-0 bg-black/50 z-[90] md:hidden" onClick={onMobileClose} />}
      <nav
        className={cn(
          'fixed top-0 left-0 bottom-0 z-[100] flex flex-col items-center py-4 gap-0.5 glass-sidebar transition-all duration-300',
          expanded ? 'w-[234px]' : 'w-[70px]',
          'max-md:w-0 max-md:-translate-x-full',
          mobileOpen && 'max-md:!w-[234px] max-md:!translate-x-0',
        )}
      >
        <button type="button" onClick={onToggle} className="logo-btn mb-1">C</button>
        <div className="nav-divider" />
        <NavLink to="/profiles" onClick={onMobileClose} className={cn('profile-btn', expanded && 'expanded')}>
          <span>{activeProfile.emoji}</span>
          {expanded && <span className="text-xs font-semibold truncate">{activeProfile.name}</span>}
        </NavLink>
        <div className="nav-divider" />
        {NAV.map(({ to, icon: Icon, label, badge }) => (
          <NavLink
            key={to}
            to={to}
            onClick={onMobileClose}
            className={({ isActive }) => cn('nav-item', expanded && 'expanded', isActive && 'active')}
            title={label}
          >
            <Icon size={14} className="shrink-0" />
            {expanded && <span className="nav-label">{label}</span>}
            {!expanded && <span className="nav-tooltip">{label}</span>}
            {badge && <span className="nav-badge" />}
          </NavLink>
        ))}
      </nav>
    </>
  );
}

export function MobileMenuButton({ onClick, open }: { onClick: () => void; open: boolean }) {
  return (
    <button type="button" onClick={onClick} className="md:hidden text-[var(--mu)] p-1">
      {open ? <X size={18} /> : <Menu size={18} />}
    </button>
  );
}
