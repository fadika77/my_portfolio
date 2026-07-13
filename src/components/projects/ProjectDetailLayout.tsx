import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { Github, ExternalLink, ArrowLeft, ArrowRight, Mail } from 'lucide-react';
import type { Project } from '@/types';
import { getAdjacentProjects } from '@/data/projects';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { TechBadge } from './TechBadge';
import { ProjectMockup } from './ProjectMockup';
import { ProjectGallery } from './ProjectGallery';
import { ArchitectureDiagram } from './ArchitectureDiagram';
import { RevealOnScroll } from '@/components/animations/RevealOnScroll';

function DetailBlock({ title, children }: { title: string; children: ReactNode }) {
  return (
    <RevealOnScroll className="border-t border-border py-10 first:border-t-0 first:pt-0">
      <h2 className="font-heading text-2xl font-semibold text-text-main">{title}</h2>
      <div className="mt-4 space-y-3 text-base leading-relaxed text-text-muted">{children}</div>
    </RevealOnScroll>
  );
}

export function ProjectDetailLayout({ project }: { project: Project }) {
  const { previous, next } = getAdjacentProjects(project.slug);

  return (
    <>
      <section className="relative pb-8 pt-32 sm:pt-40">
        <Container>
          <RevealOnScroll>
            <Link
              to="/projects"
              className="inline-flex items-center gap-1.5 text-sm text-text-muted hover:text-text-main"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              All projects
            </Link>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <span className="font-mono text-sm text-text-muted">{project.year}</span>
              <span className="rounded-full border border-border px-3 py-1 text-xs text-text-muted">
                {project.category}
              </span>
            </div>

            <h1 className="mt-4 text-balance font-heading text-4xl font-bold text-text-main sm:text-5xl">
              {project.name}
            </h1>
            <p className="mt-4 max-w-2xl text-pretty text-lg text-text-muted">
              {project.shortDescription}
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              {project.githubUrl && (
                <Button as="a" href={project.githubUrl} target="_blank" rel="noreferrer noopener" variant="secondary">
                  <Github className="h-4 w-4" aria-hidden="true" />
                  View Code
                </Button>
              )}
              {project.liveUrl && (
                <Button as="a" href={project.liveUrl} target="_blank" rel="noreferrer noopener" variant="secondary">
                  <ExternalLink className="h-4 w-4" aria-hidden="true" />
                  Live Demo
                </Button>
              )}
            </div>
          </RevealOnScroll>
        </Container>
      </section>

      <section className="py-8">
        <Container>
          <RevealOnScroll>
            <ProjectMockup project={project} className="mx-auto max-w-3xl" />
          </RevealOnScroll>
        </Container>
      </section>

      <section className="py-8">
        <Container className="grid gap-12 lg:grid-cols-[0.7fr_1.3fr]">
          <RevealOnScroll className="space-y-6 lg:sticky lg:top-28 lg:self-start">
            <div className="glass-panel p-6">
              <p className="mb-3 font-mono text-xs uppercase tracking-widest text-text-muted">
                Project details
              </p>
              <dl className="space-y-3 text-sm">
                <div className="flex justify-between gap-3">
                  <dt className="text-text-muted">My role</dt>
                  <dd className="text-right text-text-main">{project.role}</dd>
                </div>
                <div className="flex justify-between gap-3">
                  <dt className="text-text-muted">Type</dt>
                  <dd className="text-right text-text-main">{project.projectType}</dd>
                </div>
                <div className="flex justify-between gap-3">
                  <dt className="text-text-muted">Year</dt>
                  <dd className="text-right text-text-main">{project.year}</dd>
                </div>
              </dl>
            </div>

            <div className="glass-panel p-6">
              <p className="mb-3 font-mono text-xs uppercase tracking-widest text-text-muted">
                Technology stack
              </p>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <TechBadge key={tech} label={tech} />
                ))}
              </div>
            </div>
          </RevealOnScroll>

          <div>
            <DetailBlock title="Overview">
              {project.longDescription.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </DetailBlock>

            <DetailBlock title="The Problem">
              <p>{project.problem}</p>
            </DetailBlock>

            <DetailBlock title="The Solution">
              <p>{project.solution}</p>
            </DetailBlock>

            <DetailBlock title="Key Features">
              <ul className="grid gap-2 sm:grid-cols-2">
                {project.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-sm">
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-accent-cyan" />
                    {feature}
                  </li>
                ))}
              </ul>
            </DetailBlock>

            <DetailBlock title="User Flow">
              <ol className="space-y-2">
                {project.userFlow.map((step, index) => (
                  <li key={step} className="flex gap-3 text-sm">
                    <span className="font-mono text-accent-cyan">{String(index + 1).padStart(2, '0')}</span>
                    {step}
                  </li>
                ))}
              </ol>
            </DetailBlock>

            <DetailBlock title="Architecture">
              <ArchitectureDiagram project={project} />
            </DetailBlock>

            <DetailBlock title="Technical Decisions">
              <ul className="space-y-2">
                {project.technicalDecisions.map((decision) => (
                  <li key={decision} className="flex items-start gap-2 text-sm">
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-accent" />
                    {decision}
                  </li>
                ))}
              </ul>
            </DetailBlock>

            <DetailBlock title="What I Learned">
              <p>{project.lessonsLearned}</p>
            </DetailBlock>

            <DetailBlock title="Next Improvements">
              <ul className="space-y-2">
                {project.nextImprovements.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm">
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-accent-purple" />
                    {item}
                  </li>
                ))}
              </ul>
            </DetailBlock>

            <DetailBlock title="Gallery">
              <ProjectGallery project={project} />
            </DetailBlock>
          </div>
        </Container>
      </section>

      <section className="border-t border-border py-14">
        <Container>
          <div className="grid gap-4 sm:grid-cols-2">
            {previous && (
              <Link
                to={`/projects/${previous.slug}`}
                className="glass-panel flex items-center gap-3 p-5 transition-colors hover:border-accent/50"
              >
                <ArrowLeft className="h-4 w-4 text-text-muted" aria-hidden="true" />
                <div>
                  <p className="text-xs text-text-muted">Previous</p>
                  <p className="font-heading text-base font-semibold text-text-main">{previous.name}</p>
                </div>
              </Link>
            )}
            {next && (
              <Link
                to={`/projects/${next.slug}`}
                className="glass-panel flex items-center justify-end gap-3 p-5 text-right transition-colors hover:border-accent/50 sm:col-start-2"
              >
                <div>
                  <p className="text-xs text-text-muted">Next</p>
                  <p className="font-heading text-base font-semibold text-text-main">{next.name}</p>
                </div>
                <ArrowRight className="h-4 w-4 text-text-muted" aria-hidden="true" />
              </Link>
            )}
          </div>

          <RevealOnScroll className="glass-panel mt-6 flex flex-col items-center gap-4 p-8 text-center">
            <h3 className="font-heading text-xl font-semibold text-text-main">
              Interested in working together?
            </h3>
            <Button as="a" href="/contact">
              <Mail className="h-4 w-4" aria-hidden="true" />
              Contact Me
            </Button>
          </RevealOnScroll>
        </Container>
      </section>
    </>
  );
}