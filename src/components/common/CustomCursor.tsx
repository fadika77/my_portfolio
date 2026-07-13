import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useMotionPreference } from '@/providers/ReducedMotionProvider';
import { useIsTouchDevice } from '@/hooks/useMediaQuery';

/**
 * A small dot-with-ring cursor that follows the pointer on desktop.
 * Disabled automatically on touch devices and reduced-motion, and can
 * also be toggled off manually via the toggle rendered alongside it.
 */
export function CustomCursor() {
  const { reduceMotion, cursorDisabled, setCursorDisabled } = useMotionPreference();
  const isTouch = useIsTouchDevice();
  const [isPointerOverInteractive, setIsPointerOverInteractive] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const springX = useSpring(cursorX, { damping: 28, stiffness: 320, mass: 0.4 });
  const springY = useSpring(cursorY, { damping: 28, stiffness: 320, mass: 0.4 });

  const active = !reduceMotion && !isTouch && !cursorDisabled;
  const lastTargetRef = useRef<EventTarget | null>(null);

  useEffect(() => {
    if (!active) return;

    document.body.classList.add('custom-cursor-active');

    const handleMove = (event: MouseEvent) => {
      // Motion values write straight to the DOM outside React's render
      // cycle, so updating these on every event is cheap.
      cursorX.set(event.clientX);
      cursorY.set(event.clientY);

      // `closest()` walks up the DOM tree — expensive to do on every one
      // of the (very frequent) mousemove events. The target element only
      // actually changes a fraction as often as mousemove fires while
      // hovering the same element, so skip the walk unless it changed.
      if (event.target === lastTargetRef.current) return;
      lastTargetRef.current = event.target;

      const target = event.target as HTMLElement;
      const isInteractive = Boolean(target.closest?.('a, button, input, textarea, [role="button"]'));
      setIsPointerOverInteractive((prev) => (prev === isInteractive ? prev : isInteractive));
    };

    window.addEventListener('mousemove', handleMove, { passive: true });
    return () => {
      document.body.classList.remove('custom-cursor-active');
      window.removeEventListener('mousemove', handleMove);
    };
  }, [active, cursorX, cursorY]);

  if (!active) return null;

  return (
    <>
      {/*
       * Deliberately not using mix-blend-mode here (it used to be an
       * invert-style "difference" blend). Blend modes force the browser
       * to resample whatever is underneath every single frame the element
       * moves, which is expensive precisely while the mouse is moving —
       * i.e. constantly. A plain accent-colored ring with a soft glow
       * gets a similarly custom look without that cost.
       */}
      <motion.div
        ref={containerRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[70] will-change-transform"
        style={{ x: springX, y: springY, translateX: '-50%', translateY: '-50%' }}
      >
        <motion.div
          animate={{ scale: isPointerOverInteractive ? 1.8 : 1 }}
          transition={{ duration: 0.2 }}
          className="h-6 w-6 rounded-full border-2 border-accent-cyan/80 shadow-glow-cyan"
        />
      </motion.div>
      <button
        type="button"
        onClick={() => setCursorDisabled(true)}
        className="fixed bottom-6 left-5 z-40 hidden rounded-full border border-border-strong bg-bg-secondary/80 px-3 py-1.5 text-xs text-text-muted backdrop-blur-md hover:text-text-main lg:block"
      >
        Disable custom cursor
      </button>
    </>
  );
}
