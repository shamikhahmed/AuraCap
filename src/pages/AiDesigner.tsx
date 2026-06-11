import { useState } from 'react';
import { Bookmark, Wand2 } from 'lucide-react';
import { DEV_RULES } from '@/data';
import { useApp } from '@/context/AppContext';
import { GlassCard } from '@/components/ui/GlassCard';
import { DevicePreview } from '@/components/device/DevicePreview';
import { AESTHETICS, getLayoutRecommendation, IPHONE_MODELS, IPAD_MODELS, MAC_MODELS } from '@/engines/designer';
import type { DeviceType } from '@/types';

export function AiDesigner() {
  const { state, setDevice, setModel, saveVersion, toast } = useApp();
  const [aesthetic, setAesthetic] = useState('minimal');
  const [rec, setRec] = useState('');
  const [thinking, setThinking] = useState(false);

  const models = state.device === 'iphone' ? IPHONE_MODELS : state.device === 'ipad' ? IPAD_MODELS : MAC_MODELS;
  const modelLabel = models.find((m) => m.value === state.model)?.label ?? state.model;

  const genDesign = () => {
    setThinking(true);
    setRec('');
    setTimeout(() => {
      setThinking(false);
      const text = getLayoutRecommendation(aesthetic);
      setRec(text);
      toast(`Layout generated for ${aesthetic} style!`);
      saveVersion(`Layout ${new Date().toLocaleDateString()}`, aesthetic);
    }, 1500);
  };

  return (
    <div>
      <div className="flex items-start justify-between mb-6">
        <div><h1 className="page-title">AI Homescreen Designer</h1><p className="page-sub">Device-specific layouts — each platform has its own grid, dock & rules</p></div>
        <span className="badge-live"><Wand2 size={9} /> Smart Assistant</span>
      </div>

      <GlassCard className="mb-3.5">
        <p className="section-label mb-3">SELECT YOUR DEVICE MODEL</p>
        <div className="flex gap-2 mb-3 flex-wrap">
          {(['iphone', 'ipad', 'mac'] as DeviceType[]).map((d) => (
            <button key={d} type="button" onClick={() => setDevice(d)} className={`device-tab ${state.device === d ? 'active' : ''}`}>{d}</button>
          ))}
        </div>
        <select value={state.model} onChange={(e) => { setModel(e.target.value); toast(`Preview: ${e.target.selectedOptions[0].text}`); }} className="input-field text-xs">
          {models.map((m) => <option key={m.value} value={m.value}>{m.label}</option>)}
        </select>
      </GlassCard>

      <div className="grid lg:grid-cols-[1fr_auto] gap-5 items-start">
        <div className="flex flex-col gap-3">
          <GlassCard>
            <p className="section-label mb-3">LAYOUT CONFIGURATION</p>
            <div className="grid grid-cols-2 gap-3">
              <div><label className="text-[10px] text-[var(--mu)] block mb-1">AESTHETIC</label>
                <select value={aesthetic} onChange={(e) => setAesthetic(e.target.value)} className="input-field text-xs">
                  {AESTHETICS.map((a) => <option key={a} value={a}>{a.charAt(0).toUpperCase() + a.slice(1)}</option>)}
                </select>
              </div>
              <div><label className="text-[10px] text-[var(--mu)] block mb-1">ICON STYLE</label><select className="input-field text-xs"><option>Rounded SF</option><option>Monochrome</option><option>Neon Glow</option></select></div>
              <div><label className="text-[10px] text-[var(--mu)] block mb-1">PAGES</label><select className="input-field text-xs"><option>1 Page</option><option>2 Pages</option><option>3 Pages</option></select></div>
              <div><label className="text-[10px] text-[var(--mu)] block mb-1">MODE</label><select className="input-field text-xs"><option>Balanced</option><option>Deep Work</option><option>Creative</option></select></div>
            </div>
            <button type="button" onClick={genDesign} className="btn-primary w-full mt-3"><Wand2 size={14} /> Generate Layout</button>
          </GlassCard>
          <GlassCard>
            <div className="flex justify-between mb-2"><p className="section-label">AI LAYOUT RECOMMENDATION</p>{thinking && <div className="flex gap-1">{[0, 1, 2].map((i) => <span key={i} className="ai-dot" style={{ animationDelay: `${i * 0.22}s` }} />)}</div>}</div>
            <p className="text-xs font-mono leading-loose text-[var(--ac3)]">{rec || 'Configure above and click Generate…'}</p>
          </GlassCard>
          <GlassCard>
            <p className="section-label mb-2">DEVICE-SPECIFIC RULES</p>
            <p className="text-xs text-[var(--mu)] leading-relaxed">{DEV_RULES[state.device]}</p>
          </GlassCard>
        </div>
        <div className="flex flex-col items-center gap-2 sticky top-[70px]">
          <p className="section-label">{modelLabel}</p>
          <DevicePreview device={state.device} model={state.model} />
          <div className="flex gap-1">{[0, 1].map((i) => <div key={i} className={`w-1 h-1 rounded-full ${i === 0 ? 'bg-[var(--ac)]' : 'bg-[var(--bd2)]'}`} />)}</div>
          <button type="button" onClick={() => saveVersion(`Layout ${new Date().toLocaleDateString()}`, aesthetic)} className="btn-ghost btn-sm"><Bookmark size={12} /> Save Version</button>
        </div>
      </div>
    </div>
  );
}
