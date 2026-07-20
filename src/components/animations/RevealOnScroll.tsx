import { motion, type Variants } from 'framer-motion';
import type { ReactNode } from 'react';
import { fadeUp } from './variants';
import { useMotionPreference } from '@/providers/ReducedMotionProvider';

interface RevealOnScrollProps {
  children: ReactNode;
  variants?: Variants;
  className?: string;
  delay?: number;
  as?: 'div' | 'section' | 'li';
  /**
   * When true (default), the element reveals once and stays visible —
   * matches every existing use of this component. Pass `false` to make it
   * two-way: the element animates back to its `hidden` variant when it
   * scrolls out of view, then plays the entrance again next time it comes
   * back — used for a handful of "dramatic" sections that should feel
   * alive as you scroll past them, not just on first arrival.
   */
  once?: boolean;
}

/** Wraps content so it animates in when it scrolls into view (once, or every time). */
export function RevealOnScroll({
  children,
  variants = fadeUp,
  className,
  delay = 0,
  as = 'div',
  once = true,
}: RevealOnScrollProps) {
  const { reduceMotion } = useMotionPreference();
  // Cast to a single component type — div/section/li all accept the same
  // className/children/motion props we actually use here, and this avoids
  // TypeScript treating the union of motion component types as unusable JSX.
  const MotionTag = motion[as] as typeof motion.div;

  if (reduceMotion) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: '-80px' }}
      variants={variants}
      transition={{ delay }}
    >
      {children}
    </MotionTag>
  );
}
