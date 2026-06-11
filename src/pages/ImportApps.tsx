import { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Bolt, Copy, Download, Trash2, BookOpen } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { GlassCard } from '@/components/ui/GlassCard';
import { AppChip } from '@/components/ui/AppChip';
import { Modal } from '@/components/ui/Modal';
import { ImportGuideContent } from '@/components/import/ImportGuideContent';
import { SAMPLE_LIST } from '@/data';
import type { DeviceType } from '@/types';

export function ImportApps() {
  const { state, importApps, removeApp, clearApps, exportTxtFile, toast } = useApp();
  const [tab, setTab] = useState<'import' | 'guide'>('import');
  const [device, setDevice] = useState<DeviceType>('iphone');
  const [text, setText] = useState({ iphone: '', ipad: '', mac: '' });
  const [result, setResult] = useState<{ added: number; existed: number; source: string } | null>(null);
  const [modal, setModal] = useState(false);
  const [confirmClear, setConfirmClear] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const handleImport = (dev: DeviceType) => {
    const raw = text[dev];
    if (!raw.trim()) { toast('Paste your app list first'); return; }
    const r = importApps(raw);
    const source = dev === 'iphone' ? 'iPhone' : dev === 'ipad' ? 'iPad' : 'Mac';
    setResult({ ...r, source });
    toast(`Imported ${r.added} apps from ${source}!`);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const content = String(reader.result ?? '');
      setText((t) => ({ ...t, [device]: content }));
      toast('File loaded — click Import & Analyze');
    };
    reader.readAsText(file);
  };

  const loadSample = () => {
    setText((t) => ({ ...t, iphone: SAMPLE_LIST }));
    toast('Sample list loaded');
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-5">
        <div>
          <h1 className="page-title">Import Your Apps</h1>
          <p className="page-sub">Device-specific import — iPhone, iPad & Mac each handled differently</p>
        </div>
        <Link to="/import-guide" className="btn-ghost btn-sm shrink-0 self-start">
          <BookOpen size={14} /> Full Import Guide
        </Link>
      </div>

      <div className="flex gap-2 mb-4">
        <button type="button" onClick={() => setTab('import')} className={`device-tab ${tab === 'import' ? 'active' : ''}`}>Import</button>
        <button type="button" onClick={() => setTab('guide')} className={`device-tab ${tab === 'guide' ? 'active' : ''}`}>
          <BookOpen size={12} className="inline mr-1" /> How to Import
        </button>
      </div>

      {tab === 'guide' ? (
        <ImportGuideContent showCta={false} compact />
      ) : (
        <>
          <div className="flex gap-2 mb-4">
            {(['iphone', 'ipad', 'mac'] as const).map((d) => (
              <button key={d} type="button" onClick={() => setDevice(d)} className={`device-tab ${device === d ? 'active' : ''}`}>
                {d === 'iphone' ? '📱 iPhone' : d === 'ipad' ? '📱 iPad' : ' Mac'}
              </button>
            ))}
          </div>

          <GlassCard className="mb-3 border-[rgba(79,110,247,0.28)]">
            <div className="flex items-center gap-3">
              <span className="text-2xl">⚡</span>
              <div className="flex-1">
                <p className="font-bold text-sm">One-Click Import Shortcut</p>
                <p className="text-[11px] text-[var(--mu)]">Copies ALL installed app names to clipboard in one tap</p>
              </div>
              <button type="button" onClick={() => setModal(true)} className="btn-primary btn-sm"><Bolt size={14} /> Get Shortcut</button>
            </div>
          </GlassCard>

          {device === 'iphone' && (
            <GlassCard className="mb-3">
              <p className="text-xs font-bold mb-2">📱 iPhone — Quick Steps</p>
              <p className="text-[11px] text-[var(--mu)] leading-relaxed mb-2">
                Shortcuts → Get All Apps → Get Name → Combine (New Lines) → Copy → Paste below.
              </p>
              <button type="button" onClick={() => setTab('guide')} className="text-[11px] text-[var(--ac)] font-semibold hover:underline">
                See full step-by-step guide →
              </button>
            </GlassCard>
          )}

          {device === 'ipad' && (
            <GlassCard className="mb-3">
              <p className="text-xs font-bold mb-2">📱 iPad — Quick Steps</p>
              <p className="text-[11px] text-[var(--mu)] leading-relaxed">
                Same Shortcuts method as iPhone. Also check App Library and Stage Manager Recent apps.
              </p>
            </GlassCard>
          )}

          <GlassCard className="mb-3">
            <div
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleDrop}
              className="border-2 border-dashed border-[var(--bd2)] rounded-xl p-1"
            >
              <textarea
                value={text[device]}
                onChange={(e) => setText((t) => ({ ...t, [device]: e.target.value }))}
                placeholder={device === 'mac' ? 'Safari\nXcode\nVS Code\nFigma\n...' : 'Instagram\nTikTok\nWhatsApp\nBinance\n...'}
                className="textarea-field min-h-[120px] border-0"
              />
            </div>
            <p className="text-[10px] text-[var(--mu)] mt-2">Paste or drop a .txt file</p>
            <div className="flex gap-2 mt-2.5 flex-wrap">
              <button type="button" onClick={() => handleImport(device)} className="btn-primary flex-1">Import & Analyze</button>
              {device === 'iphone' && <button type="button" onClick={loadSample} className="btn-ghost btn-sm">Load Sample</button>}
              <button type="button" onClick={() => fileRef.current?.click()} className="btn-ghost btn-sm">Choose File</button>
              <button type="button" onClick={() => setText((t) => ({ ...t, [device]: '' }))} className="btn-ghost btn-sm">Clear</button>
              <input ref={fileRef} type="file" accept=".txt" className="hidden" onChange={(e) => {
                const f = e.target.files?.[0];
                if (!f) return;
                const r = new FileReader();
                r.onload = () => setText((t) => ({ ...t, [device]: String(r.result ?? '') }));
                r.readAsText(f);
              }} />
            </div>
            {device === 'mac' && (
              <div className="mt-3 space-y-2">
                <div className="p-2.5 rounded-lg bg-[var(--s1)] border border-[var(--bd2)] flex items-center gap-2 flex-wrap">
                  <code className="text-[11px] text-[var(--ac3)] font-mono flex-1">ls /Applications | sed 's/.app//'</code>
                  <button type="button" onClick={() => { navigator.clipboard?.writeText("ls /Applications | sed 's/.app//'"); toast('Command copied!'); }} className="btn-ghost btn-sm"><Copy size={12} /></button>
                </div>
                <div className="p-2.5 rounded-lg bg-[var(--s1)] border border-[var(--bd2)] flex items-center gap-2 flex-wrap">
                  <code className="text-[11px] text-[var(--ac3)] font-mono flex-1">ls ~/Applications | sed 's/.app//'</code>
                  <button type="button" onClick={() => { navigator.clipboard?.writeText("ls ~/Applications | sed 's/.app//'"); toast('Command copied!'); }} className="btn-ghost btn-sm"><Copy size={12} /></button>
                </div>
              </div>
            )}
          </GlassCard>

          {result && (
            <GlassCard className="mb-3">
              <div className="grid grid-cols-3 gap-2 mb-3">
                {[{ v: result.added, l: 'Added', c: 'var(--ac3)' }, { v: result.existed, l: 'Already in', c: 'var(--mu)' }, { v: state.apps.length, l: 'Total', c: 'var(--ac)' }].map((x) => (
                  <div key={x.l} className="stat-row text-center flex-col !items-center">
                    <div className="text-2xl font-extrabold font-display" style={{ color: x.c }}>{x.v}</div>
                    <div className="text-[11px] text-[var(--mu)]">{x.l}</div>
                  </div>
                ))}
              </div>
              <p className="text-xs text-[var(--ac3)] mb-2">Imported from {result.source}</p>
              <div className="flex gap-2">
                <button type="button" onClick={() => navigate('/dna')} className="btn-primary btn-sm">Analyze DNA</button>
                <button type="button" onClick={() => navigate('/organizer')} className="btn-ghost btn-sm">Build Folders</button>
              </div>
            </GlassCard>
          )}

          <GlassCard>
            <div className="flex items-center justify-between mb-2">
              <p className="section-label">IMPORTED APPS <span className="text-[var(--ac)]">({state.apps.length})</span></p>
              <div className="flex gap-1">
                <button type="button" onClick={exportTxtFile} className="btn-ghost btn-sm"><Download size={12} /> Export</button>
                <button type="button" onClick={() => setConfirmClear(true)} className="btn-danger btn-sm"><Trash2 size={12} /> Clear</button>
              </div>
            </div>
            <div className="flex flex-wrap gap-0.5 max-h-[180px] overflow-y-auto">
              {state.apps.length ? state.apps.map((nm) => <AppChip key={nm} label={nm} active onRemove={() => removeApp(nm)} />) : <span className="text-xs text-[var(--mu)]">No apps imported yet.</span>}
            </div>
          </GlassCard>

          <Modal open={modal} onClose={() => setModal(false)} title="One-Click Import Shortcut">
            <p className="text-xs text-[var(--mu)] mb-3">Copies all your installed app names to clipboard. Works on iPhone and iPad.</p>
            <div className="bg-[var(--s1)] border border-[var(--bd2)] rounded-xl p-3 mb-3 font-mono text-[11px] text-[var(--ac3)] leading-relaxed">
              1. Get All Apps<br />2. Get Details of Apps → Detail: Name<br />3. Combine Text → Separator: New Line<br />4. Copy to Clipboard
            </div>
            <button type="button" onClick={() => { setModal(false); toast('Paste your list in the box below!'); }} className="btn-primary w-full">Go to Import Tab</button>
          </Modal>

          <Modal open={confirmClear} onClose={() => setConfirmClear(false)} title="Clear all apps?">
            <p className="text-sm text-[var(--mu)] mb-4">This removes all imported apps from your library.</p>
            <div className="flex gap-2">
              <button type="button" onClick={() => { clearApps(); setConfirmClear(false); toast('All apps cleared'); }} className="btn-danger flex-1">Clear all</button>
              <button type="button" onClick={() => setConfirmClear(false)} className="btn-ghost flex-1">Cancel</button>
            </div>
          </Modal>
        </>
      )}
    </div>
  );
}
