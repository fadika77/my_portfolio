import { Compass, Users2, Wrench, Eye, MessageSquare, TrendingUp } from 'lucide-react';
import { profile } from '@/data/profile';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/common/SectionHeading';
import { RevealOnScroll } from '@/components/animations/RevealOnScroll';

const ICONS = [Compass, Users2, Wrench, Eye, MessageSquare, TrendingUp];

export function WorkingStyle() {
  return (
    <section className="relative py-24 sm:py-32" aria-labelledby="working-style-heading">
      <Container>
        <SectionHeading eyebrow="Beyond the Tech Stack" title="How I work with a team." id="working-style-heading" />

        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-6">
          {profile.workingStyleTraits.map((trait, index) => (
            <RevealOnScroll
              key={trait.title}
              delay={index * 0.06}
              className={index === 0 || index === 3 ? 'lg:col-span-3' : 'lg:col-span-3'}
            >
              <div className="glass-panel flex h-full items-start gap-4 p-6 transition-transform duration-300 hover:-translate-y-1">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white/[0.04] text-accent-cyan">
                  {(() => {
                    const Icon = ICONS[index % ICONS.length];
                    return <Icon className="h-5 w-5" aria-hidden="true" />;
                  })()}
                </div>
                <div>
                  <h3 className="font-heading text-base font-semibold text-text-main">{trait.title}</h3>
                  <p className="mt-1 text-sm text-text-muted">{trait.description}</p>
                </div>
              </div>
            </RevealOnScroll>
          ))}

          <RevealOnScroll delay={0.4} className="sm:col-span-2 lg:col-span-6">
            <div className="glass-panel p-6">
              <p className="mb-4 font-mono text-xs uppercase tracking-widest text-accent-cyan">
                Currently exploring
              </p>
              <div className="flex flex-wrap gap-2">
                {profile.currentlyExploring.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-border bg-white/[0.03] px-3.5 py-1.5 text-sm text-text-main"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </Container>
    </section>
  );
}
