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
}

/** Wraps content so it animates in once when it scrolls into view. */
export function RevealOnScroll({
  children,
  variants = fadeUp,
  className,
  delay = 0,
  as = 'div',
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
      viewport={{ once: true, margin: '-80px' }}
      variants={variants}
      transition={{ delay }}
    >
      {children}
    </MotionTag>
  );
}
