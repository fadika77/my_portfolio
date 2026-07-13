import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/** Smoothly scrolls to the element matching the current URL hash. */
export function useHashScroll() {
  const { hash, pathname } = useLocation();

  useEffect(() => {
    if (!hash) return;
    const id = hash.replace('#', '');
    // Wait a tick for the route/content to render before measuring.
    const timeout = window.setTimeout(() => {
      const el = document.getElementById(id);
      el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 80);
    return () => window.clearTimeout(timeout);
  }, [hash, pathname]);
}
