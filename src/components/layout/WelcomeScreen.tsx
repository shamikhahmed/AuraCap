import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, BookOpen, Sparkles } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { Modal } from '@/components/ui/Modal';
import { ImportGuideContent } from '@/components/import/ImportGuideContent';

/** DNA card / ID badge welcome — no particle canvas */
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
      <div
        className="absolute inset-0 opacity-[0.35] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(color-mix(in srgb, var(--ac) 12%, transparent) 1px, transparent 1px), linear-gradient(90deg, color-mix(in srgb, var(--ac) 12%, transparent) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
        aria-hidden
      />

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-2 w-full max-w-md"
      >
        <div
          className="relative mx-auto mb-8 aspect-[1.6/1] w-full max-w-[340px] rounded-xl border border-[var(--gbd)] overflow-hidden shadow-[var(--shadow)]"
          style={{
            background:
              'linear-gradient(135deg, color-mix(in srgb, var(--s2) 90%, var(--ac)), var(--s1))',
          }}
          aria-hidden
        >
          <div className="absolute left-0 top-0 bottom-0 w-2 bg-[var(--ac)]" />
          <div className="absolute inset-0 p-5 flex flex-col justify-between">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-[9px] tracking-[0.22em] uppercase text-[var(--mu)] font-mono">Digital DNA</p>
                <p className="text-lg font-semibold tracking-tight mt-1" style={{ fontFamily: 'var(--fd)' }}>
                  AuraCap
                </p>
              </div>
              <div
                className="w-12 h-12 rounded-full border-2 border-dashed border-[var(--ac)] flex items-center justify-center text-[9px] font-bold tracking-wider text-[var(--ac)]"
                style={{ transform: 'rotate(-8deg)' }}
              >
                ID
              </div>
            </div>
            <div className="font-mono text-[10px] text-[var(--mu)] tracking-widest">
              IPHONE · IPAD · MAC · OFFLINE
            </div>
            <div
              className="h-7 w-[55%] rounded-sm"
              style={{ background: 'color-mix(in srgb, var(--tx) 12%, transparent)' }}
            />
          </div>
        </div>

        <div className="text-center">
          <p className="text-[10px] tracking-[0.2em] uppercase text-[var(--ac)] font-mono mb-3">
            Ecosystem credential
          </p>
          <h1
            className="text-[clamp(28px,6vw,40px)] font-bold tracking-tight leading-[1.08] mb-3"
            style={{ fontFamily: 'var(--fd)' }}
          >
            Your Apple DNA.
            <br />
            <span className="text-[var(--ac)]">One badge.</span>
          </h1>
          <p className="text-[var(--mu)] text-sm leading-relaxed max-w-sm mx-auto mb-6">
            Device layouts, profiles, wallpapers — private on this device.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
            <button type="button" onClick={handleLaunch} className="welcome-btn">
              Open badge <ArrowRight size={16} />
            </button>
            <button type="button" onClick={() => loadDemo()} className="btn-ghost flex items-center gap-2">
              <Sparkles size={14} /> Sample wardrobe
            </button>
          </div>
          <button
            type="button"
            onClick={() => setShowGuide(true)}
            className="mt-4 inline-flex items-center gap-1.5 text-[11px] text-[var(--ac)] hover:underline"
          >
            <BookOpen size={12} /> Import guide
          </button>
        </div>
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
