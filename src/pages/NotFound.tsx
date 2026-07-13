import { Link } from 'react-router-dom';
import { Terminal, Home } from 'lucide-react';
import { SEO } from '@/components/common/SEO';
import { Container } from '@/components/ui/Container';
import { RevealOnScroll } from '@/components/animations/RevealOnScroll';

export default function NotFound() {
  return (
    <>
      <SEO title="Page Not Found" path="/404" />
      <section className="flex min-h-screen items-center py-32">
        <Container className="text-center">
          <RevealOnScroll>
            <div className="glass-panel mx-auto max-w-lg p-8 text-left font-mono">
              <div className="mb-4 flex items-center gap-2 text-text-muted">
                <Terminal className="h-4 w-4" aria-hidden="true" />
                <span className="text-xs">fadi@portfolio: ~</span>
              </div>
              <p className="text-5xl font-bold text-danger">404</p>
              <p className="mt-3 text-sm text-text-muted">
                <span className="text-accent-cyan">$</span> Route not found.
              </p>
              <p className="mt-1 text-sm text-text-muted">Suggested command:</p>
              <p className="mt-1 text-text-main">
                <span className="text-accent-cyan">{'>'}</span> cd /home
              </p>
              <Link
                to="/"
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-accent to-accent-purple px-5 py-2.5 text-sm font-semibold text-white shadow-glow"
              >
                <Home className="h-4 w-4" aria-hidden="true" />
                Return home
              </Link>
            </div>
          </RevealOnScroll>
        </Container>
      </section>
    </>
  );
}
