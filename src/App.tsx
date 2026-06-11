import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { AppProvider, useApp } from '@/context/AppContext';
import { AppShell } from '@/components/layout/AppShell';
import { WelcomeScreen } from '@/components/layout/WelcomeScreen';
import { Dashboard } from '@/pages/Dashboard';
import { DigitalDna } from '@/pages/DigitalDna';
import { ImportApps } from '@/pages/ImportApps';
import { AppLibrary } from '@/pages/AppLibrary';
import { SmartOrganizer } from '@/pages/SmartOrganizer';
import { AiDesigner } from '@/pages/AiDesigner';
import { Wallpapers } from '@/pages/Wallpapers';
import { Lockscreen } from '@/pages/Lockscreen';
import { WidgetLab } from '@/pages/WidgetLab';
import { Shortcuts } from '@/pages/Shortcuts';
import { DigitalCleanse } from '@/pages/DigitalCleanse';
import { DailyRoutine } from '@/pages/DailyRoutine';
import { Profiles } from '@/pages/Profiles';
import { VersionHistory } from '@/pages/VersionHistory';
import { Settings } from '@/pages/Settings';

function AppRoutes() {
  const { ready, state } = useApp();
  if (!ready) {
    return <div className="min-h-dvh flex items-center justify-center text-[var(--mu)]">Loading AuraOS…</div>;
  }

  return (
    <>
      <WelcomeScreen />
      {state.entered && (
        <Routes>
          <Route element={<AppShell />}>
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="dna" element={<DigitalDna />} />
            <Route path="import" element={<ImportApps />} />
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
            <Route path="history" element={<VersionHistory />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        </Routes>
      )}
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter basename="/AuraOS">
      <AppProvider>
        <AppRoutes />
      </AppProvider>
    </BrowserRouter>
  );
}
