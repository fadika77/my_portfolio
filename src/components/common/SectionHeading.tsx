import { RevealOnScroll } from '@/components/animations/RevealOnScroll';
import { cn } from '@/utils/cn';

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
  id?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
  id,
}: SectionHeadingProps) {
  return (
    <RevealOnScroll className={cn('max-w-2xl', align === 'center' && 'mx-auto text-center')}>
      {eyebrow && (
        <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-accent-cyan">
          {eyebrow}
        </p>
      )}
      <h2
        id={id}
        className="text-balance font-heading text-3xl font-semibold text-text-main sm:text-4xl"
      >
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-pretty text-base text-text-muted sm:text-lg">{description}</p>
      )}
    </RevealOnScroll>
  );
}
