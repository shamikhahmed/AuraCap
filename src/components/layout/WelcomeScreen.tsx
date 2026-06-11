import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, BookOpen, Sparkles } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { Modal } from '@/components/ui/Modal';
import { ImportGuideContent } from '@/components/import/ImportGuideContent';

export function WelcomeScreen() {
  const { state, enterApp, loadDemo, persist } = useApp();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [showName, setShowName] = useState(false);
  const [showGuide, setShowGuide] = useState(false);
  const [name, setName] = useState('');

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Enter' && !showName) handleLaunch();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  });

  useEffect(() => {
    const cv = canvasRef.current;
    if (!cv) return;
    const ctx = cv.getContext('2d');
    if (!ctx) return;
    const pts: { x: number; y: number; vx: number; vy: number; r: number }[] = [];
    const resize = () => { cv.width = window.innerWidth; cv.height = window.innerHeight; };
    resize();
    window.addEventListener('resize', resize);
    for (let i = 0; i < 60; i++) {
      pts.push({
        x: Math.random() * cv.width, y: Math.random() * cv.height,
        vx: (Math.random() - 0.5) * 0.25, vy: (Math.random() - 0.5) * 0.25,
        r: Math.random() * 1.2 + 0.4,
      });
    }
    let animId: number;
    const draw = () => {
      ctx.clearRect(0, 0, cv.width, cv.height);
      pts.forEach((p) => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > cv.width) p.vx *= -1;
        if (p.y < 0 || p.y > cv.height) p.vy *= -1;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(79,110,247,0.45)'; ctx.fill();
      });
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const dx = pts[i].x - pts[j].x, dy = pts[i].y - pts[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 100) {
            ctx.beginPath(); ctx.moveTo(pts[i].x, pts[i].y); ctx.lineTo(pts[j].x, pts[j].y);
            ctx.strokeStyle = `rgba(79,110,247,${0.1 * (1 - d / 100)})`; ctx.lineWidth = 0.5; ctx.stroke();
          }
        }
      }
      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', resize); };
  }, []);

  const handleLaunch = () => {
    if (!state.onboardingDone) { setShowName(true); return; }
    enterApp();
  };

  const handleNameSubmit = async () => {
    await persist({ name: name.trim(), onboardingDone: true });
    setShowName(false);
    await enterApp(name.trim());
  };

  if (state.entered) return null;

  return (
    <div className="fixed inset-0 z-[500] flex flex-col items-center justify-center bg-[var(--bg)] overflow-hidden">
      <div className="absolute inset-0 opacity-[0.022] bg-[linear-gradient(rgba(79,110,247,0.8)_1px,transparent_1px),linear-gradient(90deg,rgba(79,110,247,0.8)_1px,transparent_1px)] bg-[size:52px_52px]" />
      <div className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-[rgba(79,110,247,0.7)] to-transparent animate-scan" />
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none opacity-30" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-2 text-center px-6 max-w-2xl"
      >
        <div className="inline-flex items-center gap-2 bg-[rgba(79,110,247,0.12)] border border-[rgba(79,110,247,0.28)] rounded-full px-3.5 py-1.5 mb-5">
          <div className="w-1.5 h-1.5 rounded-full bg-[var(--ac3)] shadow-[0_0_8px_var(--ac3)]" />
          <span className="text-[10px] tracking-[2px] text-[var(--ac)] font-mono">AURACAP v5 — APPLE ECOSYSTEM STUDIO</span>
        </div>

        <h1 className="font-display text-[clamp(32px,5.5vw,60px)] font-extrabold tracking-[-2px] leading-[1.04] mb-2.5">
          One App.<br />
          <span className="bg-gradient-to-br from-[var(--ac)] via-[var(--ac2)] to-[var(--ac3)] bg-clip-text text-transparent">
            Every Device. Perfected.
          </span>
        </h1>
        <p className="text-[var(--mu)] text-sm leading-relaxed max-w-md mx-auto mb-1">
          iPhone · iPad · Mac — smart analysis, device-specific layouts,<br />
          location profiles, wallpapers & shortcuts. 100% offline.
        </p>

        <div className="flex gap-5 my-7 items-end justify-center">
          <DeviceShowcase type="iphone" />
          <DeviceShowcase type="ipad" />
          <DeviceShowcase type="mac" />
        </div>

        <div className="flex gap-2 flex-wrap justify-center mb-5">
          {['1000+ Apps', 'Smart DNA Engine', 'Multi-Profile', '100% Offline', 'Device-Specific'].map((p) => (
            <span key={p} className="pill">{p}</span>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
          <button type="button" onClick={handleLaunch} className="welcome-btn">
            Launch Ecosystem Studio <ArrowRight size={16} />
          </button>
          <button type="button" onClick={() => loadDemo()} className="btn-ghost flex items-center gap-2">
            <Sparkles size={14} /> Try with sample wardrobe
          </button>
        </div>
        <button type="button" onClick={() => setShowGuide(true)} className="mt-4 inline-flex items-center gap-1.5 text-[11px] text-[var(--ac)] hover:underline">
          <BookOpen size={12} /> New here? Read the app import guide
        </button>
        <p className="mt-3 text-[10px] text-[var(--mu2)] tracking-[2px] font-mono">PRESS ENTER OR CLICK TO BEGIN</p>
      </motion.div>

      <Modal open={showGuide} onClose={() => setShowGuide(false)} title="How to Import Your Apps" wide>
        <div className="max-h-[70vh] overflow-y-auto pr-1">
          <ImportGuideContent showCta={false} compact />
        </div>
      </Modal>

      <Modal open={showName} onClose={() => setShowName(false)} title="Welcome to AuraCap">
        <p className="text-sm text-[var(--mu)] mb-4">Optional — what should we call you?</p>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name"
          className="input-field mb-4"
          onKeyDown={(e) => e.key === 'Enter' && handleNameSubmit()}
        />
        <div className="flex gap-2">
          <button type="button" onClick={handleNameSubmit} className="btn-primary flex-1">Continue</button>
          <button type="button" onClick={() => { setShowName(false); enterApp(); }} className="btn-ghost">Skip</button>
        </div>
      </Modal>
    </div>
  );
}

function DeviceShowcase({ type }: { type: 'iphone' | 'ipad' | 'mac' }) {
  const labels = { iphone: 'iPhone', ipad: 'iPad', mac: 'Mac' };
  return (
    <div className="flex flex-col items-center gap-1.5">
      <div className={`relative overflow-hidden ${type === 'iphone' ? 'w-[72px] h-[148px] rounded-[18px] border-2 border-[rgba(79,110,247,0.4)]' : type === 'ipad' ? 'w-[108px] h-[148px] rounded-[14px] border-2 border-[rgba(123,94,167,0.4)]' : 'w-[170px] h-[110px] rounded-lg border-2 border-[rgba(29,233,182,0.3)]'}`}>
        <div className="absolute inset-0 bg-gradient-to-br from-[rgba(79,110,247,0.1)] to-transparent animate-pulse-soft" />
        {type === 'mac' && <div className="h-5 bg-[#222] flex items-center px-2 gap-1"><div className="w-1.5 h-1.5 rounded-full bg-[#ff5f56]" /><div className="w-1.5 h-1.5 rounded-full bg-[#ffbd2e]" /><div className="w-1.5 h-1.5 rounded-full bg-[#27c93f]" /></div>}
      </div>
      <span className="text-[10px] text-[var(--mu)]">{labels[type]}</span>
    </div>
  );
}
