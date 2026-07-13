import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import Projects from '@/pages/Projects';
import { projects } from '@/data/projects';
import { renderWithProviders } from '@/test/testUtils';

describe('Projects page', () => {
  it('renders a card for every project in the data file', () => {
    renderWithProviders(<Projects />);
    projects.forEach((project) => {
      expect(screen.getByText(project.name)).toBeInTheDocument();
    });
  });
});
