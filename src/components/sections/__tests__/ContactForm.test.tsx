import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ContactForm } from '@/components/sections/ContactForm';
import { renderWithProviders } from '@/test/testUtils';

describe('ContactForm', () => {
  it('shows validation errors when submitting an empty form', async () => {
    const user = userEvent.setup();
    renderWithProviders(<ContactForm />);

    await user.click(screen.getByRole('button', { name: /send message/i }));

    expect(await screen.findByText(/please enter your name/i)).toBeInTheDocument();
    expect(screen.getByText(/please enter your email/i)).toBeInTheDocument();
    expect(screen.getByText(/please add a subject/i)).toBeInTheDocument();
    expect(screen.getByText(/please write a short message/i)).toBeInTheDocument();
  });

  it('clears a field error once the user starts correcting it', async () => {
    const user = userEvent.setup();
    renderWithProviders(<ContactForm />);

    await user.click(screen.getByRole('button', { name: /send message/i }));
    expect(await screen.findByText(/please enter your name/i)).toBeInTheDocument();

    await user.type(screen.getByLabelText(/^name$/i), 'Jordan Lee');
    expect(screen.queryByText(/please enter your name/i)).not.toBeInTheDocument();
  });

  it('shows an error state when no email provider is configured', async () => {
    const user = userEvent.setup();
    renderWithProviders(<ContactForm />);

    await user.type(screen.getByLabelText(/^name$/i), 'Jordan Lee');
    await user.type(screen.getByLabelText(/^email$/i), 'jordan@example.com');
    await user.type(screen.getByLabelText(/^subject$/i), 'Junior role');
    await user.type(screen.getByLabelText(/^message$/i), 'We would love to chat about an opening.');
    await user.click(screen.getByRole('button', { name: /send message/i }));

    expect(await screen.findByRole('alert')).toBeInTheDocument();
  });

  it('switches to the Project Idea tab and swaps the subject field for a project type field', async () => {
    const user = userEvent.setup();
    renderWithProviders(<ContactForm />);

    await user.click(screen.getByRole('button', { name: /project idea/i }));

    expect(screen.queryByLabelText(/^subject$/i)).not.toBeInTheDocument();
    expect(screen.getByLabelText(/what do you want built/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/project description/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /send project idea/i })).toBeInTheDocument();
  });

  it('requires a project type when submitting a project idea', async () => {
    const user = userEvent.setup();
    renderWithProviders(<ContactForm />);

    await user.click(screen.getByRole('button', { name: /project idea/i }));
    await user.click(screen.getByRole('button', { name: /send project idea/i }));

    expect(await screen.findByText(/please choose what you'd like built/i)).toBeInTheDocument();
    expect(screen.getByText(/please describe your project idea/i)).toBeInTheDocument();
  });

  it('opens directly on the Project Idea tab when the URL includes ?type=project', () => {
    renderWithProviders(<ContactForm />, ['/contact?type=project']);

    // Exact match — the submit button reads "Send Project Idea" on this tab,
    // which would also satisfy a loose /project idea/i match.
    expect(screen.getByRole('button', { name: 'Project Idea' })).toHaveAttribute('aria-pressed', 'true');
    expect(screen.getByLabelText(/what do you want built/i)).toBeInTheDocument();
  });
});
