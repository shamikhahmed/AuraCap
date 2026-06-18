import { Suspense, lazy } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
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

function AppRoutes() {
  const { ready, state } = useApp();
  if (!ready) {
    return <div className="min-h-dvh flex items-center justify-center text-[var(--mu)]">Loading AuraCap…</div>;
  }

  return (
    <>
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
