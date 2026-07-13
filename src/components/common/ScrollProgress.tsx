import { motion, useScroll, useSpring } from 'framer-motion';

/**
 * Uses Framer Motion's own `useScroll`, which tracks scroll via a
 * dedicated optimized listener and writes to a MotionValue directly —
 * no React state, no re-renders, no per-tick layout reads. This is the
 * one place a hand-rolled scroll listener genuinely isn't worth it.
 */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 300, damping: 40, mass: 0.2 });

  return (
    <div className="fixed inset-x-0 top-0 z-[60] h-[3px] bg-transparent" aria-hidden="true">
      <motion.div
        className="h-full origin-left bg-gradient-to-r from-accent via-accent-cyan to-accent-purple"
        style={{ scaleX }}
      />
    </div>
  );
}
