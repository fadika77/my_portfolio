import { describe, it, expect, vi } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MobileMenu } from '@/components/navigation/MobileMenu';
import { renderWithProviders } from '@/test/testUtils';

describe('MobileMenu', () => {
  it('renders nothing meaningful when closed', () => {
    renderWithProviders(<MobileMenu open={false} onClose={vi.fn()} activeSection="home" />);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('renders navigation links and a close button when open', () => {
    renderWithProviders(<MobileMenu open onClose={vi.fn()} activeSection="home" />);
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /close menu/i })).toBeInTheDocument();
    expect(screen.getByText('Projects')).toBeInTheDocument();
  });

  it('calls onClose when the close button is clicked', async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    renderWithProviders(<MobileMenu open onClose={onClose} activeSection="home" />);
    await user.click(screen.getByRole('button', { name: /close menu/i }));
    expect(onClose).toHaveBeenCalled();
  });
});
