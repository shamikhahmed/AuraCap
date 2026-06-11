import { Link } from 'react-router-dom';
import {
  Smartphone, Tablet, Apple, Copy, FileText, Sparkles, LayoutGrid,
  Plus, FileJson, Lightbulb, ClipboardList, ArrowRight,
} from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { GlassCard } from '@/components/ui/GlassCard';

interface StepProps {
  n: number;
  title: string;
  desc?: string;
  children?: React.ReactNode;
}

function Step({ n, title, desc, children }: StepProps) {
  return (
    <div className="step-box">
      <div className="step-num">{n}</div>
      <div className="flex-1 min-w-0">
        <p className="text-xs font-semibold">{title}</p>
        {desc && <p className="text-[11px] text-[var(--mu)] mt-0.5">{desc}</p>}
        {children}
      </div>
    </div>
  );
}

function CopyBlock({ text, label }: { text: string; label?: string }) {
  const { toast } = useApp();
  return (
    <div className="flex items-center gap-2 mt-1.5 flex-wrap">
      <code className="flex-1 min-w-0 text-[11px] text-[var(--ac3)] font-mono bg-[var(--s1)] border border-[var(--bd2)] rounded-lg px-2.5 py-2 leading-relaxed break-all">
        {text}
      </code>
      <button
        type="button"
        onClick={() => { navigator.clipboard?.writeText(text); toast(label ?? 'Copied!'); }}
        className="btn-ghost btn-sm shrink-0"
      >
        <Copy size={12} /> Copy
      </button>
    </div>
  );
}

function Tip({ children, color = 'teal' }: { children: React.ReactNode; color?: 'teal' | 'purple' | 'amber' }) {
  const styles = {
    teal: 'bg-[rgba(29,233,182,0.06)] border-[rgba(29,233,182,0.16)] text-[var(--ac3)]',
    purple: 'bg-[rgba(123,94,167,0.06)] border-[rgba(123,94,167,0.2)] text-[var(--ac2)]',
    amber: 'bg-[rgba(245,158,11,0.06)] border-[rgba(245,158,11,0.2)] text-[var(--amber)]',
  };
  return (
    <div className={`flex items-start gap-2 p-2.5 rounded-lg border text-[11px] mt-3 ${styles[color]}`}>
      <Lightbulb size={14} className="shrink-0 mt-0.5" />
      <div>{children}</div>
    </div>
  );
}

interface ImportGuideContentProps {
  showCta?: boolean;
  compact?: boolean;
}

export function ImportGuideContent({ showCta = true, compact = false }: ImportGuideContentProps) {
  const { toast } = useApp();

  const sections = [
    { id: 'iphone', label: 'iPhone', icon: Smartphone },
    { id: 'ipad', label: 'iPad', icon: Tablet },
    { id: 'mac', label: 'Mac', icon: Apple },
    { id: 'other', label: 'Other Ways', icon: Sparkles },
  ] as const;

  return (
    <div className={compact ? 'space-y-4' : 'space-y-5'}>
      {!compact && (
        <GlassCard className="border-[rgba(79,110,247,0.28)]">
          <div className="flex items-start gap-3">
            <ClipboardList size={22} className="text-[var(--ac)] shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-sm mb-1">Why import your apps?</p>
              <p className="text-xs text-[var(--mu)] leading-relaxed">
                AuraCap analyzes your real app list to build Digital DNA, smart folders, device layouts, and personalized recommendations.
                The more complete your list, the better your setup.
              </p>
            </div>
          </div>
        </GlassCard>
      )}

      {/* iPhone */}
      <div id="iphone-guide"><GlassCard>
        <div className="flex items-center gap-2 mb-3">
          <Smartphone size={16} className="text-[var(--ac)]" />
          <p className="font-bold text-sm">iPhone — Shortcuts App Method</p>
          <span className="pill text-[10px] ml-auto">Recommended</span>
        </div>
        <div className="space-y-2">
          <Step n={1} title="Open Shortcuts app" desc="Swipe down on Home Screen → type &quot;Shortcuts&quot;" />
          <Step n={2} title='Tap + → Add Action → "Get All Apps"' desc="This pulls your complete installed app list" />
          <Step n={3} title='Add "Get Details of Apps" → select Name' desc="Extracts just the app names from the list" />
          <Step n={4} title='Add "Combine Text" → New Line → "Copy to Clipboard"' desc="500+ app names now in your clipboard" />
          <Step n={5} title="Come back to AuraCap and paste" desc="Hold tap → Paste in the Import tab. AuraCap imports and analyzes instantly." />
        </div>
        <div className="bg-[var(--s1)] border border-[var(--bd2)] rounded-xl p-3 mt-3 font-mono text-[11px] text-[var(--ac3)] leading-relaxed">
          1. Get All Apps<br />
          2. Get Details of Apps → Detail: Name<br />
          3. Combine Text → Separator: New Line<br />
          4. Copy to Clipboard
        </div>
        <Tip>
          <b>Tip:</b> Add the Shortcut to your iPhone Home Screen — re-run it whenever you install new apps to keep AuraCap updated.
        </Tip>
      </GlassCard></div>

      {/* iPad */}
      <div id="ipad-guide"><GlassCard>
        <div className="flex items-center gap-2 mb-3">
          <Tablet size={16} className="text-[var(--ac2)]" />
          <p className="font-bold text-sm">iPad — iPadOS Shortcuts Method</p>
        </div>
        <div className="space-y-2">
          <Step n={1} title="Open Shortcuts on iPad" desc='Same "Get All Apps" shortcut works on iPadOS — identical steps to iPhone' />
          <Step n={2} title="Or: Check App Library" desc="Swipe right past your last Home Screen page to see all apps organized by category" />
          <Step n={3} title="Stage Manager users: Check all windows" desc="iPadOS Stage Manager keeps apps in Recent panel — check there too for a complete list" />
          <Step n={4} title="Paste into the iPad Import tab" desc="Switch to iPad tab on Import page and paste your list" />
        </div>
        <Tip color="purple">
          <b>iPad note:</b> Your iPad and iPhone likely share many apps via Universal Purchases. Import both separately for a complete picture of each device.
        </Tip>
      </GlassCard></div>

      {/* Mac */}
      <div id="mac-guide"><GlassCard>
        <div className="flex items-center gap-2 mb-3">
          <Apple size={16} className="text-[var(--ac3)]" />
          <p className="font-bold text-sm">Mac — Terminal Method (Most Complete)</p>
        </div>
        <div className="space-y-2">
          <Step n={1} title="Open Terminal" desc='Cmd+Space → type "Terminal" → Enter' />
          <Step n={2} title="Run this command for all apps:">
            <CopyBlock text="ls /Applications | sed 's/.app//'" label="Command copied!" />
          </Step>
          <Step n={3} title="Also run for user-installed apps:">
            <CopyBlock text="ls ~/Applications | sed 's/.app//'" label="Command copied!" />
          </Step>
          <Step n={4} title="Select all output → Copy → Paste below" desc="Combine both outputs for the most complete Mac app list" />
          <Step n={5} title="Alternative: System Information" desc="Apple menu → About This Mac → System Report → Software → Applications lists every installed app" />
        </div>
        <Tip>
          <b>Mac exclusive apps</b> — AuraCap detects Mac-only tools (Xcode, Final Cut, Logic, Raycast, Alfred, Bartender, etc.) and keeps them separate from iPhone/iPad layouts.
        </Tip>
      </GlassCard></div>

      {/* Other methods */}
      <div id="other-guide"><GlassCard>
        <div className="flex items-center gap-2 mb-3">
          <Sparkles size={16} className="text-[var(--amber)]" />
          <p className="font-bold text-sm">Other Ways to Add Apps</p>
        </div>
        <div className="grid sm:grid-cols-2 gap-2.5">
          {[
            { icon: Sparkles, title: 'Demo mode', desc: 'Try AuraCap with a sample wardrobe — no import needed.', action: 'Try demo on Welcome screen' },
            { icon: FileText, title: 'Load sample list', desc: 'Pre-filled Pakistani + global app mix for testing.', action: 'Import tab → Load Sample' },
            { icon: LayoutGrid, title: 'App Library', desc: 'Browse 1000+ apps across 34 categories and tap to add.', action: 'Go to App Library', to: '/apps' },
            { icon: Plus, title: 'Custom app name', desc: 'Type any app not in the library and add it manually.', action: 'App Library → + button', to: '/apps' },
            { icon: FileJson, title: 'JSON backup', desc: 'Restore a full setup exported from Settings → Export Full Setup.', action: 'Settings → Import JSON', to: '/settings' },
            { icon: FileText, title: 'Drag & drop .txt', desc: 'Drop a plain-text app list file onto the Import textarea.', action: 'Import tab → drop file' },
          ].map((m) => (
            <div key={m.title} className="preset-tile !cursor-default">
              <m.icon size={18} className="text-[var(--ac)] mb-2" />
              <p className="font-semibold text-xs mb-1">{m.title}</p>
              <p className="text-[11px] text-[var(--mu)] mb-2 leading-relaxed">{m.desc}</p>
              {m.to ? (
                <Link to={m.to} className="text-[10px] text-[var(--ac3)] font-semibold hover:underline">{m.action} →</Link>
              ) : (
                <span className="text-[10px] text-[var(--mu2)]">{m.action}</span>
              )}
            </div>
          ))}
        </div>
        <Tip color="amber">
          <b>Screen Time workaround (iPhone/iPad):</b> Settings → Screen Time → See All Activity → scroll to see app names.
          Less complete than Shortcuts, but works if Shortcuts is unavailable.
        </Tip>
      </GlassCard></div>

      {showCta && (
        <div className="flex flex-col sm:flex-row gap-2 justify-center pt-2">
          <Link to="/import" className="btn-primary justify-center">
            Go to Import <ArrowRight size={14} />
          </Link>
          <button type="button" onClick={() => toast('Open Import → pick your device tab → paste your list')} className="btn-ghost justify-center">
            Quick reminder
          </button>
        </div>
      )}

      {!compact && (
        <div className="flex gap-2 flex-wrap justify-center">
          {sections.map(({ id, label, icon: Icon }) => (
            <a key={id} href={`#${id}-guide`} className="pill text-[10px]">
              <Icon size={10} /> {label}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
