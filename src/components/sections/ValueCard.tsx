import type { LucideIcon } from 'lucide-react';
import { RevealOnScroll } from '@/components/animations/RevealOnScroll';
import { SpotlightCard } from '@/components/common/SpotlightCard';

interface ValueCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  delay?: number;
}

export function ValueCard({ icon: Icon, title, description, delay = 0 }: ValueCardProps) {
  return (
    <RevealOnScroll delay={delay}>
      <SpotlightCard className="h-full p-6 transition-transform duration-300 hover:-translate-y-1">
        <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-accent/20 to-accent-purple/20 text-accent-cyan">
          <Icon className="h-5 w-5" aria-hidden="true" />
        </div>
        <h3 className="font-heading text-lg font-semibold text-text-main">{title}</h3>
        <p className="mt-2 text-sm text-text-muted">{description}</p>
      </SpotlightCard>
    </RevealOnScroll>
  );
}
