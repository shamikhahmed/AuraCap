import { useState } from 'react';
import { Dna, Send } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { GlassCard } from '@/components/ui/GlassCard';
import { EmptyState } from '@/components/ui/EmptyState';
import { AppChip } from '@/components/ui/AppChip';
import { DNA_DIMS } from '@/data';
import { categoryColor, getCategoryLabel } from '@/engines/dna';
import { smartReply } from '@/engines/chat';

export function DigitalDna() {
  const { state, dna, toast } = useApp();
  const [chat, setChat] = useState<{ role: 'user' | 'bot'; text: string }[]>([]);
  const [input, setInput] = useState('');
  const [analyzed, setAnalyzed] = useState(state.apps.length > 0);

  const runAnalysis = () => {
    if (!state.apps.length) { toast('Import your apps first!'); return; }
    setAnalyzed(true);
    toast('Digital DNA analyzed! 🧬');
  };

  const sendChat = (q?: string) => {
    const question = q ?? input.trim();
    if (!question) return;
    if (!state.apps.length) { setChat((c) => [...c, { role: 'bot', text: 'Import your apps first!' }]); return; }
    setChat((c) => [...c, { role: 'user', text: question }]);
    setInput('');
    setTimeout(() => setChat((c) => [...c, { role: 'bot', text: smartReply(question, state.apps) }]), 400);
  };

  if (!state.apps.length || !analyzed) {
    return (
      <div>
        <PageHeader onAnalyze={runAnalysis} />
        <EmptyState emoji="🧬" title="Import your apps first" description="Go to Import Apps → paste your list → come back for full analysis." ctaLabel="Import Apps" ctaTo="/import" />
      </div>
    );
  }

  const sortedCats = dna ? Object.entries(dna.categoryCounts).sort((a, b) => b[1] - a[1]).slice(0, 8) : [];

  return (
    <div>
      <PageHeader onAnalyze={runAnalysis} />
      <div className="grid md:grid-cols-2 gap-3.5 mb-3.5">
        <GlassCard>
          <p className="section-label mb-3">YOUR DIGITAL PROFILE</p>
          <div className="text-3xl mb-1">{dna?.profile.emoji}</div>
          <h2 className="text-xl font-extrabold font-display mb-1">{dna?.profile.name}</h2>
          <p className="text-xs text-[var(--mu)] leading-relaxed">{dna?.profile.desc}</p>
        </GlassCard>
        <GlassCard>
          <p className="section-label mb-3">CATEGORY BREAKDOWN</p>
          {sortedCats.map(([cat, count]) => (
            <div key={cat} className="chart-bar">
              <span className="w-20 text-[10px] text-[var(--mu)] text-right shrink-0">{getCategoryLabel(cat)}</span>
              <div className="chart-track flex-1"><div className="chart-fill" style={{ width: `${Math.max(Math.round((count / state.apps.length) * 100), 3)}%`, background: categoryColor(cat) }} /></div>
              <span className="w-6 text-[10px] text-[var(--mu)]">{count}</span>
            </div>
          ))}
        </GlassCard>
      </div>

      <div className="grid md:grid-cols-2 gap-3.5 mb-3.5">
        <GlassCard>
          <p className="section-label mb-3">DIMENSION SCORES</p>
          {DNA_DIMS.map((d) => {
            const v = dna?.dimensions[d.id]?.pct ?? 0;
            return (
              <div key={d.id} className="mb-2">
                <div className="flex justify-between text-[11px] mb-0.5"><span className="text-[var(--mu)]">{d.label}</span><span style={{ color: d.color }}>{v}%</span></div>
                <div className="dna-bar"><div className="dna-fill" style={{ width: `${v}%`, background: d.color }} /></div>
              </div>
            );
          })}
        </GlassCard>
        <GlassCard>
          <p className="section-label mb-3">ECOSYSTEM PROFILES</p>
          {dna?.locations.map((l) => (
            <div key={l.name} className="stat-row mb-2"><span className="text-lg">{l.emoji}</span><div><div className="text-xs font-semibold">{l.name}</div><div className="text-[10px] text-[var(--mu)]">{l.count} matching apps</div></div></div>
          ))}
        </GlassCard>
      </div>

      <div className="grid md:grid-cols-3 gap-3.5 mb-3.5">
        <GlassCard>
          <p className="section-label mb-2">REDUNDANCIES</p>
          {dna?.redundancies.length ? dna.redundancies.slice(0, 4).map((r) => (
            <div key={r.label} className="red-card mb-2"><p className="text-[11px] text-[var(--amber)] font-semibold mb-1">{r.label} ({r.found.length})</p><p className="text-[11px] text-[var(--mu)]">{r.found.join(', ')}</p></div>
          )) : <p className="text-xs text-[var(--ac3)]">No redundancies!</p>}
        </GlassCard>
        <GlassCard>
          <p className="section-label mb-2">TOP DISTRACTIONS</p>
          {dna?.distractions.length ? (
            <div className="flex flex-wrap gap-1">{dna.distractions.map((a) => <AppChip key={a} label={a} className="!text-[var(--red)] !border-[rgba(239,68,68,0.3)]" />)}</div>
          ) : <p className="text-xs text-[var(--ac3)]">No major distractions!</p>}
        </GlassCard>
        <GlassCard>
          <p className="section-label mb-2">AI RECOMMENDATIONS</p>
          {dna?.recommendations.map((r) => <p key={r} className="text-xs text-[var(--mu)] mb-1">• {r}</p>)}
        </GlassCard>
      </div>

      <GlassCard>
        <p className="section-label mb-3">SMART AI CHAT — Ask about your apps</p>
        <div className="min-h-[70px] max-h-[200px] overflow-y-auto mb-2.5 flex flex-col gap-2">
          {chat.map((m, i) => (
            <div key={i} className={`text-xs leading-relaxed px-3 py-2 rounded-[11px] max-w-[92%] ${m.role === 'user' ? 'self-end bg-[rgba(79,110,247,0.18)] border border-[rgba(79,110,247,0.3)]' : 'self-start bg-[var(--card)] border border-[var(--bd)]'}`}>{m.text}</div>
          ))}
        </div>
        <div className="flex gap-2">
          <input value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && sendChat()} placeholder="Which apps should I delete?" className="input-field flex-1 text-xs" />
          <button type="button" onClick={() => sendChat()} className="btn-primary btn-sm"><Send size={14} /></button>
        </div>
        <div className="flex flex-wrap gap-1 mt-2">
          {['Which apps should I delete?', 'What are my top distractions?', 'How should I organize my apps?', 'What does my app list say about me?'].map((q) => (
            <button key={q} type="button" onClick={() => sendChat(q)} className="btn-ghost btn-sm">{q}</button>
          ))}
        </div>
      </GlassCard>
    </div>
  );
}

function PageHeader({ onAnalyze }: { onAnalyze: () => void }) {
  return (
    <div className="flex items-start justify-between mb-6">
      <div><h1 className="page-title">Digital DNA</h1><p className="page-sub">Smart Assistant analysis — no API, no internet required</p></div>
      <button type="button" onClick={onAnalyze} className="btn-primary btn-sm"><Dna size={14} /> Analyze</button>
    </div>
  );
}
