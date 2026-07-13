import { motion } from 'framer-motion';
import type { ReactNode } from 'react';
import { useMotionPreference } from '@/providers/ReducedMotionProvider';

export function PageTransition({ children }: { children: ReactNode }) {
  const { reduceMotion } = useMotionPreference();

  if (reduceMotion) return <>{children}</>;

  // Opacity-only and short on purpose: animating `y` alongside opacity means
  // the browser has to repaint the moving box on every frame of every page
  // navigation, on top of whatever the new page itself is doing while it
  // mounts. A pure opacity fade is compositor-only (no layout/paint work)
  // and the shorter duration makes navigation feel immediate rather than
  // "waiting for an animation to finish" — the actual complaint was that
  // moving from page to page didn't feel smooth/fast.
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.18, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
}
