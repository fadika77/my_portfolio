import { useRef, type MouseEvent, type ReactNode } from 'react';
import { motion, useMotionValue, useMotionTemplate } from 'framer-motion';
import { cn } from '@/utils/cn';
import { useMotionPreference } from '@/providers/ReducedMotionProvider';
import { useIsTouchDevice } from '@/hooks/useMediaQuery';

interface SpotlightCardProps {
  children: ReactNode;
  className?: string;
}

/**
 * A glass card with a soft mouse-follow light glow (desktop only).
 *
 * The glow position is driven by Framer Motion values + useMotionTemplate
 * rather than React state — motion values write straight to the DOM style
 * outside React's render cycle, so moving the mouse across a card never
 * triggers a component re-render. With this pattern reused across every
 * card on the page, that's the difference between smooth and janky.
 */
export function SpotlightCard({ children, className }: SpotlightCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { reduceMotion } = useMotionPreference();
  const isTouch = useIsTouchDevice();
  const enableSpotlight = !reduceMotion && !isTouch;

  const mouseX = useMotionValue(50);
  const mouseY = useMotionValue(50);
  const background = useMotionTemplate`radial-gradient(320px circle at ${mouseX}% ${mouseY}%, rgba(79,141,255,0.14), transparent 70%)`;

  const handleMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    if (!enableSpotlight || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    mouseX.set(((event.clientX - rect.left) / rect.width) * 100);
    mouseY.set(((event.clientY - rect.top) / rect.height) * 100);
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      className={cn('glass-panel group relative overflow-hidden', className)}
    >
      {enableSpotlight && (
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{ background }}
        />
      )}
      <div className="relative">{children}</div>
    </div>
  );
}
