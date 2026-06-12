const PHONE = { w: 1170, h: 2532 };
const IPAD = { w: 1668, h: 2388 };

function fillBackground(ctx: CanvasRenderingContext2D, bg: string, w: number, h: number) {
  const solid = bg.match(/^#[0-9a-fA-F]{3,8}$/);
  if (solid) {
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, w, h);
    return;
  }

  const linear = bg.match(/linear-gradient\((\d+)deg,\s*(#[0-9a-fA-F]+),\s*(#[0-9a-fA-F]+)\)/);
  if (linear) {
    const deg = Number(linear[1]);
    const rad = ((deg - 90) * Math.PI) / 180;
    const x0 = w / 2 - Math.cos(rad) * w / 2;
    const y0 = h / 2 - Math.sin(rad) * h / 2;
    const x1 = w / 2 + Math.cos(rad) * w / 2;
    const y1 = h / 2 + Math.sin(rad) * h / 2;
    const g = ctx.createLinearGradient(x0, y0, x1, y1);
    g.addColorStop(0, linear[2]);
    g.addColorStop(1, linear[3]);
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, w, h);
    return;
  }

  const radial = bg.match(/radial-gradient\(ellipse at [\d.]+%\s+[\d.]+%?,\s*(#[0-9a-fA-F]+),\s*(#[0-9a-fA-F]+)\)/);
  if (radial) {
    const g = ctx.createRadialGradient(w / 2, h * 0.22, 0, w / 2, h / 2, w * 0.85);
    g.addColorStop(0, radial[1]);
    g.addColorStop(1, radial[2]);
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, w, h);
    return;
  }

  ctx.fillStyle = '#050507';
  ctx.fillRect(0, 0, w, h);
}

export function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

async function canvasToBlob(canvas: HTMLCanvasElement): Promise<Blob> {
  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => (blob ? resolve(blob) : reject(new Error('PNG export failed'))), 'image/png');
  });
}

export async function exportWallpaperPng(
  background: string,
  emoji: string,
  name: string,
  device: 'iphone' | 'ipad' = 'iphone',
) {
  const { w, h } = device === 'ipad' ? IPAD : PHONE;
  const canvas = document.createElement('canvas');
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Canvas unavailable');
  fillBackground(ctx, background, w, h);
  if (emoji) {
    ctx.font = `${Math.round(w * 0.2)}px "Apple Color Emoji","Segoe UI Emoji",sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(emoji, w / 2, h / 2);
  }
  const blob = await canvasToBlob(canvas);
  downloadBlob(blob, `auracap-${name.replace(/\s+/g, '-').toLowerCase()}.png`);
}

export async function exportLockscreenPng(
  lockscreen: {
    device: 'iphone' | 'ipad';
    background: string;
    clockWeight: string;
    clockStyle: string;
    widget1: { emoji: string; label: string };
    widget2: { emoji: string; label: string };
  },
) {
  const { w, h } = lockscreen.device === 'ipad' ? IPAD : PHONE;
  const canvas = document.createElement('canvas');
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Canvas unavailable');

  fillBackground(ctx, lockscreen.background, w, h);

  const time = new Date();
  const clockStr = `${String(time.getHours()).padStart(2, '0')}:${String(time.getMinutes()).padStart(2, '0')}`;
  const dateStr = time.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' });

  ctx.fillStyle = 'rgba(255,255,255,0.92)';
  ctx.textAlign = 'center';
  ctx.font = `${lockscreen.clockWeight} ${Math.round(w * 0.14)}px -apple-system, BlinkMacSystemFont, sans-serif`;
  ctx.fillText(clockStr, w / 2, h * 0.22);

  ctx.fillStyle = 'rgba(255,255,255,0.5)';
  ctx.font = `400 ${Math.round(w * 0.028)}px -apple-system, BlinkMacSystemFont, sans-serif`;
  ctx.fillText(dateStr, w / 2, h * 0.28);

  const widgetW = w * 0.42;
  const widgetH = h * 0.06;
  const widgetY = h * 0.34;
  const gap = w * 0.04;
  const leftX = w / 2 - widgetW - gap / 2;
  const rightX = w / 2 + gap / 2;

  for (const [x, widget] of [[leftX, lockscreen.widget1], [rightX, lockscreen.widget2]] as const) {
    ctx.fillStyle = 'rgba(255,255,255,0.09)';
    roundRect(ctx, x, widgetY, widgetW, widgetH, 18);
    ctx.fill();
    ctx.font = `${Math.round(w * 0.045)}px "Apple Color Emoji",sans-serif`;
    ctx.fillStyle = '#fff';
    ctx.fillText(widget.emoji, x + widgetW / 2, widgetY + widgetH * 0.42);
    ctx.font = `500 ${Math.round(w * 0.022)}px -apple-system, sans-serif`;
    ctx.fillStyle = 'rgba(255,255,255,0.85)';
    ctx.fillText(widget.label, x + widgetW / 2, widgetY + widgetH * 0.78);
  }

  const btnR = w * 0.035;
  ctx.fillStyle = 'rgba(255,255,255,0.12)';
  ctx.beginPath();
  ctx.arc(w * 0.12, h * 0.92, btnR, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.arc(w * 0.88, h * 0.92, btnR, 0, Math.PI * 2);
  ctx.fill();

  const blob = await canvasToBlob(canvas);
  downloadBlob(blob, `auracap-lockscreen-${lockscreen.device}.png`);
}

function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

export function buildShortcutsGuide(): string {
  const lines = [
    'AuraCap — iOS Shortcuts Install Guide',
    '====================================',
    '',
    'Open the Shortcuts app → Automation or Shortcuts tab → + to create.',
    '',
  ];
  const shortcuts = [
    { title: 'List All My Apps', steps: 'Get All Apps → Get Name\nCombine (New Lines) → Copy' },
    { title: 'Bedtime Mode', steps: 'Set Focus (Sleep)\nBrightness 20% → Set Alarm 7AM' },
    { title: 'Work Mode Launcher', steps: 'Set Focus (Work)\nOpen Notion → Set Volume 40%' },
    { title: 'Social Timer Lock', steps: 'Automation: App Opens\nStart Timer 30min → Alert' },
    { title: 'Morning Briefing', steps: 'Get Weather → Get Events\nCombine → Speak Text' },
    { title: 'Prayer Time Mode', steps: 'Set Ringer Silent\nOpen Muslim Pro → Timer 20min' },
    { title: 'Low Battery Saver', steps: 'Automation: Battery 20%\nLow Power ON → Brightness 30%' },
    { title: 'Home Arrival', steps: 'Automation: Arrive Home\nSet Focus: Personal → Open Spotify' },
    { title: 'Crypto Check', steps: 'Open Binance → Wait 2s\nOpen TradingView → Wait 2s' },
    { title: 'Photography Mode', steps: 'Set Focus (Custom)\nBrightness 100% → Open Camera' },
    { title: 'Travel Mode', steps: 'Automation: WiFi connects\nOpen Maps → Open Booking.com' },
    { title: 'Deep Work Block', steps: 'Work Focus ON\nTimer 25min (repeat 4x)' },
  ];
  shortcuts.forEach((s, i) => {
    lines.push(`${i + 1}. ${s.title}`, s.steps, '');
  });
  lines.push('Generated by AuraCap v5');
  return lines.join('\n');
}

export async function copyShortcutsGuide(): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(buildShortcutsGuide());
    return true;
  } catch {
    return false;
  }
}

export function downloadShortcutsGuide() {
  const blob = new Blob([buildShortcutsGuide()], { type: 'text/plain;charset=utf-8' });
  downloadBlob(blob, 'auracap-shortcuts-guide.txt');
}
