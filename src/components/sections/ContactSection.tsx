import { useState } from 'react';
import { Copy, Check, MapPin } from 'lucide-react';
import { profile } from '@/data/profile';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/common/SectionHeading';
import { ContactForm } from './ContactForm';
import { SocialLinks } from './SocialLinks';
import { RevealOnScroll } from '@/components/animations/RevealOnScroll';

export function ContactSection() {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard API unavailable — fail silently, email is shown as text anyway.
    }
  };

  return (
    <section id="contact" className="relative py-24 sm:py-32" aria-labelledby="contact-heading">
      <Container>
        <SectionHeading
          eyebrow="Get In Touch"
          title="Let's build something meaningful."
          description="Whether you're hiring for a Junior Software Engineer role or you have a website or app idea you'd like built, I'd love to hear about it."
          id="contact-heading"
        />

        <div className="mt-12 grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <RevealOnScroll className="space-y-6">
            <div className="glass-panel p-6">
              <p className="mb-4 font-mono text-xs uppercase tracking-widest text-text-muted">
                Contact details
              </p>
              <ul className="space-y-4 text-sm">
                <li className="flex items-center justify-between gap-3">
                  <span className="text-text-muted">Email</span>
                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    className="inline-flex items-center gap-1.5 text-text-main transition-colors hover:text-accent-cyan"
                  >
                    {profile.email}
                    {copied ? (
                      <Check className="h-3.5 w-3.5 text-success" aria-hidden="true" />
                    ) : (
                      <Copy className="h-3.5 w-3.5" aria-hidden="true" />
                    )}
                  </button>
                </li>
                <li className="flex items-center justify-between gap-3">
                  <span className="text-text-muted">Phone</span>
                  <a href={`tel:${profile.phone.replace(/\s/g, '')}`} className="text-text-main hover:text-accent-cyan">
                    {profile.phone}
                  </a>
                </li>
                <li className="flex items-center justify-between gap-3">
                  <span className="text-text-muted">Location</span>
                  <span className="inline-flex items-center gap-1.5 text-text-main">
                    <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
                    {profile.location}
                  </span>
                </li>
              </ul>
            </div>

            <div className="glass-panel p-6">
              <p className="mb-4 font-mono text-xs uppercase tracking-widest text-text-muted">
                Find me online
              </p>
              <SocialLinks />
            </div>
          </RevealOnScroll>

          <RevealOnScroll delay={0.1}>
            <ContactForm />
          </RevealOnScroll>
        </div>
      </Container>
    </section>
  );
}
