import { motion } from 'framer-motion';
import { ChevronDown, Github, Linkedin, Mail, FileDown } from 'lucide-react';
import { profile } from '@/data/profile';
import { siteConfig } from '@/data/config';
import { socialLinks } from '@/data/socialLinks';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { MagneticButton } from '@/components/common/MagneticButton';
import { AnimatedRole } from './AnimatedRole';
import { DeveloperVisual } from './DeveloperVisual';
import { staggerContainer, fadeUp } from '@/components/animations/variants';
import { useMotionPreference } from '@/providers/ReducedMotionProvider';

export function Hero() {
  const { reduceMotion } = useMotionPreference();
  const githubUrl = socialLinks.find((l) => l.icon === 'github')?.url ?? '#';
  const linkedinUrl = socialLinks.find((l) => l.icon === 'linkedin')?.url ?? '#';

  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center pb-16 pt-32 sm:pt-36"
      aria-label="Introduction"
    >
      <Container className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-8">
        <motion.div
          variants={staggerContainer(0.08)}
          initial={reduceMotion ? undefined : 'hidden'}
          animate={reduceMotion ? undefined : 'visible'}
        >
          {profile.availabilityLabel && siteConfig.openToOpportunities && (
            <motion.div
              variants={fadeUp}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-success/30 bg-success/10 px-4 py-1.5 text-xs font-medium text-success"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-success" />
              </span>
              {profile.availabilityLabel}
            </motion.div>
          )}

          <motion.p variants={fadeUp} className="font-mono text-sm text-accent-cyan">
            Hi, I&apos;m
          </motion.p>

          <motion.h1
            variants={fadeUp}
            className="mt-2 text-balance font-heading text-4xl font-bold leading-tight text-text-main sm:text-5xl lg:text-6xl"
          >
            {profile.name}
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mt-3 font-heading text-xl font-medium text-text-muted sm:text-2xl"
          >
            {profile.role} · <AnimatedRole />
          </motion.p>

          <motion.h2
            variants={fadeUp}
            className="mt-6 max-w-xl text-balance font-heading text-2xl font-semibold text-text-main sm:text-3xl"
          >
            {profile.heroHeadline}
          </motion.h2>

          <motion.p variants={fadeUp} className="mt-5 max-w-xl text-pretty text-base text-text-muted sm:text-lg">
            {profile.heroSubheadline}
          </motion.p>

          <motion.div variants={fadeUp} className="mt-8 flex flex-wrap items-center gap-4">
            <MagneticButton>
              <Button as="a" href="/projects" size="lg">
                Explore My Projects
              </Button>
            </MagneticButton>
            <MagneticButton>
              <Button as="a" href={siteConfig.resumePath} download variant="secondary" size="lg">
                <FileDown className="h-4 w-4" aria-hidden="true" />
                Download Resume
              </Button>
            </MagneticButton>
          </motion.div>

          <motion.div variants={fadeUp} className="mt-6 flex items-center gap-5 text-sm text-text-muted">
            <a href={githubUrl} target="_blank" rel="noreferrer noopener" className="inline-flex items-center gap-1.5 transition-colors hover:text-text-main">
              <Github className="h-4 w-4" aria-hidden="true" /> GitHub
            </a>
            <a href={linkedinUrl} target="_blank" rel="noreferrer noopener" className="inline-flex items-center gap-1.5 transition-colors hover:text-text-main">
              <Linkedin className="h-4 w-4" aria-hidden="true" /> LinkedIn
            </a>
            <a href="/contact" className="inline-flex items-center gap-1.5 transition-colors hover:text-text-main">
              <Mail className="h-4 w-4" aria-hidden="true" /> Contact Me
            </a>
          </motion.div>
        </motion.div>

        <motion.div
          initial={reduceMotion ? undefined : { opacity: 0, scale: 0.94 }}
          animate={reduceMotion ? undefined : { opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          <DeveloperVisual />
        </motion.div>
      </Container>

      <motion.a
        href="#about"
        onClick={(e) => {
          e.preventDefault();
          document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
        }}
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-1 text-text-muted transition-colors hover:text-text-main sm:flex"
        aria-label="Scroll to About section"
        animate={reduceMotion ? undefined : { y: [0, 8, 0] }}
        transition={{ duration: 1.8, repeat: Infinity }}
      >
        <span className="font-mono text-[11px] uppercase tracking-widest">Scroll</span>
        <ChevronDown className="h-4 w-4" aria-hidden="true" />
      </motion.a>
    </section>
  );
}
