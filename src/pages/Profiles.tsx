import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Plus, Bookmark } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { GlassCard } from '@/components/ui/GlassCard';
import { Modal } from '@/components/ui/Modal';
import { EmptyState } from '@/components/ui/EmptyState';

type ProfilesTab = 'profiles' | 'snapshots';

export function Profiles() {
  const [params, setParams] = useSearchParams();
  const tab: ProfilesTab = params.get('tab') === 'snapshots' ? 'snapshots' : 'profiles';
  const { state, activeProfile, switchProfile, createProfile, editProfile, saveVersion, restoreVersion, deleteVersion } = useApp();
  const [createModal, setCreateModal] = useState(false);
  const [editModal, setEditModal] = useState<string | null>(null);
  const [saveModal, setSaveModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState<string | null>(null);
  const [name, setName] = useState('');

  const setTab = (next: ProfilesTab) => {
    setParams(next === 'snapshots' ? { tab: 'snapshots' } : {});
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
        <div>
          <h1 className="page-title">{tab === 'snapshots' ? 'Layout Snapshots' : 'Multi-Profile System'}</h1>
          <p className="page-sub">
            {tab === 'snapshots'
              ? 'Save & restore different homescreen setups'
              : 'Separate app lists, layouts, wallpapers & scores per profile'}
          </p>
        </div>
        {tab === 'profiles' ? (
          <button type="button" onClick={() => setCreateModal(true)} className="btn-primary btn-sm shrink-0 self-start">
            <Plus size={14} /> New Profile
          </button>
        ) : (
          <button
            type="button"
            onClick={() => { setName(`Layout ${new Date().toLocaleDateString()}`); setSaveModal(true); }}
            className="btn-primary btn-sm shrink-0 self-start"
          >
            <Bookmark size={14} /> Save Current
          </button>
        )}
      </div>

      <div className="flex gap-2 mb-5">
        <button type="button" onClick={() => setTab('profiles')} className={`device-tab ${tab === 'profiles' ? 'active' : ''}`}>Profiles</button>
        <button type="button" onClick={() => setTab('snapshots')} className={`device-tab ${tab === 'snapshots' ? 'active' : ''}`}>Snapshots</button>
      </div>

      {tab === 'profiles' ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 mb-4">
            {state.profiles.map((pf) => {
              const isActive = pf.id === state.activeProfile;
              return (
                <div key={pf.id} className={`profile-card ${isActive ? 'active' : ''}`}>
                  {isActive && <span className="profile-badge">ACTIVE</span>}
                  <div className="flex items-center gap-2.5 mb-2">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center text-lg border" style={{ background: `${pf.color}22`, borderColor: `${pf.color}44` }}>{pf.emoji}</div>
                    <div><p className="text-sm font-bold">{pf.name}</p><p className="text-[11px] text-[var(--mu)]">{pf.desc}</p></div>
                  </div>
                  <div className="flex gap-1">
                    <button type="button" onClick={() => switchProfile(pf.id)} className="btn-primary btn-sm flex-1" disabled={isActive}>{isActive ? 'Active' : 'Switch'}</button>
                    {!isActive && <button type="button" onClick={() => { setEditModal(pf.id); setName(pf.name); }} className="btn-ghost btn-sm">Edit</button>}
                  </div>
                </div>
              );
            })}
          </div>

          <GlassCard>
            <p className="section-label mb-3">ACTIVE PROFILE DETAILS</p>
            {[
              { l: 'Profile Name', v: activeProfile.name, c: 'var(--ac)' },
              { l: 'Apps', v: activeProfile.apps.length || state.apps.length, c: 'var(--ac3)' },
              { l: 'Device', v: `${activeProfile.device} · ${activeProfile.model}`, c: 'var(--mu)' },
              { l: 'Aesthetic', v: activeProfile.aesthetic, c: 'var(--mu)' },
            ].map((row) => (
              <div key={row.l} className="stat-row"><span className="text-xs">{row.l}</span><span className="font-mono text-sm font-bold" style={{ color: row.c }}>{row.v}</span></div>
            ))}
          </GlassCard>
        </>
      ) : (
        <>
          {state.versions.length ? (
            <div className="flex flex-col gap-2 mb-4">
              {state.versions.map((v) => (
                <div key={v.id} className="version-item">
                  <div className="w-2 h-2 rounded-full shrink-0" style={{ background: v.color }} />
                  <div className="flex-1">
                    <p className="text-xs font-semibold">{v.name}</p>
                    <p className="text-[10px] text-[var(--mu)]">{v.date} · {v.appCount} apps · {v.device}</p>
                  </div>
                  <button type="button" onClick={() => restoreVersion(v.id)} className="btn-ghost btn-sm">Restore</button>
                  <button type="button" onClick={() => setDeleteModal(v.id)} className="btn-danger btn-sm">Delete</button>
                </div>
              ))}
            </div>
          ) : (
            <EmptyState
              emoji="📸"
              title="No snapshots yet"
              description="Build a layout on Dashboard, then save a named snapshot to switch between setups instantly."
              ctaLabel="Go to Dashboard"
              ctaTo="/dashboard"
            />
          )}

          <GlassCard>
            <p className="section-label mb-2">ABOUT SNAPSHOTS</p>
            <p className="text-xs text-[var(--mu)] leading-relaxed">Save device, layout, and aesthetic settings as named snapshots. Switch between “Minimal”, “Trader Mode”, or “Deen Setup” in one tap. Stored locally on your device.</p>
          </GlassCard>
        </>
      )}

      <Modal open={createModal} onClose={() => setCreateModal(false)} title="New profile">
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Profile name (e.g. Gaming, Travel)" className="input-field mb-4" />
        <button type="button" onClick={() => { if (name.trim()) { createProfile(name.trim()); setCreateModal(false); setName(''); } }} className="btn-primary w-full">Create</button>
      </Modal>

      <Modal open={!!editModal} onClose={() => setEditModal(null)} title="Edit profile">
        <input value={name} onChange={(e) => setName(e.target.value)} className="input-field mb-4" />
        <button type="button" onClick={() => { if (editModal && name.trim()) { editProfile(editModal, name.trim()); setEditModal(null); } }} className="btn-primary w-full">Save</button>
      </Modal>

      <Modal open={saveModal} onClose={() => setSaveModal(false)} title="Save snapshot">
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Snapshot name" className="input-field mb-4" />
        <button type="button" onClick={() => { if (name.trim()) { saveVersion(name.trim()); setSaveModal(false); } }} className="btn-primary w-full">Save</button>
      </Modal>

      <Modal open={!!deleteModal} onClose={() => setDeleteModal(null)} title="Delete snapshot?">
        <p className="text-sm text-[var(--mu)] mb-4">This snapshot will be permanently removed.</p>
        <div className="flex gap-2">
          <button type="button" onClick={() => { if (deleteModal) { deleteVersion(deleteModal); setDeleteModal(null); } }} className="btn-danger flex-1">Delete</button>
          <button type="button" onClick={() => setDeleteModal(null)} className="btn-ghost flex-1">Cancel</button>
        </div>
      </Modal>
    </div>
  );
}
