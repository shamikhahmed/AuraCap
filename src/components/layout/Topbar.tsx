import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { SunMoon, CircleUser, Grid2x2, Smartphone } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { MobileMenuButton } from './Sidebar';

const DEVICES = ['iphone', 'ipad', 'mac'] as const;

export function Topbar({ onMenuToggle, menuOpen }: { onMenuToggle: () => void; menuOpen: boolean }) {
  const { state, activeProfile, setDevice, setTheme, toast } = useApp();
  const [time, setTime] = useState('--:--:--');

  useEffect(() => {
    const tick = () => {
      const n = new Date();
      setTime([n.getHours(), n.getMinutes(), n.getSeconds()].map((v) => String(v).padStart(2, '0')).join(':'));
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const cycleDevice = () => {
    const idx = DEVICES.indexOf(state.device);
    const next = DEVICES[(idx + 1) % DEVICES.length];
    setDevice(next);
    toast(`Switched to ${next.charAt(0).toUpperCase() + next.slice(1)}`);
  };

  return (
    <header className="sticky top-0 z-50 h-14 glass-topbar border-b border-[var(--bd)] flex items-center justify-between px-4 md:px-6">
      <div className="flex items-center gap-2">
        <MobileMenuButton onClick={onMenuToggle} open={menuOpen} />
        <span className="font-mono text-[11px] text-[var(--mu)] hidden sm:inline">{time}</span>
        <button type="button" onClick={cycleDevice} className="pill">
          <Smartphone size={10} />
          <span className="capitalize">{state.device}</span>
        </button>
        <Link to="/designer" className="pill text-[var(--ac)] hidden sm:inline-flex">
          {state.model.replace('iphone', 'iPhone ').replace('ipad', 'iPad ').replace('mbp', 'MacBook Pro ')}
        </Link>
      </div>
      <div className="flex items-center gap-1.5 flex-wrap justify-end">
        <Link to="/dna" className="pill hidden sm:inline-flex">
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--ac3)]" />
          {state.apps.length ? 'View DNA' : 'Scan DNA'}
        </Link>
        <Link to="/apps" className="pill hidden sm:inline-flex"><Grid2x2 size={9} />{state.apps.length} apps</Link>
        <Link to="/profiles" className="pill"><CircleUser size={10} />{activeProfile.name}</Link>
        <button type="button" onClick={() => setTheme(state.theme === 'dark' ? 'light' : 'dark')} className="pill">
          <SunMoon size={10} />{state.theme === 'dark' ? 'Dark' : 'Light'}
        </button>
      </div>
    </header>
  );
}
