import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import { Navbar } from '@/components/navigation/Navbar';
import { profile } from '@/data/profile';
import { renderWithProviders } from '@/test/testUtils';

describe('Navbar', () => {
  it('renders the logo initials as a link to home', () => {
    renderWithProviders(<Navbar />);
    const logoLink = screen.getByRole('link', { name: /go to homepage/i });
    expect(logoLink).toHaveTextContent(profile.initials);
    expect(logoLink).toHaveAttribute('href', '/');
  });

  it('renders all primary navigation items', () => {
    renderWithProviders(<Navbar />);
    expect(screen.getAllByText('Home').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Projects').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Contact').length).toBeGreaterThan(0);
  });

  it('renders a resume download link', () => {
    renderWithProviders(<Navbar />);
    const resumeLinks = screen.getAllByText(/resume/i);
    expect(resumeLinks.length).toBeGreaterThan(0);
  });

  it('renders a mobile menu toggle button', () => {
    renderWithProviders(<Navbar />);
    expect(screen.getByRole('button', { name: /open menu/i })).toBeInTheDocument();
  });
});
