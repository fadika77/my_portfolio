import { motion } from 'framer-motion';
import type { Project } from '@/types';
import { useMotionPreference } from '@/providers/ReducedMotionProvider';

export function ArchitectureDiagram({ project }: { project: Project }) {
  const { reduceMotion } = useMotionPreference();

  return (
    <div className="glass-panel p-6 sm:p-8" role="img" aria-label={`Architecture flow for ${project.name}: ${project.architecture.join(' to ')}`}>
      <div className="flex flex-col items-center gap-0">
        {project.architecture.map((layer, index) => (
          <div key={layer} className="flex flex-col items-center">
            <div className="rounded-xl border border-border-strong bg-white/[0.04] px-6 py-3 text-center font-mono text-sm text-text-main shadow-card">
              {layer}
            </div>
            {index < project.architecture.length - 1 && (
              <motion.div
                className="my-1 h-8 w-px bg-gradient-to-b from-accent to-accent-cyan"
                animate={reduceMotion ? undefined : { opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 1.6, repeat: Infinity, delay: index * 0.2 }}
                aria-hidden="true"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
