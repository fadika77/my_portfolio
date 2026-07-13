import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import NotFound from '@/pages/NotFound';
import { renderWithProviders } from '@/test/testUtils';

describe('NotFound page', () => {
  it('renders a 404 heading', () => {
    renderWithProviders(<NotFound />);
    expect(screen.getByText('404')).toBeInTheDocument();
  });

  it('renders a link back to the homepage', () => {
    renderWithProviders(<NotFound />);
    const link = screen.getByRole('link', { name: /return home/i });
    expect(link).toHaveAttribute('href', '/');
  });

  it('shows the terminal-style suggested command', () => {
    renderWithProviders(<NotFound />);
    expect(screen.getByText('cd /home')).toBeInTheDocument();
  });
});
