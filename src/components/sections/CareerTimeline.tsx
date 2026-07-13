import { motion } from 'framer-motion';
import { profile } from '@/data/profile';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/common/SectionHeading';
import { RevealOnScroll } from '@/components/animations/RevealOnScroll';
import { cn } from '@/utils/cn';

export function CareerTimeline() {
  return (
    <section className="relative py-24 sm:py-32" aria-labelledby="timeline-heading">
      <Container>
        <SectionHeading eyebrow="Career Journey" title="From first semester to first role." id="timeline-heading" />

        <div className="relative mt-14 pl-8 sm:pl-10">
          <div className="absolute bottom-0 left-3 top-0 w-px bg-gradient-to-b from-accent via-accent-cyan to-transparent sm:left-4" />

          <ul className="space-y-10">
            {profile.careerTimeline.map((event, index) => (
              <RevealOnScroll key={event.year} as="li" delay={index * 0.08} className="relative">
                <span
                  className={cn(
                    'absolute -left-8 top-1 flex h-6 w-6 items-center justify-center rounded-full border-2 sm:-left-10',
                    event.isNext
                      ? 'border-accent-cyan bg-bg-primary shadow-glow-cyan'
                      : 'border-accent bg-bg-primary',
                  )}
                >
                  {event.isNext && (
                    <motion.span
                      className="h-2.5 w-2.5 rounded-full bg-accent-cyan"
                      animate={{ opacity: [0.4, 1, 0.4], scale: [0.9, 1.15, 0.9] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  )}
                  {!event.isNext && <span className="h-2.5 w-2.5 rounded-full bg-accent" />}
                </span>

                <div className={cn('glass-panel p-5', event.isNext && 'border-accent-cyan/40')}>
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="font-mono text-sm font-semibold text-accent-cyan">{event.year}</span>
                    <h3 className="font-heading text-base font-semibold text-text-main">{event.title}</h3>
                  </div>
                  <p className="mt-1.5 text-sm text-text-muted">{event.description}</p>
                </div>
              </RevealOnScroll>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
