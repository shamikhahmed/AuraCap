import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { CircleUser, Ellipsis, Grid2x2, Smartphone } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { MobileMenuButton } from './Sidebar';
import { normalizeDeviceName } from '@/lib/deviceName';

const DEVICES = ['iphone', 'ipad', 'mac'] as const;

export function Topbar({ onMenuToggle, menuOpen }: { onMenuToggle: () => void; menuOpen: boolean }) {
  const { state, activeProfile, setDevice, toast } = useApp();
  const [menuOpenLocal, setMenuOpenLocal] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (!menuRef.current?.contains(e.target as Node)) setMenuOpenLocal(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpenLocal(false);
    };
    document.addEventListener('mousedown', onDoc);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDoc);
      document.removeEventListener('keydown', onKey);
    };
  }, []);

  const cycleDevice = () => {
    const idx = DEVICES.indexOf(state.device);
    const next = DEVICES[(idx + 1) % DEVICES.length];
    setDevice(next);
    toast(`Switched to ${normalizeDeviceName(next)}`);
  };

  const deviceLabel = normalizeDeviceName(state.device);
  const modelLabel = normalizeDeviceName(state.model);

  return (
    <header className="sticky top-0 z-50 h-14 glass-topbar border-b border-[var(--bd)] flex items-center justify-between gap-3 px-4 md:px-6">
      <div className="flex items-center gap-2 min-w-0">
        <MobileMenuButton onClick={onMenuToggle} open={menuOpen} />
        <button type="button" onClick={cycleDevice} className="pill shrink-0" aria-label={`Device: ${deviceLabel}. Tap to switch.`}>
          <Smartphone size={12} />
          <span>{deviceLabel}</span>
        </button>
        <span className="text-sm text-[var(--mu)] truncate hidden sm:inline" title={modelLabel}>
          {modelLabel}
        </span>
      </div>

      <div className="relative shrink-0" ref={menuRef}>
        <button
          type="button"
          className="pill"
          aria-haspopup="menu"
          aria-expanded={menuOpenLocal}
          aria-label="More"
          onClick={() => setMenuOpenLocal((o) => !o)}
        >
          <Ellipsis size={16} />
        </button>
        {menuOpenLocal && (
          <div
            role="menu"
            className="absolute right-0 top-[calc(100%+6px)] min-w-[200px] rounded-[14px] border border-[var(--bd)] bg-[var(--s1)] shadow-[var(--shadow)] p-1.5 z-[60]"
          >
            <Link
              role="menuitem"
              to="/dna"
              className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm hover:bg-[var(--cardhov)]"
              onClick={() => setMenuOpenLocal(false)}
            >
              Setup report
            </Link>
            <Link
              role="menuitem"
              to="/apps"
              className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm hover:bg-[var(--cardhov)]"
              onClick={() => setMenuOpenLocal(false)}
            >
              <Grid2x2 size={14} /> {state.apps.length} apps
            </Link>
            <Link
              role="menuitem"
              to="/profiles"
              className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm hover:bg-[var(--cardhov)]"
              onClick={() => setMenuOpenLocal(false)}
            >
              <CircleUser size={14} /> {activeProfile.name}
            </Link>
            <Link
              role="menuitem"
              to="/settings"
              className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm hover:bg-[var(--cardhov)]"
              onClick={() => setMenuOpenLocal(false)}
            >
              Settings
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
