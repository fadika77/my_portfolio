import { Link } from 'react-router-dom';
import { FileDown, ArrowRight, Lightbulb } from 'lucide-react';
import { profile } from '@/data/profile';
import { siteConfig } from '@/data/config';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { MagneticButton } from '@/components/common/MagneticButton';
import { RevealOnScroll } from '@/components/animations/RevealOnScroll';
import { RecruiterQuickView } from './RecruiterQuickView';

/** Condensed contact call-to-action shown on the homepage. */
export function ContactCTA() {
  return (
    <section className="relative py-24 sm:py-32" aria-labelledby="contact-cta-heading">
      <Container>
        <RevealOnScroll className="glass-panel relative overflow-hidden p-10 text-center sm:p-16">
          <div className="pointer-events-none absolute inset-0 bg-radial-fade opacity-70" aria-hidden="true" />
          <div className="relative">
            <h2 id="contact-cta-heading" className="text-balance font-heading text-3xl font-semibold text-text-main sm:text-4xl">
              Let&apos;s build something meaningful.
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-pretty text-base text-text-muted sm:text-lg">
              I&apos;m interested in Junior Software Engineer opportunities, development teams, and
              projects where I can contribute, learn, and grow.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <MagneticButton>
                <Button as="a" href="/contact" size="lg">
                  Get In Touch <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Button>
              </MagneticButton>
              <MagneticButton>
                <Button as="a" href="/contact?type=project" variant="secondary" size="lg">
                  <Lightbulb className="h-4 w-4" aria-hidden="true" />
                  Have a Project Idea?
                </Button>
              </MagneticButton>
              <MagneticButton>
                <Button as="a" href={siteConfig.resumePath} download variant="secondary" size="lg">
                  <FileDown className="h-4 w-4" aria-hidden="true" />
                  Download Resume
                </Button>
              </MagneticButton>
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
              <RecruiterQuickView />
              <Link to="/contact" className="text-sm text-text-muted hover:text-text-main">
                or email {profile.email}
              </Link>
            </div>
          </div>
        </RevealOnScroll>
      </Container>
    </section>
  );
}
