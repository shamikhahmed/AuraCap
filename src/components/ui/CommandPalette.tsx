import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';
import { APPS } from '@/data';
import { useApp } from '@/context/AppContext';

const NAV_ITEMS = [
  { path: '/dashboard', label: 'Dashboard' },
  { path: '/dna', label: 'Digital DNA' },
  { path: '/import', label: 'Import Apps' },
  { path: '/import-guide', label: 'Import Guide' },
  { path: '/apps', label: 'App Library' },
  { path: '/organizer', label: 'Smart Organizer' },
  { path: '/designer', label: 'AI Designer' },
  { path: '/wallpaper', label: 'Wallpapers' },
  { path: '/lockscreen', label: 'Lockscreen Builder' },
  { path: '/widgets', label: 'Widget Lab' },
  { path: '/shortcuts', label: 'Shortcuts' },
  { path: '/cleanse', label: 'Digital Cleanse' },
  { path: '/routine', label: 'Daily Routine' },
  { path: '/profiles', label: 'Profiles' },
  { path: '/history', label: 'Version History' },
  { path: '/settings', label: 'Settings' },
];

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState('');
  const navigate = useNavigate();
  const { toggleApp } = useApp();

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setOpen((o) => !o);
      }
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  const results = useMemo(() => {
    const query = q.toLowerCase().trim();
    if (!query) return { nav: NAV_ITEMS, apps: [] as typeof APPS };
    return {
      nav: NAV_ITEMS.filter((n) => n.label.toLowerCase().includes(query)),
      apps: APPS.filter((a) => a.n.toLowerCase().includes(query)).slice(0, 12),
    };
  }, [q]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[500] flex items-start justify-center pt-[15vh] bg-black/60 backdrop-blur-sm" onClick={() => setOpen(false)}>
      <div className="w-full max-w-lg bg-[var(--s2)] border border-[var(--bd2)] rounded-2xl shadow-2xl overflow-hidden" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center gap-2 px-4 py-3 border-b border-[var(--bd)]">
          <Search size={16} className="text-[var(--mu)]" />
          <input
            autoFocus
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Jump to section or search apps…"
            className="flex-1 bg-transparent outline-none text-sm"
          />
          <kbd className="text-[10px] text-[var(--mu)] px-1.5 py-0.5 rounded border border-[var(--bd)]">ESC</kbd>
        </div>
        <div className="max-h-80 overflow-y-auto p-2">
          {results.nav.map((item) => (
            <button
              key={item.path}
              type="button"
              className="w-full text-left px-3 py-2 rounded-lg text-sm hover:bg-[var(--cardhov)]"
              onClick={() => { navigate(item.path); setOpen(false); setQ(''); }}
            >
              {item.label}
            </button>
          ))}
          {results.apps.length > 0 && (
            <>
              <div className="text-[10px] text-[var(--mu)] uppercase tracking-wider px-3 py-2 mt-1">Apps</div>
              {results.apps.map((a) => (
                <button
                  key={a.n}
                  type="button"
                  className="w-full text-left px-3 py-2 rounded-lg text-sm hover:bg-[var(--cardhov)]"
                  onClick={() => { toggleApp(a.n); setOpen(false); setQ(''); }}
                >
                  {a.e} {a.n}
                </button>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
