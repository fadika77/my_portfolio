import { GraduationCap } from 'lucide-react';
import { education } from '@/data/education';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/common/SectionHeading';
import { RevealOnScroll } from '@/components/animations/RevealOnScroll';
import { LanguagesSection } from './LanguagesSection';

export function EducationTimeline() {
  return (
    <section id="education" className="relative py-24 sm:py-32" aria-labelledby="education-heading">
      <Container>
        <SectionHeading eyebrow="Education" title="Four years, one degree, many projects." id="education-heading" />

        <div className="mt-12 space-y-6">
          {education.map((entry) => (
            <RevealOnScroll key={entry.institution}>
              <div className="glass-panel relative overflow-hidden p-6 sm:p-8">
                <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-accent/10 blur-3xl" aria-hidden="true" />
                <div className="relative flex flex-col gap-6 sm:flex-row sm:items-start">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-accent/20 to-accent-purple/20 text-accent-cyan">
                    <GraduationCap className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <h3 className="font-heading text-xl font-semibold text-text-main">
                        {entry.institution}
                      </h3>
                      <span className="font-mono text-sm text-text-muted">
                        {entry.startYear} – {entry.endYear}
                      </span>
                    </div>
                    <p className="mt-1 text-base text-accent-cyan">{entry.degree}</p>
                    <p className="mt-3 text-sm text-text-muted">{entry.description}</p>
                    <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-border bg-white/[0.03] px-3 py-1.5 font-mono text-xs text-text-main">
                      GPA: {entry.gpa}
                    </div>
                  </div>
                </div>
              </div>
            </RevealOnScroll>
          ))}
        </div>

        <LanguagesSection />
      </Container>
    </section>
  );
}
