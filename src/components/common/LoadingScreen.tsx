import { motion } from 'framer-motion';

export function LoadingScreen() {
  return (
    <div className="flex min-h-[60vh] w-full flex-col items-center justify-center gap-4">
      <div className="flex items-center gap-1 font-mono text-sm text-accent-cyan">
        <span>Loading</span>
        <motion.span
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 1.2, repeat: Infinity }}
        >
          _
        </motion.span>
      </div>
      <div className="h-1 w-40 overflow-hidden rounded-full bg-white/5">
        <motion.div
          className="h-full w-1/3 rounded-full bg-gradient-to-r from-accent to-accent-cyan"
          animate={{ x: ['-100%', '220%'] }}
          transition={{ duration: 1.1, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>
    </div>
  );
}
