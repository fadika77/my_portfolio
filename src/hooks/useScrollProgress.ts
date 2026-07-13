import { useEffect, useRef, useState } from 'react';

/**
 * Returns scroll progress of the whole document as a 0–1 value.
 *
 * Two perf traps this avoids: reading `scrollHeight` inside the scroll
 * handler forces a synchronous layout on every single scroll tick, and
 * calling `setState` that often re-renders the consuming component just
 * as often. Document height is measured once and re-measured only via
 * ResizeObserver (i.e. when the page's content actually changes size),
 * and the scroll handler itself is throttled to at most once per
 * animation frame.
 */
export function useScrollProgress(): number {
  const [progress, setProgress] = useState(0);
  const docHeightRef = useRef(0);
  const tickingRef = useRef(false);

  useEffect(() => {
    const measure = () => {
      docHeightRef.current = document.documentElement.scrollHeight - window.innerHeight;
    };
    measure();

    const updateProgress = () => {
      const docHeight = docHeightRef.current;
      setProgress(docHeight > 0 ? Math.min(1, window.scrollY / docHeight) : 0);
      tickingRef.current = false;
    };

    const handleScroll = () => {
      if (tickingRef.current) return;
      tickingRef.current = true;
      window.requestAnimationFrame(updateProgress);
    };

    const resizeObserver = new ResizeObserver(measure);
    resizeObserver.observe(document.body);

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', measure, { passive: true });
    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', measure);
    };
  }, []);

  return progress;
}
