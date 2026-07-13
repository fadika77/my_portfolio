import { ImageOff } from 'lucide-react';
import type { Project } from '@/types';
import { ProjectMockup } from './ProjectMockup';

export function ProjectGallery({ project }: { project: Project }) {
  return (
    <div className="grid gap-5 sm:grid-cols-2">
      <ProjectMockup project={project} className="sm:col-span-2" />
      {project.screenshots.map((path, index) => (
        <div
          key={path}
          className="glass-panel flex aspect-video flex-col items-center justify-center gap-2 p-4 text-center"
        >
          <ImageOff className="h-6 w-6 text-text-muted" aria-hidden="true" />
          <p className="text-xs text-text-muted">
            Screenshot {index + 1} — place an image at
            <br />
            <code className="text-accent-cyan">{path}</code>
          </p>
        </div>
      ))}
    </div>
  );
}
