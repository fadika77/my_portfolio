import { Layers, Target, Sparkles, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { profile } from '@/data/profile';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/common/SectionHeading';
import { RevealOnScroll } from '@/components/animations/RevealOnScroll';
import { ValueCard } from './ValueCard';
import { staggerContainer, slideInLeft, slideInRight } from '@/components/animations/variants';
import { motion } from 'framer-motion';

const ICONS = [Layers, Target, Sparkles, Users];

export function AboutSection() {
  return (
    <section id="about" className="relative py-24 sm:py-32" aria-labelledby="about-heading">
      <Container>
        <SectionHeading eyebrow="About Me" title="A graduate who likes building whole products." id="about-heading" />

        <div className="mt-10 grid gap-12 lg:grid-cols-[1.4fr_1fr]">
          <div className="space-y-5">
            {profile.aboutParagraphs.map((paragraph, index) => (
              <RevealOnScroll key={index} delay={index * 0.08} variants={slideInLeft} once={false}>
                <p className="text-pretty text-base leading-relaxed text-text-muted sm:text-lg">
                  {paragraph}
                </p>
              </RevealOnScroll>
            ))}
            <RevealOnScroll delay={0.2} variants={slideInLeft} once={false}>
              <Link
                to="/about"
                className="inline-flex items-center gap-1.5 pt-2 text-sm font-semibold text-accent hover:text-accent-cyan"
              >
                Read the full story →
              </Link>
            </RevealOnScroll>
          </div>

          <RevealOnScroll className="glass-panel h-fit p-6" delay={0.1} variants={slideInRight} once={false}>
            <p className="mb-4 font-mono text-xs uppercase tracking-widest text-text-muted">
              Personal info
            </p>
            <dl className="space-y-3 text-sm">
              <div className="flex justify-between gap-4">
                <dt className="text-text-muted">Name</dt>
                <dd className="text-right text-text-main">{profile.name}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-text-muted">Location</dt>
                <dd className="text-right text-text-main">{profile.location}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-text-muted">Degree</dt>
                <dd className="text-right text-text-main">{profile.degree}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-text-muted">Graduation</dt>
                <dd className="text-right text-text-main">{profile.graduationYear}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-text-muted">GPA</dt>
                <dd className="text-right text-text-main">{profile.gpa}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-text-muted">Languages</dt>
                <dd className="text-right text-text-main">Arabic, Hebrew, English</dd>
              </div>
            </dl>
          </RevealOnScroll>
        </div>

        <motion.div
          variants={staggerContainer(0.08)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
        >
          {profile.whatIBring.map((item, index) => (
            <ValueCard
              key={item.title}
              icon={ICONS[index % ICONS.length]}
              title={item.title}
              description={item.description}
            />
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
