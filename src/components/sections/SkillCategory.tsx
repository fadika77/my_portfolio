import { motion } from 'framer-motion';
import type { SkillCategory as SkillCategoryType } from '@/types';
import { RevealOnScroll } from '@/components/animations/RevealOnScroll';
import { staggerContainer, fadeUp } from '@/components/animations/variants';

export function SkillCategory({ category, delay = 0 }: { category: SkillCategoryType; delay?: number }) {
  return (
    <RevealOnScroll delay={delay} className="glass-panel h-full p-6">
      <h3 className="font-heading text-lg font-semibold text-text-main">{category.title}</h3>
      <p className="mt-1.5 text-sm text-text-muted">{category.description}</p>

      <motion.ul
        variants={staggerContainer(0.04)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="mt-5 flex flex-wrap gap-2"
      >
        {category.skills.map((skill) => (
          <motion.li
            key={skill}
            variants={fadeUp}
            whileHover={{ y: -3, scale: 1.04 }}
            className="cursor-default rounded-lg border border-border bg-white/[0.03] px-3 py-1.5 font-mono text-xs text-text-main transition-colors hover:border-accent/50 hover:bg-white/[0.07] hover:text-accent-cyan"
          >
            {skill}
          </motion.li>
        ))}
      </motion.ul>
    </RevealOnScroll>
  );
}
