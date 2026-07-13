import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Search, MapPin, CalendarCheck, BookOpen, Wrench, Leaf } from 'lucide-react';
import type { Project } from '@/types';
import { useMotionPreference } from '@/providers/ReducedMotionProvider';
import { cn } from '@/utils/cn';

const ACCENT_GRADIENTS: Record<Project['accent'], string> = {
  blue: 'from-accent/25 via-accent/5 to-transparent',
  cyan: 'from-accent-cyan/25 via-accent-cyan/5 to-transparent',
  purple: 'from-accent-purple/25 via-accent-purple/5 to-transparent',
  green: 'from-success/25 via-success/5 to-transparent',
};

const ACCENT_TEXT: Record<Project['accent'], string> = {
  blue: 'text-accent',
  cyan: 'text-accent-cyan',
  purple: 'text-accent-purple',
  green: 'text-success',
};

function BrowserChrome({ children, accent }: { children: ReactNode; accent: Project['accent'] }) {
  return (
    <div className="relative overflow-hidden rounded-xl border border-border-strong bg-bg-secondary/80">
      <div className="flex items-center gap-2 border-b border-border px-3 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-danger/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#f5c451]/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-success/70" />
        <div className={cn('ml-3 h-5 flex-1 rounded-md bg-white/[0.04]', ACCENT_TEXT[accent])} />
      </div>
      <div className="p-4">{children}</div>
    </div>
  );
}

function MendlyMockup({ accent }: { accent: Project['accent'] }) {
  const { reduceMotion } = useMotionPreference();
  return (
    <div className="relative flex justify-center py-4">
      <div className="relative w-44 rounded-[2rem] border border-border-strong bg-bg-secondary/90 p-3 shadow-card">
        <div className="mx-auto mb-3 h-1.5 w-10 rounded-full bg-white/10" />
        <div className="rounded-xl bg-white/[0.03] p-3">
          <p className="font-mono text-[10px] text-text-muted">Today&apos;s mood</p>
          <div className="mt-2 flex items-end gap-1.5">
            {/*
             * These bars used to animate the `height` CSS property directly.
             * `height` is a layout property — animating it forces the browser
             * to recompute the flex layout of this row on every single frame,
             * for all 7 bars, forever, any time this card is mounted (which,
             * since it's the Mendly project's card, is on both the homepage
             * and the projects grid). That's a real, continuous cause of
             * scroll jank whenever this card is on screen.
             *
             * Fix: give each bar its fixed, final height up front and animate
             * `scaleY` (a transform) instead, anchored to the bottom via
             * `transformOrigin`. Visually it's the same "growing bar" pulse,
             * but scaling a layer is compositor-only work — no layout, no
             * repaint of anything else in the row.
             */}
            {[8, 14, 10, 18, 12, 20, 16].map((h, i) => {
              const fullHeight = h * 2 + 6;
              const restScale = (h * 2) / fullHeight;
              return (
                <motion.span
                  key={i}
                  className="w-2.5 origin-bottom rounded-full bg-gradient-to-t from-accent-purple to-accent-cyan will-change-transform"
                  style={{ height: `${fullHeight}px` }}
                  animate={
                    reduceMotion ? undefined : { scaleY: [restScale, 1, restScale] }
                  }
                  transition={{ duration: 2.4, repeat: Infinity, delay: i * 0.15 }}
                />
              );
            })}
          </div>
          <div className="mt-4 flex items-center gap-2 rounded-lg bg-white/[0.04] p-2">
            <MessageCircle className={cn('h-3.5 w-3.5', ACCENT_TEXT[accent])} aria-hidden="true" />
            <span className="font-mono text-[9px] text-text-muted">AI check-in ready</span>
          </div>
        </div>
      </div>
      <div className="absolute -right-2 top-6 hidden w-32 rounded-xl border border-border-strong bg-bg-secondary/90 p-3 shadow-card sm:block">
        <p className="font-mono text-[9px] text-text-muted">Book session</p>
        <p className="mt-1 text-[11px] text-text-main">Dr. A. Cohen</p>
        <p className="text-[10px] text-text-muted">Thu · 14:00</p>
      </div>
    </div>
  );
}

function LibraryMockup({ accent }: { accent: Project['accent'] }) {
  return (
    <BrowserChrome accent={accent}>
      <div className="mb-3 flex items-center gap-2 rounded-lg border border-border bg-white/[0.03] px-3 py-1.5">
        <Search className="h-3.5 w-3.5 text-text-muted" aria-hidden="true" />
        <span className="font-mono text-[10px] text-text-muted">Search catalog…</span>
      </div>
      <div className="grid grid-cols-4 gap-2">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="aspect-[2/3] rounded-md bg-gradient-to-br from-accent/25 to-transparent" />
        ))}
      </div>
      <div className="mt-3 flex items-center gap-2 text-[10px] text-text-muted">
        <BookOpen className={cn('h-3.5 w-3.5', ACCENT_TEXT[accent])} aria-hidden="true" />
        128 titles available
      </div>
    </BrowserChrome>
  );
}

function HouseFixMockup({ accent }: { accent: Project['accent'] }) {
  return (
    <BrowserChrome accent={accent}>
      <div className="grid grid-cols-[1fr_1fr] gap-3">
        <div className="space-y-2">
          {['Open', 'In progress', 'Completed'].map((status, i) => (
            <div key={status} className="rounded-lg border border-border bg-white/[0.03] p-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-text-main">Ticket #{204 + i}</span>
                <Wrench className={cn('h-3 w-3', ACCENT_TEXT[accent])} aria-hidden="true" />
              </div>
              <p className="mt-1 text-[9px] text-text-muted">{status}</p>
            </div>
          ))}
        </div>
        <div className="relative overflow-hidden rounded-lg border border-border bg-white/[0.03]">
          <div className="absolute inset-0 bg-grid-pattern bg-[size:14px_14px] opacity-30" />
          <MapPin className={cn('absolute left-1/3 top-1/3 h-4 w-4', ACCENT_TEXT[accent])} aria-hidden="true" />
          <MapPin className="absolute right-1/4 bottom-1/4 h-4 w-4 text-text-muted" aria-hidden="true" />
        </div>
      </div>
    </BrowserChrome>
  );
}

function GreenPointsMockup({ accent }: { accent: Project['accent'] }) {
  return (
    <BrowserChrome accent={accent}>
      <div className="grid grid-cols-2 gap-2">
        {['River Cleanup', 'Tree Planting', 'Awareness Walk', 'Recycling Drive'].map((title) => (
          <div key={title} className="rounded-lg border border-border bg-white/[0.03] p-2.5">
            <Leaf className={cn('mb-1.5 h-3.5 w-3.5', ACCENT_TEXT[accent])} aria-hidden="true" />
            <p className="text-[10px] font-medium text-text-main">{title}</p>
            <div className="mt-1.5 flex items-center gap-1 text-[9px] text-text-muted">
              <CalendarCheck className="h-3 w-3" aria-hidden="true" />
              12 joined
            </div>
          </div>
        ))}
      </div>
    </BrowserChrome>
  );
}

const MOCKUPS: Record<string, (props: { accent: Project['accent'] }) => JSX.Element> = {
  mendly: MendlyMockup,
  'library-of-books': LibraryMockup,
  housefix: HouseFixMockup,
  'green-points': GreenPointsMockup,
};

export function ProjectMockup({ project, className }: { project: Project; className?: string }) {
  const MockupComponent = MOCKUPS[project.slug] ?? LibraryMockup;

  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-2xl border border-border bg-gradient-to-br p-5',
        ACCENT_GRADIENTS[project.accent],
        className,
      )}
    >
      <MockupComponent accent={project.accent} />
    </div>
  );
}
