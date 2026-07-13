import { FileDown } from 'lucide-react';
import { profile } from '@/data/profile';
import { siteConfig } from '@/data/config';
import { SEO } from '@/components/common/SEO';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { RevealOnScroll } from '@/components/animations/RevealOnScroll';
import { AboutSection } from '@/components/sections/AboutSection';
import { WorkingStyle } from '@/components/sections/WorkingStyle';

export default function About() {
  return (
    <>
      <SEO
        title="About"
        path="/about"
        description="The full story behind Fadi Kanaani's path into software engineering, how he builds, and what he's looking for next."
      />

      <section className="relative pb-8 pt-32 sm:pt-40">
        <Container className="text-center">
          <RevealOnScroll>
            <p className="font-mono text-sm text-accent-cyan">About</p>
            <h1 className="mt-3 text-balance font-heading text-4xl font-bold text-text-main sm:text-5xl">
              The story so far.
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-pretty text-base text-text-muted sm:text-lg">
              {profile.professionalSummary}
            </p>
            <div className="mt-6 flex justify-center">
              <Button as="a" href={siteConfig.resumePath} download variant="secondary">
                <FileDown className="h-4 w-4" aria-hidden="true" />
                Download Resume
              </Button>
            </div>
          </RevealOnScroll>
        </Container>
      </section>

      <AboutSection />
      <WorkingStyle />
    </>
  );
}
