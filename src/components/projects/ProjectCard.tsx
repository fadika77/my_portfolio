import { useRef, type MouseEvent } from 'react';
import { Link } from 'react-router-dom';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { Github, ArrowUpRight, Sparkles } from 'lucide-react';
import type { Project } from '@/types';
import { ProjectMockup } from './ProjectMockup';
import { TechBadge } from './TechBadge';
import { RevealOnScroll } from '@/components/animations/RevealOnScroll';
import { useMotionPreference } from '@/providers/ReducedMotionProvider';
import { useIsTouchDevice } from '@/hooks/useMediaQuery';
import { cn } from '@/utils/cn';

const ACCENT_BORDER: Record<Project['accent'], string> = {
  blue: 'hover:border-accent/60',
  cyan: 'hover:border-accent-cyan/60',
  purple: 'hover:border-accent-purple/60',
  green: 'hover:border-success/60',
};

export function ProjectCard({ project, delay = 0 }: { project: Project; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { reduceMotion } = useMotionPreference();
  const isTouch = useIsTouchDevice();
  const enableTilt = !reduceMotion && !isTouch;

  // Motion values instead of React state: the tilt updates on every
  // mousemove pixel, and writing that through setState would re-render
  // this entire card (mockup, badges, links, and all) dozens of times a
  // second. Motion values write straight to the element's transform
  // outside React's render cycle, so the card itself never re-renders.
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springRotateX = useSpring(rotateX, { stiffness: 200, damping: 20 });
  const springRotateY = useSpring(rotateY, { stiffness: 200, damping: 20 });

  const handleMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    if (!enableTilt || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width - 0.5;
    const py = (event.clientY - rect.top) / rect.height - 0.5;
    rotateX.set(py * -6);
    rotateY.set(px * 6);
  };

  const handleMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <RevealOnScroll delay={delay} className="h-full">
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX: springRotateX, rotateY: springRotateY, transformStyle: 'preserve-3d' }}
        className={cn(
          'group glass-panel flex h-full flex-col overflow-hidden transition-colors duration-300',
          ACCENT_BORDER[project.accent],
        )}
      >
        <Link to={`/projects/${project.slug}`} className="block" aria-label={`View ${project.name} case study`}>
          <ProjectMockup project={project} className="rounded-none border-0 border-b border-border" />
        </Link>

        <div className="flex flex-1 flex-col p-6">
          <div className="mb-2 flex items-center justify-between gap-2">
            <span className="font-mono text-xs text-text-muted">{project.year}</span>
            <span className="rounded-full border border-border px-2.5 py-0.5 text-[11px] text-text-muted">
              {project.category}
            </span>
          </div>

          <h3 className="font-heading text-xl font-semibold text-text-main">
            <Link to={`/projects/${project.slug}`} className="transition-colors group-hover:text-accent-cyan">
              {project.name}
            </Link>
          </h3>

          <p className="mt-2 text-sm text-text-muted">{project.shortDescription}</p>

          <div className="mt-3 flex items-start gap-2 rounded-lg border border-border bg-white/[0.02] p-2.5">
            <Sparkles className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent-cyan" aria-hidden="true" />
            <p className="text-xs text-text-muted">{project.highlightFeature}</p>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {project.technologies.slice(0, 4).map((tech) => (
              <TechBadge key={tech} label={tech} />
            ))}
            {project.technologies.length > 4 && (
              <span className="px-1 py-1 text-xs text-text-muted">
                +{project.technologies.length - 4} more
              </span>
            )}
          </div>

          <div className="mt-6 flex items-center gap-3">
            <Link
              to={`/projects/${project.slug}`}
              className="inline-flex items-center gap-1.5 rounded-full bg-white/[0.06] px-4 py-2 text-sm font-semibold text-text-main transition-colors hover:bg-white/[0.1]"
            >
              View Case Study
              <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center gap-1.5 rounded-full border border-border-strong px-4 py-2 text-sm text-text-muted transition-colors hover:text-text-main"
                aria-label={`${project.name} on GitHub`}
              >
                <Github className="h-3.5 w-3.5" aria-hidden="true" />
                Code
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </RevealOnScroll>
  );
}
