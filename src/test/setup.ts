import '@testing-library/jest-dom/vitest';

// jsdom doesn't implement matchMedia — Framer Motion / our hooks rely on it.
if (!window.matchMedia) {
  window.matchMedia = (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  });
}

// jsdom doesn't implement IntersectionObserver — used for scrollspy/reveal.
class MockIntersectionObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}
// @ts-expect-error - simplified mock for test environment
window.IntersectionObserver = MockIntersectionObserver;
