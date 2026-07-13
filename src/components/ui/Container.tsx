import type { ReactNode } from 'react';
import { cn } from '@/utils/cn';

export function Container({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={cn('section-container', className)}>{children}</div>;
}
