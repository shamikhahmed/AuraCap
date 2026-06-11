import { X } from 'lucide-react';
import type { ReactNode } from 'react';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
}

export function Modal({ open, onClose, title, children }: ModalProps) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[400] flex items-center justify-center p-5 bg-black/72 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-[var(--s2)] border border-[var(--bd2)] rounded-[22px] p-6 max-w-md w-full max-h-[90vh] overflow-y-auto relative" onClick={(e) => e.stopPropagation()}>
        <button type="button" onClick={onClose} className="absolute top-3 right-3.5 text-[var(--mu)] hover:text-[var(--tx)]">
          <X size={20} />
        </button>
        {title && <h3 className="text-lg font-bold font-display mb-4 pr-8">{title}</h3>}
        {children}
      </div>
    </div>
  );
}
