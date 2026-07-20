import type { Variants } from 'framer-motion';

// Overshoot ease — the curve dips slightly past 1 before settling, which
// reads as a small, deliberate "bounce" on arrival. Used for the more
// dramatic entrances (directional slides, the CTA pop) rather than every
// reveal on the site, so it stays a highlight instead of becoming noise.
const DRAMATIC_EASE = [0.16, 1.1, 0.3, 1] as const;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 34, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    // Section-reveal duration kept inside the ~350-550ms range: long enough
    // to read as a deliberate, polished motion, short enough that content
    // doesn't feel like it's still "arriving" while you're already scrolling
    // past it.
    transition: { duration: 0.5, ease: DRAMATIC_EASE },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5, ease: 'easeOut' } },
};

export const staggerContainer = (stagger = 0.12, delayChildren = 0): Variants => ({
  hidden: {},
  visible: {
    transition: {
      staggerChildren: stagger,
      delayChildren,
    },
  },
});

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.94 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

// Dramatic directional entrances — travel in from the side, scale up from
// slightly small, a hint of rotation, and a transient blur that clears as
// the element settles. `filter` and `transform` are both GPU-cheap
// (composited) properties, so this stays smooth even on lower-end devices.
export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -140, scale: 0.92, rotate: -3, filter: 'blur(6px)' },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    rotate: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.7, ease: DRAMATIC_EASE },
  },
};

export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 140, scale: 0.92, rotate: 3, filter: 'blur(6px)' },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    rotate: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.7, ease: DRAMATIC_EASE },
  },
};

// A bigger "pop" for standalone hero-style blocks like the closing CTA band —
// rises further, scales up more, and clears a heavier blur on the way in.
export const dramaticPop: Variants = {
  hidden: { opacity: 0, y: 50, scale: 0.9, filter: 'blur(6px)' },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: 'blur(0px)',
    transition: { duration: 0.7, ease: DRAMATIC_EASE },
  },
};
