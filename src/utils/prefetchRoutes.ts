/**
 * Warms the browser's module cache for every lazy-loaded page shortly after
 * the app has finished its own initial mount.
 *
 * Without this, the *first* time a user clicks to a route they haven't
 * visited yet, React Router has to wait on a fresh network request for that
 * page's JS chunk before it can render anything — which is exactly the kind
 * of stutter "moving from page to page" complaints describe, even though
 * nothing about the transition animation itself is slow.
 *
 * These are the same dynamic `import()` calls React.lazy() already uses in
 * App.tsx, just invoked directly (not inside lazy()) so the chunk is fetched
 * and cached without mounting anything. Calling import() a second time later
 * (which is what lazy() does when the route actually renders) is a cache
 * hit, not a second network request.
 */
export function prefetchRoutes(): void {
  const prefetch = () => {
    void import('@/pages/Home');
    void import('@/pages/Projects');
    void import('@/pages/ProjectDetail');
    void import('@/pages/About');
    void import('@/pages/Contact');
    void import('@/pages/NotFound');
  };

  // Defer until the browser is idle (and off the critical path of the very
  // first paint) — falls back to a short timeout in browsers/environments
  // without requestIdleCallback (notably Safari).
  if (typeof window === 'undefined') return;
  const ric = window.requestIdleCallback;
  if (typeof ric === 'function') {
    ric(prefetch, { timeout: 2000 });
  } else {
    window.setTimeout(prefetch, 1200);
  }
}
