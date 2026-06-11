import { useState } from 'react';
import { Bookmark } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { GlassCard } from '@/components/ui/GlassCard';
import { Modal } from '@/components/ui/Modal';

export function VersionHistory() {
  const { state, saveVersion, restoreVersion, deleteVersion } = useApp();
  const [saveModal, setSaveModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState<string | null>(null);
  const [name, setName] = useState('');

  return (
    <div>
      <div className="flex items-start justify-between mb-6">
        <div><h1 className="page-title">Version History</h1><p className="page-sub">Save & restore different homescreen setups</p></div>
        <button type="button" onClick={() => { setName(`Layout ${new Date().toLocaleDateString()}`); setSaveModal(true); }} className="btn-primary btn-sm"><Bookmark size={14} /> Save Current</button>
      </div>

      <div className="flex flex-col gap-2 mb-4">
        {state.versions.length ? state.versions.map((v) => (
          <div key={v.id} className="version-item">
            <div className="w-2 h-2 rounded-full shrink-0" style={{ background: v.color }} />
            <div className="flex-1">
              <p className="text-xs font-semibold">{v.name}</p>
              <p className="text-[10px] text-[var(--mu)]">{v.date} · {v.appCount} apps · {v.device}</p>
            </div>
            <button type="button" onClick={() => restoreVersion(v.id)} className="btn-ghost btn-sm">Restore</button>
            <button type="button" onClick={() => setDeleteModal(v.id)} className="btn-danger btn-sm">Delete</button>
          </div>
        )) : <p className="text-sm text-[var(--mu)]">No saved versions yet. Build a layout and click Save Version.</p>}
      </div>

      <GlassCard>
        <p className="section-label mb-2">ABOUT VERSION HISTORY</p>
        <p className="text-xs text-[var(--mu)] leading-relaxed">Save any layout state as a named snapshot. Switch between "Minimal 2025", "Crypto Trader Mode", "Deen Setup" etc. instantly. All versions stored locally on your device.</p>
      </GlassCard>

      <Modal open={saveModal} onClose={() => setSaveModal(false)} title="Save version">
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Version name" className="input-field mb-4" />
        <button type="button" onClick={() => { if (name.trim()) { saveVersion(name.trim()); setSaveModal(false); } }} className="btn-primary w-full">Save</button>
      </Modal>

      <Modal open={!!deleteModal} onClose={() => setDeleteModal(null)} title="Delete version?">
        <p className="text-sm text-[var(--mu)] mb-4">This snapshot will be permanently removed.</p>
        <div className="flex gap-2">
          <button type="button" onClick={() => { if (deleteModal) { deleteVersion(deleteModal); setDeleteModal(null); } }} className="btn-danger flex-1">Delete</button>
          <button type="button" onClick={() => setDeleteModal(null)} className="btn-ghost flex-1">Cancel</button>
        </div>
      </Modal>
    </div>
  );
}
