import { Link } from 'react-router-dom';
import { Github, Linkedin, Mail, ArrowUp } from 'lucide-react';
import { profile } from '@/data/profile';
import { socialLinks } from '@/data/socialLinks';
import { navItems } from '@/data/navigation';
import { Container } from '@/components/ui/Container';

export function Footer() {
  const year = new Date().getFullYear();
  const githubUrl = socialLinks.find((link) => link.icon === 'github')?.url ?? '#';
  const linkedinUrl = socialLinks.find((link) => link.icon === 'linkedin')?.url ?? '#';

  return (
    <footer className="relative border-t border-border bg-bg-secondary/60">
      <Container className="grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="font-heading text-xl font-semibold text-text-main">{profile.name}</p>
          <p className="mt-1 text-sm text-text-muted">{profile.role}</p>
          <p className="mt-4 max-w-xs text-sm text-text-muted">
            Built with React, TypeScript, and curiosity.
          </p>
        </div>

        <div>
          <p className="mb-4 font-mono text-xs uppercase tracking-widest text-text-muted">
            Navigate
          </p>
          <ul className="space-y-2">
            {navItems.map((item) => (
              <li key={item.label}>
                <Link
                  to={item.href}
                  className="text-sm text-text-muted transition-colors hover:text-text-main"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="mb-4 font-mono text-xs uppercase tracking-widest text-text-muted">
            Connect
          </p>
          <ul className="space-y-2">
            <li>
              <a
                href={githubUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center gap-2 text-sm text-text-muted transition-colors hover:text-text-main"
              >
                <Github className="h-4 w-4" aria-hidden="true" /> GitHub
              </a>
            </li>
            <li>
              <a
                href={linkedinUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center gap-2 text-sm text-text-muted transition-colors hover:text-text-main"
              >
                <Linkedin className="h-4 w-4" aria-hidden="true" /> LinkedIn
              </a>
            </li>
            <li>
              <a
                href={`mailto:${profile.email}`}
                className="inline-flex items-center gap-2 text-sm text-text-muted transition-colors hover:text-text-main"
              >
                <Mail className="h-4 w-4" aria-hidden="true" /> {profile.email}
              </a>
            </li>
          </ul>
        </div>

        <div className="flex flex-col justify-between">
          <div>
            <p className="mb-4 font-mono text-xs uppercase tracking-widest text-text-muted">
              Back to top
            </p>
            <a
              href="#top"
              onClick={(event) => {
                event.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border-strong text-text-muted transition-colors hover:text-text-main"
              aria-label="Back to top"
            >
              <ArrowUp className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
        </div>
      </Container>

      <div className="border-t border-border py-6">
        <Container className="flex flex-col items-center justify-between gap-2 text-xs text-text-muted sm:flex-row">
          <p>
            © {year} {profile.name}. Designed and developed by {profile.name}.
          </p>
          <p className="font-mono">{'</> built with React + TypeScript'}</p>
        </Container>
      </div>
    </footer>
  );
}
