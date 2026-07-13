import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { projects } from '@/data/projects';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/common/SectionHeading';
import { ProjectCard } from '@/components/projects/ProjectCard';
import { RevealOnScroll } from '@/components/animations/RevealOnScroll';

export function FeaturedProjects() {
  const featured = projects.filter((project) => project.featured);

  return (
    <section id="projects" className="relative py-24 sm:py-32" aria-labelledby="projects-heading">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow="Featured Work"
            title="Software built end to end, not just styled."
            description="Four projects spanning web, mobile, backend, and AI — each one a complete product with real architecture decisions behind it."
            id="projects-heading"
          />
          <RevealOnScroll>
            <Link
              to="/projects"
              className="inline-flex items-center gap-1.5 whitespace-nowrap text-sm font-semibold text-accent hover:text-accent-cyan"
            >
              View all projects <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </RevealOnScroll>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {featured.map((project, index) => (
            <ProjectCard key={project.slug} project={project} delay={index * 0.08} />
          ))}
        </div>
      </Container>
    </section>
  );
}
