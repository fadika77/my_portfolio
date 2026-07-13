import { skillCategories } from '@/data/skills';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/common/SectionHeading';
import { SkillCategory } from './SkillCategory';
import { BuildProcess } from './BuildProcess';

export function SkillsSection() {
  return (
    <section id="skills" className="relative py-24 sm:py-32" aria-labelledby="skills-heading">
      <Container>
        <SectionHeading
          eyebrow="Skills & Technologies"
          title="A toolkit built for full-stack, real-world work."
          description="Organized by where each skill sits in the stack — not a percentage bar in sight."
          id="skills-heading"
        />

        <div className="mt-12 grid gap-5 sm:grid-cols-2">
          {skillCategories.map((category, index) => (
            <SkillCategory key={category.id} category={category} delay={index * 0.08} />
          ))}
        </div>

        <BuildProcess />
      </Container>
    </section>
  );
}
