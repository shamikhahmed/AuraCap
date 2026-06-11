import { useEffect, useState } from 'react';

interface ScoreRingProps {
  value: number;
  label: string;
  gradientId: string;
  colors: [string, string];
  size?: number;
}

export function ScoreRing({ value, label, gradientId, colors, size = 86 }: ScoreRingProps) {
  const [display, setDisplay] = useState(0);
  const r = 38;
  const circumference = 2 * Math.PI * r;

  useEffect(() => {
    let c = 0;
    const tick = () => {
      c = Math.min(c + 2, value);
      setDisplay(c);
      if (c < value) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [value]);

  const offset = circumference - (circumference * value) / 100;

  return (
    <div className="flex flex-col items-center">
      <div className="relative inline-flex items-center justify-center">
        <svg width={size} height={size} viewBox="0 0 96 96" className="-rotate-90">
          <circle cx="48" cy="48" r={r} fill="none" stroke="var(--bd)" strokeWidth="6" />
          <circle
            cx="48" cy="48" r={r} fill="none" stroke={`url(#${gradientId})`} strokeWidth="6"
            strokeLinecap="round" strokeDasharray={circumference} strokeDashoffset={offset}
            className="transition-all duration-[1.6s] ease-out"
          />
          <defs>
            <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={colors[0]} />
              <stop offset="100%" stopColor={colors[1]} />
            </linearGradient>
          </defs>
        </svg>
        <div className="absolute text-center">
          <div className="text-[19px] font-extrabold font-display">{display}</div>
          <div className="text-[8px] text-[var(--mu)]">{label}</div>
        </div>
      </div>
    </div>
  );
}
