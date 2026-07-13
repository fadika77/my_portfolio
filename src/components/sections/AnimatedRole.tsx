import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { profile } from '@/data/profile';
import { useMotionPreference } from '@/providers/ReducedMotionProvider';

const ROTATE_INTERVAL_MS = 2600;

export function AnimatedRole() {
  const [index, setIndex] = useState(0);
  const { reduceMotion } = useMotionPreference();
  const roles = profile.rotatingRoles;

  useEffect(() => {
    if (reduceMotion) return;
    const interval = window.setInterval(() => {
      setIndex((prev) => (prev + 1) % roles.length);
    }, ROTATE_INTERVAL_MS);
    return () => window.clearInterval(interval);
  }, [reduceMotion, roles.length]);

  if (reduceMotion) {
    return <span className="gradient-text">{roles[0]}</span>;
  }

  return (
    <span className="relative inline-flex h-[1.4em] min-w-[280px] items-center overflow-hidden align-bottom sm:min-w-[360px]">
      <AnimatePresence mode="wait">
        <motion.span
          key={roles[index]}
          initial={{ y: '100%', opacity: 0 }}
          animate={{ y: '0%', opacity: 1 }}
          exit={{ y: '-100%', opacity: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="gradient-text absolute left-0"
        >
          {roles[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
