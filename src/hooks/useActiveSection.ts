import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Observes a set of section elements (by id) and reports which one is
 * currently most visible, for navbar active-link highlighting.
 *
 * Re-queries the DOM whenever the route changes, since the Home page's
 * sections are unmounted/remounted as the user navigates away and back —
 * without that, a stale IntersectionObserver would keep watching detached
 * nodes and highlighting would silently stop working.
 */
export function useActiveSection(sectionIds: string[]): string {
  const [activeId, setActiveId] = useState(sectionIds[0] ?? '');
  const { pathname } = useLocation();

  useEffect(() => {
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: '-30% 0px -55% 0px', threshold: [0, 0.25, 0.5, 0.75, 1] },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sectionIds, pathname]);

  return activeId;
}
