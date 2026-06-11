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
  return (
    <div className="text-center py-14 px-5">
      <div className="text-5xl mb-4">{emoji}</div>
      <h3 className="text-xl font-bold font-display mb-2">{title}</h3>
      <p className="text-[var(--mu)] text-sm mb-5 max-w-md mx-auto">{description}</p>
      {ctaLabel && ctaTo && <Link to={ctaTo} className="btn-primary">{ctaLabel}</Link>}
      {ctaLabel && onCta && <button type="button" onClick={onCta} className="btn-primary">{ctaLabel}</button>}
      {children}
    </div>
  );
}
