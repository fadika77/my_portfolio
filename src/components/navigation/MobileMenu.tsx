import type { MouseEvent } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { X, Github, Linkedin, FileDown } from 'lucide-react';
import { navItems } from '@/data/navigation';
import { socialLinks } from '@/data/socialLinks';
import { siteConfig } from '@/data/config';
import { profile } from '@/data/profile';
import { cn } from '@/utils/cn';
import { useScrollLock } from '@/hooks/useScrollLock';
import { staggerContainer, fadeUp } from '@/components/animations/variants';

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
  activeSection: string;
}

export function MobileMenu({ open, onClose, activeSection }: MobileMenuProps) {
  const location = useLocation();
  const navigate = useNavigate();
  useScrollLock(open);

  const githubUrl = socialLinks.find((link) => link.icon === 'github')?.url ?? '#';
  const linkedinUrl = socialLinks.find((link) => link.icon === 'linkedin')?.url ?? '#';

  const handleClick = (event: MouseEvent<HTMLAnchorElement>, href: string) => {
    onClose();
    if (href.startsWith('/#')) {
      event.preventDefault();
      const id = href.slice(2);
      if (location.pathname === '/') {
        window.setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }), 250);
      } else {
        navigate(`/#${id}`);
      }
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
          className="fixed inset-0 z-[70] flex flex-col bg-bg-primary/98 backdrop-blur-xl lg:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onKeyDown={(event) => {
            if (event.key === 'Escape') onClose();
          }}
        >
          <div className="section-container flex items-center justify-between py-4">
            <span className="font-heading text-sm font-bold text-text-main">
              {profile.initials} · {profile.name}
            </span>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close menu"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border-strong text-text-main"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>

          <motion.ul
            variants={staggerContainer(0.06)}
            initial="hidden"
            animate="visible"
            className="section-container mt-6 flex flex-1 flex-col gap-2"
          >
            {navItems.map((item) => (
              <motion.li key={item.label} variants={fadeUp}>
                <Link
                  to={item.href}
                  onClick={(event) => handleClick(event, item.href)}
                  className={cn(
                    'block rounded-2xl px-4 py-4 font-heading text-2xl font-medium transition-colors',
                    activeSection === item.sectionId
                      ? 'bg-white/[0.06] text-text-main'
                      : 'text-text-muted hover:bg-white/[0.04] hover:text-text-main',
                  )}
                >
                  {item.label}
                </Link>
              </motion.li>
            ))}
          </motion.ul>

          <div className="section-container mb-8 flex items-center justify-between gap-3 border-t border-border pt-6">
            <div className="flex items-center gap-2">
              <a
                href={githubUrl}
                target="_blank"
                rel="noreferrer noopener"
                aria-label="GitHub"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-border-strong text-text-muted hover:text-text-main"
              >
                <Github className="h-5 w-5" aria-hidden="true" />
              </a>
              <a
                href={linkedinUrl}
                target="_blank"
                rel="noreferrer noopener"
                aria-label="LinkedIn"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-border-strong text-text-muted hover:text-text-main"
              >
                <Linkedin className="h-5 w-5" aria-hidden="true" />
              </a>
            </div>
            <a
              href={siteConfig.resumePath}
              download
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-accent to-accent-purple px-5 py-3 text-sm font-semibold text-white shadow-glow"
            >
              <FileDown className="h-4 w-4" aria-hidden="true" />
              Resume
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
