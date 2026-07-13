import type { ReactElement } from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { ReducedMotionProvider } from '@/providers/ReducedMotionProvider';

/** Renders a component wrapped with the same providers used in main.tsx. */
export function renderWithProviders(ui: ReactElement, initialEntries: string[] = ['/']) {
  return render(
    <HelmetProvider>
      <MemoryRouter initialEntries={initialEntries}>
        <ReducedMotionProvider>{ui}</ReducedMotionProvider>
      </MemoryRouter>
    </HelmetProvider>,
  );
}
