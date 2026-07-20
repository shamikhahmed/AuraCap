import { Link } from 'react-router-dom';
import type { ReactNode } from 'react';

interface EmptyStateProps {
  emoji: string;
  title: string;
  description: string;
  ctaLabel?: string;
  ctaTo?: string;
  onCta?: () => void;
  children?: ReactNode;
}

export function EmptyState({ emoji, title, description, ctaLabel, ctaTo, onCta, children }: EmptyStateProps) {
  const markOnly = emoji.length > 0 && emoji.length <= 4 && !/[^\w\s-]/.test(emoji);
  return (
    <div className="text-center py-14 px-5">
      {emoji ? (
        <div className={markOnly
          ? 'inline-block mb-4 font-mono text-[11px] font-semibold tracking-[0.18em] uppercase text-[var(--mu)] border border-[var(--bd)] rounded-md px-3 py-2'
          : 'text-5xl mb-4'}>{emoji}</div>
      ) : null}
      <h3 className="text-xl font-bold font-display mb-2">{title}</h3>
      <p className="text-[var(--mu)] text-sm mb-5 max-w-md mx-auto">{description}</p>
      {ctaLabel && ctaTo && <Link to={ctaTo} className="btn-primary">{ctaLabel}</Link>}
      {ctaLabel && onCta && <button type="button" onClick={onCta} className="btn-primary">{ctaLabel}</button>}
      {children}
    </div>
  );
}
