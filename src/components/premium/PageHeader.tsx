export function PageHeader({
  eyebrow,
  title,
  subtitle,
  trailing,
  large,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: React.ReactNode;
  trailing?: React.ReactNode;
  large?: boolean;
}) {
  return (
    <header className="flex items-start justify-between gap-4 glass-card-enter">
      <div className="min-w-0 flex-1">
        {eyebrow && (
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--color-text-tertiary)] mb-1.5">
            {eyebrow}
          </p>
        )}
        <h1 className={`font-semibold tracking-tight leading-[1.1] ${large ? 'text-display' : 'text-title'}`}>
          {title}
        </h1>
        {subtitle && (
          <div className="text-subhead text-[var(--color-text-secondary)] mt-2 leading-relaxed">{subtitle}</div>
        )}
      </div>
      {trailing && <div className="shrink-0">{trailing}</div>}
    </header>
  );
}
