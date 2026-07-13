import { projects } from '@/data/projects';
import { SEO } from '@/components/common/SEO';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/common/SectionHeading';
import { ProjectCard } from '@/components/projects/ProjectCard';

export default function Projects() {
  return (
    <>
      <SEO
        title="Projects"
        path="/projects"
        description="Case studies of the web and mobile applications Fadi Kanaani has built, covering frontend, backend, databases, APIs, and AI integration."
      />
      <section className="relative py-32 sm:py-36">
        <Container>
          <SectionHeading
            eyebrow="Projects"
            title="Four products, four different problems."
            description="Each project below is a complete application — not a snippet or a school exercise — with its own architecture, trade-offs, and lessons learned."
          />

          <div className="mt-14 grid gap-6 sm:grid-cols-2">
            {projects.map((project, index) => (
              <ProjectCard key={project.slug} project={project} delay={index * 0.06} />
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
