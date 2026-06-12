import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { WPS } from '@/data';
import { useApp } from '@/context/AppContext';
import { GlassCard } from '@/components/ui/GlassCard';
import { exportWallpaperPng } from '@/lib/pngExport';
import type { Wallpaper } from '@/types';

const WP_CATS = ['all', 'oled', 'cyber', 'minimal', 'luxury', 'nature', 'soft', 'retro', 'islamic', 'crypto', 'photo'] as const;

export function Wallpapers() {
  const { toast } = useApp();
  const navigate = useNavigate();
  const [cat, setCat] = useState<string>('all');
  const [selected, setSelected] = useState<Wallpaper>(WPS[0]);

  const filtered = cat === 'all' ? WPS : WPS.filter((w) => w.c === cat);

  return (
    <div>
      <div className="mb-6"><h1 className="page-title">Wallpaper Engine</h1><p className="page-sub">42+ OLED-optimized wallpapers across 11 themes</p></div>

      <div className="flex gap-1 flex-wrap mb-4">
        {WP_CATS.map((c) => (
          <button key={c} type="button" onClick={() => setCat(c)} className={`wp-tab ${cat === c ? 'active' : ''}`}>{c === 'all' ? 'All' : c.charAt(0).toUpperCase() + c.slice(1)}</button>
        ))}
      </div>

      <div className="wallpaper-grid mb-3.5">
        {filtered.map((wp) => (
          <button key={wp.n} type="button" onClick={() => setSelected(wp)} className={`wallpaper-tile ${selected.n === wp.n ? 'active' : ''}`} style={{ background: wp.bg }}>
            <span className="text-3xl flex items-center justify-center h-full">{wp.e}</span>
            <span className="wallpaper-label">{wp.n}</span>
          </button>
        ))}
      </div>

      <GlassCard className="flex items-center gap-4">
        <div className="w-[60px] h-[120px] rounded-[14px] border border-[var(--bd)] shrink-0" style={{ background: selected.bg }} />
        <div className="flex-1">
          <p className="section-label mb-1">SELECTED</p>
          <p className="text-base font-bold font-display">{selected.n}</p>
          <p className="text-[11px] text-[var(--mu)]">{selected.t}</p>
          <div className="flex gap-2 mt-2.5 flex-wrap">
            <button type="button" onClick={() => toast('Wallpaper set! ✨')} className="btn-primary btn-sm">Apply</button>
            <button type="button" onClick={() => toast('Saved ♥')} className="btn-ghost btn-sm"><Heart size={12} /> Save</button>
            <button type="button" onClick={() => { navigate('/lockscreen'); toast('Set as lockscreen background'); }} className="btn-ghost btn-sm">Lockscreen</button>
            <button
              type="button"
              onClick={async () => {
                try {
                  await exportWallpaperPng(selected.bg, selected.e, selected.n);
                  toast('Wallpaper PNG downloaded!');
                } catch {
                  toast('Export failed — try again');
                }
              }}
              className="btn-ghost btn-sm"
            >
              Download PNG
            </button>
          </div>
        </div>
      </GlassCard>
    </div>
  );
}
