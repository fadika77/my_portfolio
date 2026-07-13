import { buildProcess } from '@/data/skills';
import { RevealOnScroll } from '@/components/animations/RevealOnScroll';

export function BuildProcess() {
  return (
    <div className="mt-16">
      <RevealOnScroll>
        <h3 className="font-heading text-xl font-semibold text-text-main">How I Build</h3>
      </RevealOnScroll>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {buildProcess.map((step, index) => (
          <RevealOnScroll key={step.step} delay={index * 0.06} className="relative">
            <div className="glass-panel h-full p-5">
              <span className="font-mono text-2xl font-bold text-transparent [-webkit-text-stroke:1px_theme(colors.accent.DEFAULT)]">
                {String(step.step).padStart(2, '0')}
              </span>
              <h4 className="mt-3 font-heading text-base font-semibold text-text-main">
                {step.title}
              </h4>
              <p className="mt-1.5 text-sm text-text-muted">{step.description}</p>
            </div>
          </RevealOnScroll>
        ))}
      </div>
    </div>
  );
}
