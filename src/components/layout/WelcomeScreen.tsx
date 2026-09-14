import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, BookOpen, Laptop, Smartphone, Sparkles, Tablet } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { Modal } from '@/components/ui/Modal';
import { ImportGuideContent } from '@/components/import/ImportGuideContent';

const DEVICES = [
  { id: 'phone', label: 'iPhone', Icon: Smartphone, x: 12, y: 78 },
  { id: 'pad', label: 'iPad', Icon: Tablet, x: 88, y: 78 },
  { id: 'mac', label: 'Mac', Icon: Laptop, x: 50, y: 8 },
] as const;

/** Welcome — frosted setup card + device constellation (no WebGL) */
export function WelcomeScreen() {
  const { state, enterApp, loadDemo, persist } = useApp();
  const [showName, setShowName] = useState(false);
  const [showGuide, setShowGuide] = useState(false);
  const [name, setName] = useState('');

  const handleLaunch = () => {
    if (!state.onboardingDone) {
      setShowName(true);
      return;
    }
    enterApp();
  };

  const handleNameSubmit = async () => {
    await persist({ name: name.trim(), onboardingDone: true });
    setShowName(false);
    await enterApp(name.trim());
  };

  if (state.entered) return null;

  return (
    <div className="fixed inset-0 z-[500] flex flex-col items-center justify-center bg-[var(--bg)] overflow-hidden px-6">
      <div className="welcome-grid absolute inset-0 opacity-[0.28] pointer-events-none" aria-hidden />

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-2 w-full max-w-md"
      >
        <div className="welcome-constellation relative mx-auto mb-8 w-full max-w-[360px] aspect-[1.15/1]" aria-hidden>
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 360 312" fill="none">
            {DEVICES.map((d) => (
              <line
                key={d.id}
                x1={d.x * 3.6}
                y1={d.y * 3.12}
                x2="180"
                y2="156"
                stroke="var(--ac)"
                strokeWidth="1.5"
                strokeOpacity="0.45"
                strokeDasharray="4 6"
              />
            ))}
            <circle cx="180" cy="156" r="4" fill="var(--ac)" opacity="0.6" />
          </svg>

          {DEVICES.map((d, i) => (
            <motion.div
              key={d.id}
              className="welcome-device-node"
              style={{ left: `${d.x}%`, top: `${d.y}%` }}
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.15 + i * 0.08 }}
            >
              <d.Icon size={16} strokeWidth={1.75} />
              <span>{d.label}</span>
            </motion.div>
          ))}

          <div className="welcome-dna-card absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[62%] aspect-[1.6/1] rounded-xl overflow-hidden">
            <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-[var(--ac)]" />
            <div className="relative h-full p-4 flex flex-col justify-between">
              <div>
                <p className="text-[12px] font-semibold text-[var(--mu)]">Setup report</p>
                <p className="text-base font-semibold tracking-tight mt-0.5" style={{ fontFamily: 'var(--fd)' }}>
                  AuraCap
                </p>
              </div>
              <div className="text-[12px] text-[var(--mu)]">Private on this device</div>
            </div>
          </div>
        </div>

        <div className="text-center">
          <h1
            className="text-[clamp(28px,6vw,40px)] font-bold tracking-tight leading-[1.08] mb-3"
            style={{ fontFamily: 'var(--fd)' }}
          >
            AuraCap
          </h1>
          <p className="text-[var(--mu)] text-sm leading-relaxed max-w-sm mx-auto mb-6">
            Organize your iPhone, iPad and Mac setup.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
            <button type="button" onClick={handleLaunch} className="welcome-btn">
              Open AuraCap <ArrowRight size={16} />
            </button>
            <button type="button" onClick={() => loadDemo()} className="btn-ghost flex items-center gap-2">
              <Sparkles size={14} /> Try sample data
            </button>
          </div>
          <button
            type="button"
            onClick={() => setShowGuide(true)}
            className="mt-4 inline-flex items-center gap-1.5 text-[13px] text-[var(--ac)] hover:underline"
          >
            <BookOpen size={12} /> Import guide
          </button>
        </div>
      </motion.div>

      <Modal open={showGuide} onClose={() => setShowGuide(false)} title="How to import your apps" wide>
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
          <button type="button" onClick={handleNameSubmit} className="btn-primary flex-1">
            Continue
          </button>
          <button
            type="button"
            onClick={() => {
              setShowName(false);
              enterApp();
            }}
            className="btn-ghost"
          >
            Skip
          </button>
        </div>
      </Modal>
    </div>
  );
}
