import { describe, it, expect } from 'vitest';
import { projects, getProjectBySlug, getAdjacentProjects } from '@/data/projects';

describe('projects data', () => {
  it('contains exactly the four expected projects', () => {
    const slugs = projects.map((p) => p.slug).sort();
    expect(slugs).toEqual(['green-points', 'housefix', 'library-of-books', 'mendly']);
  });

  it('every project has required non-empty fields', () => {
    projects.forEach((project) => {
      expect(project.name.length).toBeGreaterThan(0);
      expect(project.technologies.length).toBeGreaterThan(0);
      expect(project.features.length).toBeGreaterThan(0);
      expect(project.architecture.length).toBeGreaterThan(0);
    });
  });

  it('getProjectBySlug returns the matching project', () => {
    const project = getProjectBySlug('mendly');
    expect(project?.name).toBe('Mendly');
  });

  it('getProjectBySlug returns undefined for an unknown slug', () => {
    expect(getProjectBySlug('does-not-exist')).toBeUndefined();
  });

  it('getAdjacentProjects wraps around at the start and end of the list', () => {
    const first = projects[0];
    const last = projects[projects.length - 1];
    const { previous } = getAdjacentProjects(first.slug);
    const { next } = getAdjacentProjects(last.slug);
    expect(previous?.slug).toBe(last.slug);
    expect(next?.slug).toBe(first.slug);
  });
});
