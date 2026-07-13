import type { ReactNode } from 'react';
import { cn } from '@/utils/cn';

export function Badge({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border border-border bg-white/[0.04] px-3 py-1 text-xs font-mono text-text-muted',
        className,
      )}
    >
      {children}
    </span>
  );
}
