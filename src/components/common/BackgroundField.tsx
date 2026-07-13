import { useMotionPreference } from '@/providers/ReducedMotionProvider';

/**
 * Global decorative background: animated grid, floating gradient orbs,
 * and a subtle noise overlay. Fixed and pointer-events-none so it never
 * interferes with interaction; animation is skipped under reduced motion.
 */
export function BackgroundField() {
  const { reduceMotion } = useMotionPreference();

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden="true">
      <div className="absolute inset-0 bg-bg-primary" />
      <div className="absolute inset-0 bg-grid-pattern bg-[size:64px_64px] opacity-40 [mask-image:radial-gradient(ellipse_80%_60%_at_50%_0%,black,transparent)]" />
      <div className="absolute inset-0 bg-radial-fade" />

      {/*
       * These blurred "orbs" are the single most expensive thing on the
       * page to paint — blur cost grows roughly with the square of the
       * radius, and this layer sits fixed behind everything and animates
       * forever. Keeping the radius modest and promoting each orb to its
       * own compositor layer (will-change) keeps the float animation on
       * the GPU instead of forcing a repaint of the page underneath it.
       */}
      <div
        className={`absolute -left-40 top-[-10%] h-[420px] w-[420px] rounded-full bg-accent/25 blur-[64px] will-change-transform ${
          reduceMotion ? '' : 'animate-float'
        }`}
      />
      <div
        className={`absolute right-[-10%] top-[30%] h-[360px] w-[360px] rounded-full bg-accent-purple/20 blur-[64px] will-change-transform ${
          reduceMotion ? '' : 'animate-float'
        }`}
        style={{ animationDelay: '1.5s' }}
      />
      <div
        className={`absolute bottom-[-15%] left-[20%] h-[400px] w-[400px] rounded-full bg-accent-cyan/15 blur-[64px] will-change-transform ${
          reduceMotion ? '' : 'animate-float'
        }`}
        style={{ animationDelay: '3s' }}
      />

      <div className="noise-overlay absolute inset-0" />
    </div>
  );
}
