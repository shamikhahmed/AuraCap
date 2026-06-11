import { Link } from 'react-router-dom';
import { useApp } from '@/context/AppContext';

const SHORTCUTS = [
  { emoji: '📋', title: 'List All My Apps', desc: 'Copies every installed app name to clipboard in one tap — iPhone & iPad.', steps: 'Get All Apps → Get Name\nCombine (New Lines) → Copy', cta: 'Setup in Import', to: '/import' },
  { emoji: '🌙', title: 'Bedtime Mode', desc: 'Auto DND, dims screen, sets alarm — runs at 10pm every night.', steps: 'Set Focus (Sleep)\nBrightness 20% → Set Alarm 7AM', cta: 'Setup Guide' },
  { emoji: '⚡', title: 'Work Mode Launcher', desc: 'Work Focus on + open Notion + set volume + play focus music.', steps: 'Set Focus (Work)\nOpen Notion → Set Volume 40%', cta: 'Setup Guide' },
  { emoji: '📵', title: 'Social Timer Lock', desc: '30-min countdown opens when you open Instagram or TikTok.', steps: 'Automation: App Opens\nStart Timer 30min → Alert', cta: 'Setup Guide' },
  { emoji: '🌅', title: 'Morning Briefing', desc: 'Speaks your weather + calendar events + quote at 6am.', steps: 'Get Weather → Get Events\nCombine → Speak Text', cta: 'Setup Guide' },
  { emoji: '🕌', title: 'Prayer Time Mode', desc: 'Silences phone + opens Muslim Pro + 20 min timer.', steps: 'Set Ringer Silent\nOpen Muslim Pro → Timer 20min', cta: 'Setup Guide' },
  { emoji: '🔋', title: 'Low Battery Saver', desc: 'Auto low power + dims screen at 20% battery.', steps: 'Automation: Battery 20%\nLow Power ON → Brightness 30%', cta: 'Setup Guide' },
  { emoji: '🏠', title: 'Home Arrival', desc: 'Personal Focus + open Spotify + raise brightness on arrival.', steps: 'Automation: Arrive Home\nSet Focus: Personal → Open Spotify', cta: 'Setup Guide' },
  { emoji: '₿', title: 'Crypto Check', desc: 'One tap opens Binance → TradingView → CoinGlass in sequence.', steps: 'Open Binance → Wait 2s\nOpen TradingView → Wait 2s', cta: 'Setup Guide' },
  { emoji: '📸', title: 'Photography Mode', desc: 'Max brightness + open Halide/FILCA + disable notifications.', steps: 'Set Focus (Custom)\nBrightness 100% → Open Camera', cta: 'Setup Guide' },
  { emoji: '✈', title: 'Travel Mode', desc: 'Activates on airport WiFi — opens Maps + Booking + Flightradar.', steps: 'Automation: WiFi connects\nOpen Maps → Open Booking.com', cta: 'Setup Guide' },
  { emoji: '🎯', title: 'Deep Work Block', desc: '2-hour Pomodoro: blocks distractions, plays binaural beats, 4 rounds.', steps: 'Work Focus ON\nTimer 25min (repeat 4x)', cta: 'Setup Guide' },
];

export function Shortcuts() {
  const { toast } = useApp();

  return (
    <div>
      <div className="mb-6"><h1 className="page-title">iOS Shortcuts Guide</h1><p className="page-sub">12 free automations — no third-party apps, built into iOS/iPadOS/macOS</p></div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
        {SHORTCUTS.map((s) => (
          <div key={s.title} className="shortcut-card">
            <div className="text-2xl mb-2">{s.emoji}</div>
            <p className="font-bold text-sm mb-1">{s.title}</p>
            <p className="text-xs text-[var(--mu)] mb-2.5 leading-relaxed">{s.desc}</p>
            <pre className="text-[10px] text-[var(--ac3)] leading-loose bg-[var(--s1)] p-2 rounded-lg mb-2 whitespace-pre-wrap font-mono">{s.steps}</pre>
            {s.to ? <Link to={s.to} className="btn-teal btn-sm">{s.cta}</Link> : <button type="button" onClick={() => toast('Shortcuts → Automation → see guide')} className="btn-teal btn-sm">{s.cta}</button>}
          </div>
        ))}
      </div>
    </div>
  );
}
