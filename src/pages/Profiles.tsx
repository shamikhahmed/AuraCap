import { useState } from 'react';
import { Plus } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { GlassCard } from '@/components/ui/GlassCard';
import { Modal } from '@/components/ui/Modal';

export function Profiles() {
  const { state, activeProfile, switchProfile, createProfile, editProfile } = useApp();
  const [createModal, setCreateModal] = useState(false);
  const [editModal, setEditModal] = useState<string | null>(null);
  const [name, setName] = useState('');

  return (
    <div>
      <div className="flex items-start justify-between mb-6">
        <div><h1 className="page-title">Multi-Profile System</h1><p className="page-sub">Separate app lists, layouts, wallpapers & scores per profile</p></div>
        <button type="button" onClick={() => setCreateModal(true)} className="btn-primary btn-sm"><Plus size={14} /> New Profile</button>
      </div>

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

      <Modal open={createModal} onClose={() => setCreateModal(false)} title="New profile">
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Profile name (e.g. Gaming, Travel)" className="input-field mb-4" />
        <button type="button" onClick={() => { if (name.trim()) { createProfile(name.trim()); setCreateModal(false); setName(''); } }} className="btn-primary w-full">Create</button>
      </Modal>

      <Modal open={!!editModal} onClose={() => setEditModal(null)} title="Edit profile">
        <input value={name} onChange={(e) => setName(e.target.value)} className="input-field mb-4" />
        <button type="button" onClick={() => { if (editModal && name.trim()) { editProfile(editModal, name.trim()); setEditModal(null); } }} className="btn-primary w-full">Save</button>
      </Modal>
    </div>
  );
}
