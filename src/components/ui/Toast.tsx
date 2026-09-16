import { CheckCircle } from 'lucide-react';
import { useApp } from '@/context/AppContext';

export function ToastContainer() {
  const { toasts } = useApp();
  if (!toasts.length) return null;
  const latest = toasts[toasts.length - 1];
  return (
    <div
      className="fixed right-6 z-[999] flex items-center gap-2 px-4 py-3 rounded-[13px] bg-[var(--s2)] border border-[var(--bd2)] text-sm font-medium shadow-[var(--shadow)] max-w-[300px] animate-fiu"
      style={{ bottom: 'calc(max(0.75rem, env(safe-area-inset-bottom)) + 4.75rem)' }}
    >
      <CheckCircle size={16} className="text-[var(--ac3)] shrink-0" />
      <span>{latest.message}</span>
    </div>
  );
}
