import { useEffect, useRef, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Topbar } from './Topbar';
import { MobileTabBar } from './MobileTabBar';
import { DemoBanner } from './DemoBanner';
import { CommandPalette } from '@/components/ui/CommandPalette';
import { ToastContainer } from '@/components/ui/Toast';
import { AmbientBackground } from '@/components/premium/AmbientBackground';
import { CapRouteTransition } from '@/components/premium/CapRouteTransition';

const CLEANSE_KEY = 'auracap_next_cleanse_date';
const CLEANSE_NOTIF_KEY = 'auracap_cleanse_notif_enabled';

function daysUntil(dateStr: string): number | null {
  if (!dateStr) return null;
  const target = new Date(dateStr + 'T09:00:00');
  return Math.ceil((target.getTime() - Date.now()) / 86400000);
}

export function AppShell() {
  const [expanded, setExpanded] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const cleanseNotifiedRef = useRef(false);

  useEffect(() => {
    const date = localStorage.getItem(CLEANSE_KEY) || '';
    const notif = localStorage.getItem(CLEANSE_NOTIF_KEY) === '1';
    const due = date && (daysUntil(date) ?? 1) <= 0;
    if (!notif || !due || cleanseNotifiedRef.current || !('Notification' in window)) return;
    const fire = () => {
      if (Notification.permission === 'granted') {
        new Notification('AuraCap — Digital Cleanse due', {
          body: 'Time for your scheduled app audit. Open Cleanse to review distractions.',
          tag: 'auracap-cleanse',
        });
        cleanseNotifiedRef.current = true;
      }
    };
    if (Notification.permission === 'granted') fire();
    else if (Notification.permission !== 'denied') {
      Notification.requestPermission().then((p) => { if (p === 'granted') fire(); });
    }
  }, []);

  return (
    <div className="min-h-dvh relative">
      <AmbientBackground />
      <div className="cap-scroll-progress" aria-hidden="true" />
      <Sidebar
        expanded={expanded}
        mobileOpen={mobileOpen}
        onToggle={() => setExpanded((e) => !e)}
        onMobileClose={() => setMobileOpen(false)}
      />
      <div
        className={`main-content transition-all duration-300 ${
          expanded ? 'min-[700px]:ml-[234px]' : 'min-[700px]:ml-[70px]'
        } max-[699px]:ml-0`}
      >
        <Topbar onMenuToggle={() => setMobileOpen((o) => !o)} menuOpen={mobileOpen} />
        <div className="app-scroll-pad px-4 md:px-7 pt-7">
          <DemoBanner />
          <CapRouteTransition>
            <Outlet />
          </CapRouteTransition>
        </div>
      </div>
      <MobileTabBar />
      <CommandPalette />
      <ToastContainer />
    </div>
  );
}
