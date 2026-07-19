import { Suspense, lazy, useEffect } from 'react';
import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { AppProvider, useApp } from '@/context/AppContext';
import { AppShell } from '@/components/layout/AppShell';
import { WelcomeScreen } from '@/components/layout/WelcomeScreen';
import { Dashboard } from '@/pages/Dashboard';

// Route-level code splitting — Dashboard stays eager (default route);
// the other 15 pages load on navigation.
const DigitalDna = lazy(() => import('@/pages/DigitalDna').then((m) => ({ default: m.DigitalDna })));
const ImportApps = lazy(() => import('@/pages/ImportApps').then((m) => ({ default: m.ImportApps })));
const AppLibrary = lazy(() => import('@/pages/AppLibrary').then((m) => ({ default: m.AppLibrary })));
const SmartOrganizer = lazy(() => import('@/pages/SmartOrganizer').then((m) => ({ default: m.SmartOrganizer })));
const AiDesigner = lazy(() => import('@/pages/AiDesigner').then((m) => ({ default: m.AiDesigner })));
const Wallpapers = lazy(() => import('@/pages/Wallpapers').then((m) => ({ default: m.Wallpapers })));
const Lockscreen = lazy(() => import('@/pages/Lockscreen').then((m) => ({ default: m.Lockscreen })));
const WidgetLab = lazy(() => import('@/pages/WidgetLab').then((m) => ({ default: m.WidgetLab })));
const Shortcuts = lazy(() => import('@/pages/Shortcuts').then((m) => ({ default: m.Shortcuts })));
const DigitalCleanse = lazy(() => import('@/pages/DigitalCleanse').then((m) => ({ default: m.DigitalCleanse })));
const DailyRoutine = lazy(() => import('@/pages/DailyRoutine').then((m) => ({ default: m.DailyRoutine })));
const Profiles = lazy(() => import('@/pages/Profiles').then((m) => ({ default: m.Profiles })));
const Settings = lazy(() => import('@/pages/Settings').then((m) => ({ default: m.Settings })));
const ImportGuide = lazy(() => import('@/pages/ImportGuide').then((m) => ({ default: m.ImportGuide })));

const PAGE_TITLES: Record<string, string> = {
  '/dashboard': 'Dashboard', '/dna': 'Digital DNA', '/import': 'Import Apps',
  '/import-guide': 'Import Guide', '/apps': 'App Library', '/organizer': 'Smart Organizer',
  '/designer': 'Smart Assistant', '/wallpaper': 'Wallpapers', '/lockscreen': 'Lock Screen',
  '/widgets': 'Widget Lab', '/shortcuts': 'Shortcuts', '/cleanse': 'Digital Cleanse',
  '/routine': 'Daily Routine', '/profiles': 'Profiles', '/settings': 'Settings',
};

function TitleSync() {
  const { pathname } = useLocation();
  useEffect(() => {
    const label = PAGE_TITLES[pathname] ?? (pathname.split('/').filter(Boolean).map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(' ') || 'Dashboard');
    document.title = label + ' — AuraCap';
  }, [pathname]);
  return null;
}

function AppRoutes() {
  const { ready, state, loadDemo } = useApp();

  useEffect(() => {
    if (!ready) return;
    if (new URLSearchParams(location.search).get('demo') === '1' && !state.entered) {
      loadDemo();
    }
  }, [ready]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!ready) {
    return <div className="min-h-dvh flex items-center justify-center text-[var(--mu)]">Loading AuraCap…</div>;
  }

  return (
    <>
      <TitleSync />
      <WelcomeScreen />
      {state.entered && (
        <Suspense fallback={<div className="min-h-dvh flex items-center justify-center text-[var(--mu)]">Loading AuraCap…</div>}>
          <Routes>
            <Route element={<AppShell />}>
              <Route index element={<Navigate to="/dashboard" replace />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="dna" element={<DigitalDna />} />
              <Route path="import" element={<ImportApps />} />
              <Route path="import-guide" element={<ImportGuide />} />
              <Route path="apps" element={<AppLibrary />} />
              <Route path="organizer" element={<SmartOrganizer />} />
              <Route path="designer" element={<AiDesigner />} />
              <Route path="wallpaper" element={<Wallpapers />} />
              <Route path="lockscreen" element={<Lockscreen />} />
              <Route path="widgets" element={<WidgetLab />} />
              <Route path="shortcuts" element={<Shortcuts />} />
              <Route path="cleanse" element={<DigitalCleanse />} />
              <Route path="routine" element={<DailyRoutine />} />
              <Route path="profiles" element={<Profiles />} />
              <Route path="history" element={<Navigate to="/profiles?tab=snapshots" replace />} />
              <Route path="settings" element={<Settings />} />
            </Route>
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </Suspense>
      )}
    </>
  );
}

export default function App() {
  const basename = import.meta.env.BASE_URL.replace(/\/$/, '') || undefined;
  return (
    <BrowserRouter basename={basename}>
      <AppProvider>
        <AppRoutes />
      </AppProvider>
    </BrowserRouter>
  );
}
