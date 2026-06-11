import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Topbar } from './Topbar';
import { DemoBanner } from './DemoBanner';
import { CommandPalette } from '@/components/ui/CommandPalette';
import { ToastContainer } from '@/components/ui/Toast';

export function AppShell() {
  const [expanded, setExpanded] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-dvh relative">
      <div className="ambient" />
      <Sidebar
        expanded={expanded}
        mobileOpen={mobileOpen}
        onToggle={() => setExpanded((e) => !e)}
        onMobileClose={() => setMobileOpen(false)}
      />
      <div className={`main-content transition-all duration-300 ${expanded ? 'ml-[234px]' : 'ml-[70px] max-md:ml-0'}`}>
        <Topbar onMenuToggle={() => setMobileOpen((o) => !o)} menuOpen={mobileOpen} />
        <div className="px-4 md:px-7 pb-20 pt-7">
          <DemoBanner />
          <Outlet />
        </div>
      </div>
      <CommandPalette />
      <ToastContainer />
    </div>
  );
}
