import { NavLink } from 'react-router-dom';
import {
  Gauge, Dna, FileInput, LayoutGrid, Layers, Wand2, Image, Lock,
  Grid3x3, Zap, Brush, Moon, Users, Settings, Menu, X,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useApp } from '@/context/AppContext';

const NAV = [
  { to: '/dashboard', icon: Gauge, label: 'Overview' },
  { to: '/dna', icon: Dna, label: 'Setup report', badge: true },
  { to: '/import', icon: FileInput, label: 'Import Apps' },
  { to: '/apps', icon: LayoutGrid, label: 'App Library' },
  { to: '/organizer', icon: Layers, label: 'Smart Organizer' },
  { to: '/designer', icon: Wand2, label: 'Smart Assistant' },
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
      {mobileOpen && <div className="fixed inset-0 bg-black/50 z-[90] min-[700px]:hidden" onClick={onMobileClose} />}
      <nav
        className={cn(
          'fixed top-0 left-0 bottom-0 z-[100] flex-col items-center py-4 gap-0.5 glass-sidebar transition-all duration-300',
          expanded ? 'w-[234px]' : 'w-[70px]',
          // AUR-P0-01: hide desktop rail below 700px
          'hidden min-[700px]:flex',
          mobileOpen && '!flex !w-[234px]',
        )}
        aria-label="Primary"
      >
        <button type="button" onClick={onToggle} className="logo-btn mb-1" aria-label="Toggle sidebar">C</button>
        <div className="nav-divider" />
        <NavLink to="/profiles" onClick={onMobileClose} className={cn('profile-btn', expanded && 'expanded')}>
          <span aria-hidden>{activeProfile.emoji}</span>
          {(expanded || mobileOpen) && <span className="text-xs font-semibold truncate">{activeProfile.name}</span>}
        </NavLink>
        <div className="nav-divider" />
        {NAV.map(({ to, icon: Icon, label, badge }) => (
          <NavLink
            key={to}
            to={to}
            onClick={onMobileClose}
            className={({ isActive }) => cn('nav-item', (expanded || mobileOpen) && 'expanded', isActive && 'active')}
            title={label}
          >
            <Icon size={14} className="shrink-0" />
            {(expanded || mobileOpen) && <span className="nav-label">{label}</span>}
            {!expanded && !mobileOpen && <span className="nav-tooltip">{label}</span>}
            {badge && <span className="nav-badge" />}
          </NavLink>
        ))}
      </nav>
    </>
  );
}

export function MobileMenuButton({ onClick, open }: { onClick: () => void; open: boolean }) {
  return (
    <button type="button" onClick={onClick} className="min-[700px]:hidden text-[var(--mu)] p-2" aria-label={open ? 'Close menu' : 'Open menu'}>
      {open ? <X size={18} /> : <Menu size={18} />}
    </button>
  );
}
