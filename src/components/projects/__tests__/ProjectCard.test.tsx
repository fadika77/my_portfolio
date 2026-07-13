import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import { ProjectCard } from '@/components/projects/ProjectCard';
import { projects } from '@/data/projects';
import { renderWithProviders } from '@/test/testUtils';

describe('ProjectCard', () => {
  const project = projects[0];

  it('renders the project name, year, and category', () => {
    renderWithProviders(<ProjectCard project={project} />);
    expect(screen.getByText(project.name)).toBeInTheDocument();
    expect(screen.getByText(String(project.year))).toBeInTheDocument();
    expect(screen.getByText(project.category)).toBeInTheDocument();
  });

  it('links "View Case Study" to the correct project detail route', () => {
    renderWithProviders(<ProjectCard project={project} />);
    const link = screen.getByRole('link', { name: /view case study/i });
    expect(link).toHaveAttribute('href', `/projects/${project.slug}`);
  });

  it('renders a GitHub link when githubUrl is provided', () => {
    renderWithProviders(<ProjectCard project={project} />);
    if (project.githubUrl) {
      const githubLink = screen.getByRole('link', { name: new RegExp(`${project.name} on GitHub`, 'i') });
      expect(githubLink).toHaveAttribute('href', project.githubUrl);
    }
  });

  it('renders technology badges', () => {
    renderWithProviders(<ProjectCard project={project} />);
    expect(screen.getByText(project.technologies[0])).toBeInTheDocument();
  });
});
