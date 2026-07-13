import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { profile } from '@/data/profile';
import { useMotionPreference } from '@/providers/ReducedMotionProvider';
import { cn } from '@/utils/cn';

const CHIPS = ['React', 'TypeScript', 'Python', 'C#', 'FastAPI', 'SQL', 'MongoDB', 'REST API'];
const FLOW = ['Frontend', 'API', 'Backend', 'Database'];

export function DeveloperVisual() {
  const { reduceMotion } = useMotionPreference();
  const [visibleLines, setVisibleLines] = useState(reduceMotion ? profile.terminalLines.length : 0);

  useEffect(() => {
    if (reduceMotion) return;
    setVisibleLines(0);
    const timers = profile.terminalLines.map((_, i) =>
      window.setTimeout(() => setVisibleLines((prev) => Math.max(prev, i + 1)), 500 + i * 650),
    );
    return () => timers.forEach((t) => window.clearTimeout(t));
  }, [reduceMotion]);

  return (
    <div className="relative mx-auto w-full max-w-md">
      {/* Floating tech chips */}
      <div className="pointer-events-none absolute inset-0 hidden sm:block" aria-hidden="true">
        {CHIPS.map((chip, i) => (
          <motion.span
            key={chip}
            // No backdrop-blur here on purpose: this renders 8 copies of this
            // chip, every one of them permanently on screen in the Hero and
            // permanently animating (infinite float). Eight simultaneous,
            // always-visible blurred+animating layers is a steady, avoidable
            // compositing cost on every frame the Hero is in view. A solid
            // (slightly more opaque) background keeps the same look for free.
            className="absolute rounded-full border border-border-strong bg-bg-secondary px-3 py-1 font-mono text-[11px] text-text-muted shadow-card"
            style={{
              top: `${(i * 37) % 100}%`,
              left: i % 2 === 0 ? `${-8 - (i % 3) * 4}%` : undefined,
              right: i % 2 !== 0 ? `${-10 - (i % 3) * 4}%` : undefined,
            }}
            animate={reduceMotion ? undefined : { y: [0, -10, 0] }}
            transition={{ duration: 4 + i * 0.4, repeat: Infinity, ease: 'easeInOut' }}
          >
            {chip}
          </motion.span>
        ))}
      </div>

      {/* Code editor / terminal card */}
      <div className="glass-panel relative overflow-hidden shadow-glow">
        <div className="flex items-center gap-2 border-b border-border px-4 py-3">
          <span className="h-3 w-3 rounded-full bg-danger/70" />
          <span className="h-3 w-3 rounded-full bg-[#f5c451]/70" />
          <span className="h-3 w-3 rounded-full bg-success/70" />
          <span className="ml-3 font-mono text-xs text-text-muted">terminal — zsh</span>
        </div>
        <div className="min-h-[180px] px-4 py-4 font-mono text-sm">
          {profile.terminalLines.slice(0, visibleLines).map((line, i) => (
            <div key={i} className="mb-3">
              <p className="text-text-main">
                <span className="text-accent-cyan">$</span> {line.command}
              </p>
              <p className="mt-1 text-text-muted">{line.output}</p>
            </div>
          ))}
          <span
            className={cn(
              'inline-block h-4 w-2 translate-y-1 bg-accent-cyan',
              !reduceMotion && 'animate-blink',
            )}
            aria-hidden="true"
          />
        </div>

        <div className="border-t border-border px-4 py-4">
          <p className="mb-2 font-mono text-[11px] uppercase tracking-widest text-text-muted">
            Architecture
          </p>
          <div className="flex flex-wrap items-center gap-2">
            {FLOW.map((step, i) => (
              <div key={step} className="flex items-center gap-2">
                <span className="rounded-lg border border-border bg-white/[0.04] px-2.5 py-1 text-xs text-text-main">
                  {step}
                </span>
                {i < FLOW.length - 1 && (
                  <motion.span
                    className="text-accent"
                    animate={reduceMotion ? undefined : { opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 1.8, repeat: Infinity, delay: i * 0.3 }}
                  >
                    →
                  </motion.span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Small analytics-style card floating behind/beside */}
      <motion.div
        className="glass-panel absolute -bottom-8 -left-6 hidden w-40 p-3 shadow-card sm:block"
        animate={reduceMotion ? undefined : { y: [0, -8, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
      >
        <p className="font-mono text-[10px] text-text-muted">mood_score</p>
        <div className="mt-2 flex items-end gap-1">
          {[6, 9, 5, 11, 8, 13].map((h, i) => (
            <span
              key={i}
              className="w-2 rounded-sm bg-gradient-to-t from-accent to-accent-cyan"
              style={{ height: `${h * 3}px` }}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
}
