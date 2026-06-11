import { useApp } from '@/context/AppContext';
import { GlassCard } from '@/components/ui/GlassCard';
import { Modal } from '@/components/ui/Modal';
import { useState } from 'react';
import type { Habit } from '@/types';

const SECTIONS = [
  { key: 'morning' as const, emoji: '🌅', label: 'MORNING' },
  { key: 'day' as const, emoji: '☀', label: 'DAYTIME' },
  { key: 'evening' as const, emoji: '🌆', label: 'EVENING' },
  { key: 'night' as const, emoji: '🌙', label: 'NIGHT' },
];

export function DailyRoutine() {
  const { state, updateRoutine, toast } = useApp();
  const routine = state.routine;
  const [addModal, setAddModal] = useState<keyof typeof routine | null>(null);
  const [newHabit, setNewHabit] = useState('');

  const toggleHabit = (section: keyof typeof routine, id: string) => {
    if (section === 'screenTimeGoal') return;
    const habits = routine[section].map((h) => h.id === id ? { ...h, done: !h.done } : h);
    updateRoutine({ ...routine, [section]: habits });
  };

  const addHabit = () => {
    if (!addModal || !newHabit.trim() || addModal === 'screenTimeGoal') return;
    const habit: Habit = { id: `h_${Date.now()}`, text: newHabit.trim(), done: false };
    updateRoutine({ ...routine, [addModal]: [...routine[addModal], habit] });
    setAddModal(null);
    setNewHabit('');
    toast('Habit added!');
  };

  const removeHabit = (section: keyof typeof routine, id: string) => {
    if (section === 'screenTimeGoal') return;
    updateRoutine({ ...routine, [section]: routine[section].filter((h) => h.id !== id) });
  };

  return (
    <div>
      <div className="mb-6"><h1 className="page-title">Daily Routine</h1><p className="page-sub">Build healthy digital habits around your day</p></div>

      <div className="grid md:grid-cols-2 gap-3">
        {SECTIONS.map(({ key, emoji, label }) => (
          <GlassCard key={key}>
            <p className="section-label mb-2">{emoji} {label}</p>
            <div className="flex flex-col gap-1">
              {routine[key].map((h) => (
                <div key={h.id} className="habit-row">
                  <button type="button" onClick={() => toggleHabit(key, h.id)} className={`habit-check ${h.done ? 'done' : ''}`}>{h.done && '✓'}</button>
                  <span className="text-xs flex-1">{h.text}</span>
                  <button type="button" onClick={() => removeHabit(key, h.id)} className="text-[11px] text-[var(--red)]">×</button>
                </div>
              ))}
            </div>
            <button type="button" onClick={() => setAddModal(key)} className="btn-teal btn-sm w-full mt-2">+ Add</button>
          </GlassCard>
        ))}
        <GlassCard>
          <p className="section-label mb-2">SCREEN TIME GOAL</p>
          <input type="range" min={1} max={12} value={routine.screenTimeGoal} onChange={(e) => updateRoutine({ ...routine, screenTimeGoal: Number(e.target.value) })} className="range-input w-full" />
          <div className="flex justify-between text-[11px] text-[var(--mu)] mt-1"><span>1h</span><span className="text-[var(--ac)]">{routine.screenTimeGoal}h/day</span><span>12h</span></div>
          <button type="button" onClick={() => toast('Routine saved! 🌙')} className="btn-primary w-full mt-2.5">Save Routine</button>
        </GlassCard>
      </div>

      <Modal open={!!addModal} onClose={() => setAddModal(null)} title="Add habit">
        <input value={newHabit} onChange={(e) => setNewHabit(e.target.value)} placeholder="New habit" className="input-field mb-4" onKeyDown={(e) => e.key === 'Enter' && addHabit()} />
        <button type="button" onClick={addHabit} className="btn-primary w-full">Add</button>
      </Modal>
    </div>
  );
}
