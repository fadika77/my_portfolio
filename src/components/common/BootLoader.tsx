import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useMotionPreference } from '@/providers/ReducedMotionProvider';

/**
 * One-time animated splash shown briefly when the site first loads.
 * Skipped entirely under reduced motion so it never delays content.
 */
export function BootLoader() {
  const { reduceMotion } = useMotionPreference();
  const [visible, setVisible] = useState(!reduceMotion);

  useEffect(() => {
    if (reduceMotion) return;
    const timeout = window.setTimeout(() => setVisible(false), 1100);
    return () => window.clearTimeout(timeout);
  }, [reduceMotion]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-bg-primary"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.p
            className="font-mono text-lg text-text-main"
            initial={{ opacity: 0, letterSpacing: '0.1em' }}
            animate={{ opacity: 1, letterSpacing: '0.02em' }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-accent-cyan">{'>'}</span> initializing_portfolio
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.7, repeat: Infinity }}
            >
              _
            </motion.span>
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
