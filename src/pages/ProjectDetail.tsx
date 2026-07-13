import { useParams, Navigate } from 'react-router-dom';
import { getProjectBySlug } from '@/data/projects';
import { SEO } from '@/components/common/SEO';
import { ProjectDetailLayout } from '@/components/projects/ProjectDetailLayout';
import { getProjectStructuredData } from '@/utils/structuredData';

export default function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>();
  const project = slug ? getProjectBySlug(slug) : undefined;

  if (!project) {
    return <Navigate to="/404" replace />;
  }

  return (
    <>
      <SEO
        title={project.name}
        path={`/projects/${project.slug}`}
        description={project.shortDescription}
        image={project.coverImage}
        type="article"
        structuredData={getProjectStructuredData(project)}
      />
      <ProjectDetailLayout project={project} />
    </>
  );
}
