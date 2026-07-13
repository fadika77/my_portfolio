import { Languages as LanguagesIcon } from 'lucide-react';
import { languages } from '@/data/education';
import { RevealOnScroll } from '@/components/animations/RevealOnScroll';

export function LanguagesSection() {
  return (
    <div className="mt-16">
      <RevealOnScroll>
        <h3 className="font-heading text-xl font-semibold text-text-main">Languages</h3>
      </RevealOnScroll>

      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        {languages.map((lang, index) => (
          <RevealOnScroll key={lang.name} delay={index * 0.08}>
            <div className="glass-panel flex items-center gap-4 p-5 transition-transform duration-300 hover:-translate-y-1">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-border-strong bg-white/[0.04] font-mono text-sm font-semibold text-accent-cyan">
                {lang.code}
              </div>
              <div>
                <p className="font-heading text-base font-semibold text-text-main">{lang.name}</p>
                <p className="flex items-center gap-1.5 text-sm text-text-muted">
                  <LanguagesIcon className="h-3.5 w-3.5" aria-hidden="true" />
                  {lang.level}
                </p>
              </div>
            </div>
          </RevealOnScroll>
        ))}
      </div>
    </div>
  );
}
